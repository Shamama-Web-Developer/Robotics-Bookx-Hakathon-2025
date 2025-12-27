# Cognitive Planning Exercise

This exercise reinforces LLM-based planning concepts through prompt design and action sequence analysis.

## Objectives

After completing this exercise, you will be able to:

- Design effective prompts for robot task decomposition
- Generate valid action sequences for complex commands
- Evaluate tradeoffs between different planning strategies
- Identify and handle planning edge cases

## Exercise 1: Prompt Design

Design prompts for an LLM-based task planner. For each scenario, create a complete prompt that includes all necessary components.

### Scenario A: Home Assistant Robot

**Context**: A mobile manipulator robot in a home environment.

**Available Primitives**:
- navigate(location)
- locate(object)
- grasp(object)
- place(object, surface)
- open(container)
- close(container)
- handover(object)

**Your Task**: Design a prompt for the goal "Clean up the living room"

```
Your Prompt Design:

System message:
_________________________________
_________________________________
_________________________________

Available actions section:
_________________________________
_________________________________

Robot capabilities section:
_________________________________
_________________________________

Current state section:
_________________________________
_________________________________

Output format section:
_________________________________
_________________________________

Example (if using few-shot):
_________________________________
_________________________________
```

### Scenario B: Kitchen Robot

**Context**: A humanoid robot working in a kitchen.

**Available Primitives**:
- navigate(location)
- grasp(object)
- pour(source, target)
- stir(container, duration)
- heat(appliance, temperature, duration)
- wait(duration)

**Your Task**: Design a prompt for the goal "Make me a cup of tea"

```
Your Prompt Design:

[Write your complete prompt here]
```

### Evaluation Criteria

Your prompts should:
- [ ] Clearly define the robot's role
- [ ] List all available primitives with descriptions
- [ ] Specify robot capabilities and constraints
- [ ] Define expected output format
- [ ] Include relevant context (location, known objects)

## Exercise 2: Action Sequence Generation

Given the following goals, generate valid action sequences. Consider preconditions and effects.

### Task A: "Put all the books on the shelf"

**Current State**:
- Robot at: living room
- Books on: coffee table (3 books)
- Bookshelf: living room

**Available Primitives**:
- navigate(location)
- locate(object_type)
- grasp(object)
- place(object, surface)

```
Your Action Sequence:

Step 1: _______________
Step 2: _______________
Step 3: _______________
[Add more steps as needed]
```

**Questions to Consider**:
1. How do you handle multiple books?
2. What if the robot can only carry one book at a time?
3. How would you structure this as a loop vs explicit steps?

### Task B: "Set the table for dinner"

**Current State**:
- Robot at: kitchen
- Plates in: cabinet
- Utensils in: drawer
- Dining table: empty

**Available Primitives**:
- navigate(location)
- open(container)
- close(container)
- grasp(object)
- place(object, location)

```
Your Action Sequence:

[Generate a complete sequence]
```

### Expected Analysis

For Task A, a valid sequence might be:

```
1. locate(books)                    # Find books on coffee table
2. grasp(book_1)                    # Pick up first book
3. navigate(bookshelf)              # Go to bookshelf
4. place(book_1, bookshelf)         # Put book on shelf
5. navigate(coffee_table)           # Return for next book
6. grasp(book_2)                    # Pick up second book
7. navigate(bookshelf)              # Go to bookshelf
8. place(book_2, bookshelf)         # Put book on shelf
9. navigate(coffee_table)           # Return for last book
10. grasp(book_3)                   # Pick up third book
11. navigate(bookshelf)             # Go to bookshelf
12. place(book_3, bookshelf)        # Put last book on shelf
```

Alternative (if robot has two arms):
```
1. locate(books)
2. grasp(book_1, left_arm)
3. grasp(book_2, right_arm)
4. navigate(bookshelf)
5. place(book_1, bookshelf)
6. place(book_2, bookshelf)
7. navigate(coffee_table)
8. grasp(book_3)
9. navigate(bookshelf)
10. place(book_3, bookshelf)
```

