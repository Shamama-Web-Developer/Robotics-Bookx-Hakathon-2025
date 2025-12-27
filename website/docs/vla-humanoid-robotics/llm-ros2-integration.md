# LLM to ROS 2 Integration Concepts

This chapter covers how LLM-generated plans connect to ROS 2 for robot execution. The focus is on architectural patterns, not implementation details.

## Integration Architecture

### The Translation Problem

LLM outputs are structured data (JSON, text). ROS 2 expects specific message types and action goals. A translation layer bridges this gap.

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│    LLM      │     │   Translation   │     │   ROS 2     │
│   Output    │ ──► │     Layer       │ ──► │   Actions   │
│   (JSON)    │     │                 │     │             │
└─────────────┘     └─────────────────┘     └─────────────┘
```

### Translation Layer Responsibilities

1. **Parse** LLM output into structured representation
2. **Map** abstract actions to ROS 2 action types
3. **Validate** action parameters against robot capabilities
4. **Dispatch** actions to appropriate ROS 2 servers
5. **Monitor** execution and report status

## ROS 2 Action Server Concepts

### What Are Action Servers?

ROS 2 actions are designed for long-running tasks that:
- Take time to complete
- Provide progress feedback
- Can be preempted (cancelled)
- Report final results

This matches robot primitives like navigation and manipulation.

### Action Server Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Action Client                      │
│  (Translation Layer)                                 │
├─────────────────────────────────────────────────────┤
│  send_goal() ──────────────────────► Goal           │
│  get_feedback() ◄──────────────────── Feedback      │
│  get_result() ◄────────────────────── Result        │
│  cancel_goal() ─────────────────────► Cancel        │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                   Action Server                      │
│  (Robot Controller)                                  │
├─────────────────────────────────────────────────────┤
│  - Receives goals                                    │
│  - Executes robot commands                           │
│  - Publishes feedback                                │
│  - Returns results                                   │
└─────────────────────────────────────────────────────┘
```

### Common Robot Action Types

| Action | Purpose | Feedback | Result |
|--------|---------|----------|--------|
| NavigateToPose | Move to location | Current position, progress | Success/failure, final pose |
| PickObject | Grasp an object | Gripper state, approach progress | Success/failure, object held |
| PlaceObject | Put object down | Arm position, placement progress | Success/failure, object placed |
| FollowPath | Execute trajectory | Waypoint progress | Completion status |

## Mapping LLM Actions to ROS 2

### Action Mapping Table

LLM-generated actions map to specific ROS 2 interfaces:

| LLM Action | ROS 2 Action Server | Parameters |
|------------|--------------------|-----------------------|
| navigate(location) | /navigate_to_pose | PoseStamped (x, y, theta) |
| locate(object) | /detect_object | Object class, search area |
| grasp(object) | /pick_object | Object pose, grasp type |
| place(object, surface) | /place_object | Target pose, approach vector |
| handover(object) | /handover | Human pose, handover pose |

### Parameter Resolution

LLM outputs use semantic names. ROS 2 needs concrete values.

```
LLM Output:
  {"action": "navigate", "target": "kitchen"}

Resolution Required:
  "kitchen" → PoseStamped(x=3.5, y=2.0, theta=0.0)

Sources:
  - Semantic map (location name → coordinates)
  - Scene graph (object name → pose)
  - User tracking (user → current position)
```

### Execution Flow

```
1. LLM generates: {"action": "grasp", "object": "red_cup"}

2. Translation layer:
   a. Look up red_cup in scene graph → pose (x, y, z)
   b. Create PickObject goal with pose
   c. Send goal to /pick_object action server

3. Action server executes:
   a. Plan arm trajectory
   b. Move arm to approach pose
   c. Close gripper
   d. Verify grasp

4. Translation layer receives result:
   a. Success → mark action complete, proceed to next
   b. Failure → report to LLM for replanning
```

## Behavior Trees for Sequencing

### Why Behavior Trees?

LLM-generated sequences need execution coordination:
- Sequential execution (do A, then B)
- Parallel execution (do A and B simultaneously)
- Conditional execution (if A succeeds, do B)
- Fallback execution (try A, if fail try B)

Behavior trees provide this structure.

