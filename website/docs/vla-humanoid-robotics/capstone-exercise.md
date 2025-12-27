# Capstone Exercise

This capstone exercise challenges you to design a complete VLA system for a specific use case, demonstrating mastery of all module concepts.

## Objectives

After completing this exercise, you will be able to:

- Design end-to-end VLA system architecture
- Trace commands through all pipeline stages
- Identify failure points and design mitigation strategies
- Compare architectural alternatives and justify choices

## Exercise Overview

You will design a VLA system for a **Hospital Assistant Robot** that helps nurses by fetching supplies and delivering items to patient rooms.

## Part 1: System Architecture Design

### Scenario Description

**Robot**: Mobile manipulator with:
- Omnidirectional base
- Two 7-DOF arms with parallel grippers
- RGB-D cameras (head-mounted)
- Microphone array
- Speaker for feedback

**Environment**: Hospital floor with:
- Nurse station (home base)
- Supply room
- 10 patient rooms
- Hallways with people traffic

**Tasks**:
- Fetch supplies from supply room
- Deliver items to patient rooms
- Return items to nurse station
- Respond to voice commands from nurses

### Task 1: Define Your Pipeline

Draw your complete VLA pipeline. Include:

```
Your Pipeline Diagram:

[Voice] → [___] → [___] → [___] → [___]
   │         │        │        │        │
   ▼         ▼        ▼        ▼        ▼
 [___]     [___]    [___]    [___]    [___]

Fill in each stage and the processing that occurs.
```

### Task 2: Define Action Primitives

List all primitives your robot needs:

```
Navigation Primitives:
- navigate(location): _______________
- _______________: _______________
- _______________: _______________

Manipulation Primitives:
- grasp(object): _______________
- _______________: _______________
- _______________: _______________

Perception Primitives:
- locate(object): _______________
- _______________: _______________

Communication Primitives:
- announce(message): _______________
- _______________: _______________
```

### Task 3: Design Voice Interface

Define the intent taxonomy for your system:

```
Intent Categories:

FETCH_SUPPLY:
  - Example commands: _______________
  - Entities: _______________

DELIVER_ITEM:
  - Example commands: _______________
  - Entities: _______________

STATUS_QUERY:
  - Example commands: _______________
  - Entities: _______________

[Add more categories as needed]
```

## Part 2: Command Trace

### Scenario

A nurse says: "Robot, please take the blood pressure monitor from the supply room to patient room 5"

### Task 4: Complete Pipeline Trace

Trace this command through every stage:

**Stage 1: Voice Processing**
```
Audio input: "Robot, please take the blood pressure monitor from the supply room to patient room 5"

ASR output:
_______________

Intent classification:
_______________

Entity extraction:
_______________
```

**Stage 2: LLM Planning**
```
Context sent to LLM:
_______________

Action sequence generated:
1. _______________
2. _______________
3. _______________
[Continue as needed]
```

**Stage 3: Navigation Execution**
```
For each navigation action:
- Semantic lookup: _______________
- Path planning: _______________
- Expected duration: _______________
```

**Stage 4: Perception**
```
Object to locate: _______________
Detection approach: _______________
Expected output: _______________
```

**Stage 5: Manipulation**
```
Grasp planning: _______________
Motion execution: _______________
Verification: _______________
```

### Task 5: Timeline Estimate

Create a timeline for complete execution:

```
T=0.0s   [VOICE]  _______________
T=___s   [VOICE]  _______________
T=___s   [PLAN]   _______________
T=___s   [NAV]    _______________
T=___s   [PERCEPT] _______________
T=___s   [MANIP]  _______________
T=___s   [NAV]    _______________
T=___s   [COMPLETE] _______________

Total estimated time: ___s
```

## Part 3: Failure Analysis

### Task 6: Identify Failure Points

For each pipeline stage, identify at least two failure modes:

```
Voice Failures:
1. _______________
   - Detection: _______________
   - Recovery: _______________

2. _______________
   - Detection: _______________
   - Recovery: _______________

Planning Failures:
1. _______________
   - Detection: _______________
   - Recovery: _______________

2. _______________
   - Detection: _______________
   - Recovery: _______________

Navigation Failures:
1. _______________
   - Detection: _______________
   - Recovery: _______________

2. _______________
   - Detection: _______________
   - Recovery: _______________

Perception Failures:
1. _______________
   - Detection: _______________
   - Recovery: _______________

Manipulation Failures:
1. _______________
   - Detection: _______________
   - Recovery: _______________
```

