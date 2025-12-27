# Cognitive Planning with LLMs

Large Language Models provide a cognitive layer that translates natural language goals into structured action sequences. This chapter covers the architecture of LLM-based planning for robotics.

## Why LLMs for Robot Planning?

Traditional robot planning requires explicit programming of task sequences. LLMs offer a different approach:

| Traditional Planning | LLM-Based Planning |
|---------------------|-------------------|
| Predefined task sequences | Dynamic decomposition from language |
| Rigid command vocabulary | Natural language understanding |
| Manual encoding of world knowledge | Leverages pretrained knowledge |
| Brittle to novel requests | Generalizes to unseen commands |

**Key Insight**: LLMs can decompose high-level goals into primitive actions because they encode common-sense knowledge about how tasks are typically performed.

## Task Decomposition Architecture

### The Decomposition Problem

Given: "Make me a sandwich"

The robot needs to determine:
1. What actions are required?
2. In what order?
3. What objects are involved?
4. What preconditions must be met?

### LLM as Task Planner

```
┌─────────────────────────────────────────────────────────┐
│                   LLM Task Planner                       │
├─────────────────────────────────────────────────────────┤
│  Input: Natural language goal + Context                  │
│                                                          │
│  Processing:                                             │
│  1. Parse goal intent                                    │
│  2. Retrieve relevant world knowledge                    │
│  3. Generate action sequence                             │
│  4. Validate against robot capabilities                  │
│                                                          │
│  Output: Structured action sequence                      │
└─────────────────────────────────────────────────────────┘
```

### Decomposition Levels

Complex tasks decompose hierarchically:

```
Level 0: "Make me a sandwich"
    │
    ▼
Level 1: [Get ingredients, Prepare sandwich, Deliver to user]
    │
    ▼
Level 2: Get ingredients → [Go to kitchen, Open fridge, Get bread, Get cheese, ...]
    │
    ▼
Level 3: Go to kitchen → [Navigate(kitchen)]
         Open fridge → [Approach(fridge), Grasp(handle), Pull(handle)]
```

**Design Decision**: At what level does the LLM operate? Options:
- High-level only (Level 0→1): Simpler prompting, more rigid primitives
- Multi-level (Level 0→2): Richer plans, more complex validation
- Full decomposition (Level 0→3): Maximum flexibility, hardest to verify

## Action Sequence Generation

### Structured Output Format

LLM outputs must be machine-parseable. Common formats:

**JSON Format**:
```json
{
  "goal": "make sandwich",
  "steps": [
    {"action": "navigate", "target": "kitchen"},
    {"action": "locate", "object": "bread"},
    {"action": "grasp", "object": "bread"},
    {"action": "place", "object": "bread", "surface": "counter"}
  ]
}
```

### Handling Dependencies

Actions have preconditions and effects:

| Action | Preconditions | Effects |
|--------|---------------|---------|
| Grasp(X) | At(X), HandEmpty | Holding(X), not HandEmpty |
| Place(X, S) | Holding(X), At(S) | On(X, S), HandEmpty |
| Navigate(L) | None | At(L) |

The LLM must generate sequences where preconditions are satisfied:

```
Invalid: [Grasp(cup), Navigate(kitchen)]  ← At(cup) not satisfied
Valid:   [Navigate(kitchen), Locate(cup), Grasp(cup)]
```

## Prompt Engineering for Planning

### Effective Prompt Structure

A well-designed prompt includes:

1. **Role definition**: What the LLM should act as
2. **Available primitives**: Actions the robot can execute
3. **Robot capabilities**: Physical constraints
4. **Current state**: Where the robot is, what it knows
5. **Output format**: Expected structure of response

### Example Prompt Template

```
System: You are a robot task planner. Given a goal, output a sequence
of primitive actions the robot can execute.

Available primitives:
- navigate(location): Move to a location
- locate(object): Find an object visually
- grasp(object): Pick up an object
- place(object, surface): Put object on surface
- handover(object): Give object to human

Robot capabilities: Mobile base, two arms, gripper hands.
Current location: Living room.
Known locations: kitchen, bedroom, bathroom, living room.

Output format: JSON array of actions with parameters.

User: Bring me a glass of water.
```

### Common Prompt Patterns

**Chain-of-Thought**: Ask LLM to reason step-by-step

```
First, think about what's needed:
1. I need to get a glass
2. I need to fill it with water
3. I need to bring it to the user

Now generate the action sequence...
```

**Few-Shot Examples**: Provide example decompositions

```
Example 1:
Goal: "Get me a book from the shelf"
Actions: [navigate(library), locate(book), grasp(book), navigate(user), handover(book)]

Example 2:
Goal: "Put the dishes away"
Actions: [navigate(kitchen), locate(dishes), grasp(dishes), navigate(cabinet), place(dishes, cabinet)]

Now decompose: "Bring me the remote control"
```

## Error Handling and Recovery

### Anticipating Failures

LLM-generated plans can fail. Common failure modes:

| Failure Type | Example | Detection |
|--------------|---------|-----------|
| Object not found | Bread not in expected location | Perception feedback |
| Action failed | Grasp unsuccessful | Motor feedback |
| Blocked path | Cannot navigate to kitchen | Navigation feedback |
| Invalid sequence | Precondition not met | Plan validation |

### Recovery Strategies

**Replan from Current State**:
```
Original plan failed at step 3.
Current state: At(kitchen), Holding(nothing)
Replan from current state toward original goal.
```

**Ask for Clarification**:
```
"I couldn't find bread in the kitchen. Should I:
 1. Check the pantry?
 2. Ask where the bread is?
 3. Suggest an alternative?"
```

**Graceful Degradation**:
```
Goal: "Make a sandwich with ham and cheese"
If ham not found: "I found cheese but not ham.
Should I make a cheese sandwich instead?"
```

## Limitations and Considerations

### LLM Limitations for Planning

| Limitation | Implication |
|------------|-------------|
| Hallucination | May generate infeasible actions |
| No true reasoning | Cannot verify physical constraints |
| Context limits | Long plans may lose coherence |
| Latency | Real-time replanning may be slow |

### Hybrid Approaches

Combine LLM planning with classical verification:

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│   LLM    │ ──► │   Plan       │ ──► │   Robot      │
│ Planner  │     │   Validator  │     │   Executor   │
└──────────┘     └──────────────┘     └──────────────┘
                        │
                        ▼
              Check preconditions
              Verify feasibility
              Reject invalid plans
```

### Safety Considerations

LLM outputs should never directly control robot actuators. Always:

1. Validate generated plans against safety constraints
2. Check for dangerous action combinations
3. Require confirmation for high-risk actions
4. Implement hardware safety stops independent of software

## Summary

LLM-based planning for robotics:

1. Translates natural language goals into action sequences
2. Leverages world knowledge for task decomposition
3. Requires structured output formats for robot execution
4. Must be combined with validation and safety checks
5. Handles failures through replanning and clarification

Key design decisions:
- Decomposition granularity
- Prompt structure and examples
- Validation pipeline
- Recovery strategies

## Next Steps

- [LLM-ROS 2 Integration](./llm-ros2-integration.md): Connecting plans to robot execution
- [Cognitive Planning Exercise](./cognitive-planning-exercise.md): Design your own planning prompts