### Behavior Tree Primitives

```
Sequence: Execute children in order, fail if any fails
    ├── Navigate(kitchen)
    ├── Locate(cup)
    └── Grasp(cup)

Selector: Try children until one succeeds
    ├── Grasp(cup, approach_left)
    └── Grasp(cup, approach_right)

Parallel: Execute children simultaneously
    ├── Monitor(user_position)
    └── Navigate(user)
```

### LLM Plan to Behavior Tree

```
LLM Output:
{
  "steps": [
    {"action": "navigate", "target": "kitchen"},
    {"action": "locate", "object": "cup"},
    {"action": "grasp", "object": "cup"},
    {"action": "navigate", "target": "user"},
    {"action": "handover", "object": "cup"}
  ]
}

Behavior Tree:
Sequence
├── Action: NavigateToPose(kitchen_pose)
├── Action: DetectObject("cup")
├── Action: PickObject(cup_pose)
├── Action: NavigateToPose(user_pose)
└── Action: Handover(cup)
```

## Feedback and Monitoring

### Real-Time Feedback Loop

```
┌───────────────────────────────────────────────────────┐
│                   Execution Monitor                    │
├───────────────────────────────────────────────────────┤
│                                                        │
│   Action Feedback ──► Progress Tracking               │
│                           │                            │
│                           ▼                            │
│                    Status Update                       │
│                           │                            │
│              ┌────────────┴────────────┐              │
│              ▼                         ▼              │
│         In Progress               Completed/Failed    │
│              │                         │              │
│              ▼                         ▼              │
│         Continue                  Next Action         │
│                                  or Replan            │
└───────────────────────────────────────────────────────┘
```

### Progress Reporting

During execution, provide feedback:

```
"I'm navigating to the kitchen... arrived.
 Looking for the red cup... found it on the counter.
 Reaching for the cup... grasped successfully.
 Returning to you..."
```

This feedback:
- Keeps users informed
- Allows intervention if needed
- Provides context for replanning

## Error Handling at ROS 2 Level

### Action Failure Responses

| Failure | ROS 2 Signal | Translation Layer Response |
|---------|--------------|---------------------------|
| Goal rejected | REJECTED status | Report infeasibility to LLM |
| Execution failed | ABORTED status | Report failure details to LLM |
| Preempted | CANCELED status | Acknowledge cancellation |
| Timeout | No response | Retry or report timeout |

### Recovery Integration

When actions fail, the translation layer:

1. Captures failure context (what failed, why, current state)
2. Formats context for LLM consumption
3. Requests replanning from current state
4. Receives new plan
5. Continues execution

## Best Practices

### Architectural Guidelines

1. **Separation of concerns**: LLM handles planning, ROS 2 handles execution
2. **Stateless translation**: Translation layer doesn't maintain plan state
3. **Explicit capability model**: Robot capabilities defined separately from LLM
4. **Graceful degradation**: System continues with reduced capability on partial failures

### Interface Design

1. **Action granularity**: Match LLM primitive granularity to action server granularity
2. **Parameter validation**: Validate all parameters before dispatching
3. **Timeout handling**: Set appropriate timeouts for each action type
4. **Preemption support**: Allow higher-priority commands to interrupt

### Testing Strategies

1. **Mock action servers**: Test translation layer without robot
2. **Simulated execution**: Test full pipeline in Isaac Sim
3. **Failure injection**: Verify recovery from simulated failures
4. **End-to-end validation**: Verify LLM → ROS 2 → robot flow

## Summary

LLM-ROS 2 integration requires:

1. **Translation layer** converting LLM outputs to ROS 2 actions
2. **Action mapping** from semantic names to concrete parameters
3. **Behavior trees** for coordinating action sequences
4. **Feedback loops** for monitoring and progress reporting
5. **Error handling** at multiple levels

Key architectural decisions:
- Where does parameter resolution occur?
- How granular are LLM actions vs ROS 2 actions?
- How is failure information communicated back to LLM?

## Next Steps

- [Cognitive Planning Exercise](./cognitive-planning-exercise.md): Practice designing LLM prompts
- [Capstone: The Autonomous Humanoid](./capstone-autonomous-humanoid.md): Complete system integration
