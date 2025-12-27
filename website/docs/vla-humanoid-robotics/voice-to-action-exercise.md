# Voice to Action Exercise

This exercise reinforces voice-to-action pipeline concepts through design and analysis tasks.

## Objectives

After completing this exercise, you will be able to:

- Design intent mappings for common robot commands
- Trace data flow through the voice-to-action pipeline
- Identify failure points and propose mitigations

## Exercise 1: Intent Mapping Design

Design intent classifications for the following five robot commands. For each, identify:
- Intent category
- Extracted entities
- Ambiguities that require resolution

### Commands to Analyze

**Command 1**: "Go to the kitchen and wait by the door"

```
Your Analysis:
- Intent: _______________
- Entities: _______________
- Ambiguities: _______________
```

**Command 2**: "Pick up the blue bottle on the counter"

```
Your Analysis:
- Intent: _______________
- Entities: _______________
- Ambiguities: _______________
```

**Command 3**: "Show me what you can see"

```
Your Analysis:
- Intent: _______________
- Entities: _______________
- Ambiguities: _______________
```

**Command 4**: "Put that down carefully"

```
Your Analysis:
- Intent: _______________
- Entities: _______________
- Ambiguities: _______________
```

**Command 5**: "Follow me to the living room"

```
Your Analysis:
- Intent: _______________
- Entities: _______________
- Ambiguities: _______________
```

### Expected Analysis Pattern

For Command 1, a complete analysis would be:

```
Intent: NAVIGATION.GOTO_AND_WAIT
Entities:
  - destination: kitchen
  - wait_location: door
  - wait_condition: unspecified (time-based? event-based?)
Ambiguities:
  - Which door? (kitchen may have multiple doors)
  - How long to wait?
  - What triggers end of wait?
```

## Exercise 2: Pipeline Trace

Trace the following command through all pipeline stages:

**Input**: "Hey robot, bring me the red mug from the table in the kitchen"

### Stage 1: Audio Processing

```
Questions to answer:
1. What preprocessing steps occur before ASR?
2. How is "Hey robot" handled differently from the command?
3. What audio quality factors affect downstream processing?
```

### Stage 2: Speech-to-Text (ASR)

```
Questions to answer:
1. What is the expected transcription output?
2. What confidence score threshold would you set?
3. How would you handle partial transcriptions?
```

### Stage 3: Natural Language Understanding

```
Questions to answer:
1. What is the primary intent?
2. List all extracted entities.
3. What contextual information is needed for disambiguation?
```

### Stage 4: Action Mapping

```
Questions to answer:
1. What sequence of robot primitives is required?
2. What validation checks should occur before execution?
3. How does this integrate with ROS 2?
```

### Expected Pipeline Trace

A complete trace would include:

```
Stage 1: Audio Processing
- Wake word detection removes "Hey robot"
- Command audio segmented: "bring me the red mug from the table in the kitchen"
- Noise filtering applied
- Audio normalized to standard levels

Stage 2: ASR
- Transcription: "bring me the red mug from the table in the kitchen"
- Confidence: 0.94
- No out-of-vocabulary words detected

Stage 3: NLU
- Intent: FETCH_OBJECT
- Entities:
  - action: bring
  - object: mug
  - object_attribute: red
  - source_furniture: table
  - source_location: kitchen
  - destination: user_location (implicit)

Stage 4: Action Mapping
Primitive sequence:
1. NAVIGATE(kitchen)
2. LOCATE(table)
3. PERCEIVE(mug, color=red)
4. APPROACH(mug)
5. GRASP(mug)
6. NAVIGATE(user_location)
7. HANDOVER(mug)
```

## Exercise 3: Failure Analysis

For each failure scenario, describe detection methods and recovery strategies.

### Scenario A: Low Confidence Transcription

The ASR returns: "bring me the [unintelligible] mug from the table"

```
Questions:
1. How is this failure detected?
2. What recovery options exist?
3. How do you communicate the issue to the user?
```

### Scenario B: Ambiguous Reference

User says: "Pick up that thing"

```
Questions:
1. Why is this problematic?
2. What information is needed to resolve it?
3. Design a clarification dialog.
```

### Scenario C: Infeasible Command

User says: "Fly to the roof and get my drone"

```
Questions:
1. At what pipeline stage is this detected?
2. How does the system determine infeasibility?
3. What response is appropriate?
```

### Expected Failure Analysis

For Scenario A:

```
Detection:
- ASR returns confidence < threshold for segment
- Word-level confidence identifies "[unintelligible]" as uncertain

Recovery Options:
1. Request repetition: "I didn't catch part of that. What color mug?"
2. Offer alternatives: "Did you say red mug, blue mug, or something else?"
3. Proceed with partial information if safe

User Communication:
"I heard 'bring me the mug from the table' but I'm not sure about the
color. Could you repeat which mug you'd like?"
```

## Exercise 4: System Design

Design a voice-to-action subsystem for a specific use case.

### Scenario: Kitchen Assistant Robot

The robot operates in a kitchen environment and should handle:
- Navigation commands within the kitchen
- Object manipulation (dishes, utensils, containers)
- Information queries about kitchen state

### Design Tasks

1. **Define your intent taxonomy**
   - List all intent categories
   - Define entity types for each category

2. **Specify your confidence thresholds**
   - When to execute vs. clarify
   - When to reject entirely

3. **Design your error handling strategy**
   - Recovery dialogs for each failure type
   - Escalation criteria

4. **Integration points**
   - How does voice connect to perception?
   - How does voice connect to manipulation?
   - How does voice connect to navigation?

## Validation Checklist

After completing these exercises, verify you can:

- [ ] Classify intents for common robot commands
- [ ] Extract entities from natural language commands
- [ ] Identify ambiguities requiring clarification
- [ ] Trace commands through all pipeline stages
- [ ] Propose failure detection and recovery strategies
- [ ] Design intent taxonomies for specific domains

## Next Steps

- [Cognitive Planning with LLMs](./cognitive-planning-llms.md): Learn how LLMs decompose commands
- [LLM-ROS 2 Integration](./llm-ros2-integration.md): Connect planning to execution