### Task 7: Design Recovery Dialog

The robot cannot find the blood pressure monitor in the supply room. Design the recovery interaction:

```
Robot: _______________

Nurse options:
1. _______________
2. _______________
3. _______________

If nurse selects option 1:
Robot: _______________
```

## Part 4: Architecture Comparison

### Task 8: Evaluate Design Alternatives

**Alternative A**: Centralized Planning
- All planning done by single LLM call
- Robot executes full plan without feedback

**Alternative B**: Distributed Planning
- Each stage has local decision-making
- LLM only for high-level decomposition

**Alternative C**: Continuous Replanning
- LLM queried at each stage
- Full state updates between actions

Compare these approaches:

```
| Criterion | Alt A | Alt B | Alt C |
|-----------|-------|-------|-------|
| Latency   |       |       |       |
| Flexibility|      |       |       |
| Robustness|       |       |       |
| Complexity|       |       |       |
| Cost      |       |       |       |

Your recommendation: _______________
Justification: _______________
```

### Task 9: Safety Considerations

Hospital environments have specific safety requirements. Address:

```
1. Patient Safety:
   - Risk: _______________
   - Mitigation: _______________

2. Collision Avoidance:
   - Risk: _______________
   - Mitigation: _______________

3. Emergency Response:
   - Scenario: _______________
   - Robot behavior: _______________

4. Privacy Concerns:
   - Risk: _______________
   - Mitigation: _______________
```

## Part 5: Integration Design

### Task 10: ROS 2 Architecture

Design the ROS 2 node structure:

```
Nodes:
- voice_interface_node: _______________
- planning_node: _______________
- navigation_node: _______________
- perception_node: _______________
- manipulation_node: _______________
- supervisor_node: _______________

Topics:
- /voice/intent: _______________
- /plan/actions: _______________
- /perception/objects: _______________
- _______________: _______________

Action Servers:
- /navigate_to_pose: _______________
- /pick_object: _______________
- /place_object: _______________
- _______________: _______________
```

### Task 11: Simulation Test Plan

Design a test plan for Isaac Sim validation:

```
Test Scenario 1: Happy Path
- Setup: _______________
- Command: _______________
- Expected result: _______________
- Verification: _______________

Test Scenario 2: Object Not Found
- Setup: _______________
- Command: _______________
- Expected behavior: _______________
- Verification: _______________

Test Scenario 3: Path Blocked
- Setup: _______________
- Command: _______________
- Expected behavior: _______________
- Verification: _______________

Test Scenario 4: [Your choice]
- Setup: _______________
- Command: _______________
- Expected behavior: _______________
- Verification: _______________
```

## Validation Checklist

After completing this exercise, verify:

- [ ] Complete pipeline architecture defined
- [ ] All action primitives specified
- [ ] Intent taxonomy designed
- [ ] Full command trace completed with timeline
- [ ] Failure modes identified for each stage
- [ ] Recovery strategies designed
- [ ] Architecture alternatives compared
- [ ] Safety considerations addressed
- [ ] ROS 2 structure designed
- [ ] Simulation test plan created

## Submission Guidelines

Your capstone should include:

1. **Architecture diagram** (Part 1, Task 1)
2. **Primitive definitions** (Part 1, Task 2)
3. **Intent taxonomy** (Part 1, Task 3)
4. **Complete command trace** (Part 2, Tasks 4-5)
5. **Failure analysis** (Part 3, Tasks 6-7)
6. **Architecture comparison** (Part 4, Task 8)
7. **Safety design** (Part 4, Task 9)
8. **ROS 2 design** (Part 5, Task 10)
9. **Test plan** (Part 5, Task 11)

## Reflection Questions

After completing the capstone, consider:

1. What was the most challenging aspect of the system design?
2. Which pipeline stage has the highest risk of failure?
3. How would you prioritize improvements to the system?
4. What additional capabilities would make the robot more useful?

## Next Steps

- Review [Module Introduction](./intro.md) for complete learning path
- Explore [Quickstart Guide](./quickstart-guide.md) for implementation resources
- Return to prior chapters for concept review as needed