## Exercise 3: Planning Strategy Evaluation

Compare different decomposition strategies for the same goal.

### Goal: "Prepare breakfast"

**Strategy A: Coarse Decomposition**
```
1. make_coffee()
2. make_toast()
3. set_table()
4. serve_breakfast()
```

**Strategy B: Fine Decomposition**
```
1. navigate(kitchen)
2. locate(coffee_maker)
3. grasp(coffee_pot)
4. navigate(sink)
5. fill(coffee_pot, water)
... [20+ more steps]
```

### Analysis Questions

1. **Flexibility**: Which strategy adapts better to unexpected situations?

```
Your Analysis:
_________________________________
_________________________________
```

2. **Validation**: Which strategy is easier to verify for correctness?

```
Your Analysis:
_________________________________
_________________________________
```

3. **Latency**: Which strategy produces faster LLM responses?

```
Your Analysis:
_________________________________
_________________________________
```

4. **Recovery**: If step 3 fails, which strategy recovers more easily?

```
Your Analysis:
_________________________________
_________________________________
```

### Recommendation

Based on your analysis, when would you choose each strategy?

```
Use Coarse Decomposition when:
_________________________________

Use Fine Decomposition when:
_________________________________

Hybrid approach (describe):
_________________________________
```

## Exercise 4: Error Handling Design

For each failure scenario, design a recovery strategy.

### Scenario 1: Object Not Found

**Goal**: "Bring me the newspaper"
**Failure**: locate(newspaper) returns empty

```
Recovery Strategy:
1. _______________
2. _______________
3. _______________
```

### Scenario 2: Action Failed

**Goal**: "Open the jar"
**Failure**: grasp(jar_lid) returns "grasp failed - lid too tight"

```
Recovery Strategy:
1. _______________
2. _______________
3. _______________
```

### Scenario 3: Blocked Path

**Goal**: "Go to the bedroom"
**Failure**: navigate(bedroom) returns "path blocked"

```
Recovery Strategy:
1. _______________
2. _______________
3. _______________
```

### Expected Recovery Patterns

For Scenario 1:

```
Recovery Strategy:
1. Search alternative locations (mailbox, porch, table)
2. Ask user for newspaper location
3. Report inability to find and suggest alternatives

Dialog example:
"I couldn't find the newspaper in the usual spot.
Should I check the mailbox, or can you tell me where it is?"
```

## Exercise 5: System Design

Design a complete LLM planning subsystem for a specific use case.

### Use Case: Office Delivery Robot

The robot delivers items between offices in a building.

**Design Tasks**:

1. **Define your action primitives**
```
List of primitives:
- _______________
- _______________
- _______________
[Add more as needed]
```

2. **Design your prompt template**
```
[Write complete prompt]
```

3. **Specify validation rules**
```
Before executing, verify:
- _______________
- _______________
- _______________
```

4. **Define error recovery policies**
```
If delivery fails:
- _______________

If path blocked:
- _______________

If recipient not found:
- _______________
```

5. **Describe ROS 2 action mapping**
```
| LLM Action | ROS 2 Action Server | Parameters |
|------------|--------------------|-----------------------|
| __________ | __________________ | _____________________ |
| __________ | __________________ | _____________________ |
```

## Validation Checklist

After completing these exercises, verify you can:

- [ ] Design complete prompts for task decomposition
- [ ] Generate valid action sequences with proper ordering
- [ ] Evaluate tradeoffs between planning strategies
- [ ] Design recovery strategies for common failures
- [ ] Map LLM actions to ROS 2 interfaces
- [ ] Explain the role of behavior trees in sequencing

## Next Steps

- [Capstone: The Autonomous Humanoid](./capstone-autonomous-humanoid.md): Complete system integration
- [Capstone Exercise](./capstone-exercise.md): Design end-to-end VLA system
