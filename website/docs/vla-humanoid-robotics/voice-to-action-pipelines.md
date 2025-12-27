# Voice-to-Action Pipelines

Voice processing enables natural human-robot interaction through spoken commands. This chapter covers the architecture of converting speech to robot actions.

## Pipeline Overview

The voice-to-action pipeline transforms spoken commands into executable robot behavior through a series of processing stages:

```
Audio Input → Speech-to-Text → Intent Extraction → Action Mapping → Robot Execution
```

Each stage has specific responsibilities and failure modes that must be understood for robust system design.

## Speech-to-Text Architecture

### OpenAI Whisper

Whisper is an automatic speech recognition (ASR) system that converts audio to text. Its architecture is relevant to robotics for several reasons:

**Key Characteristics**:

| Feature | Implication for Robotics |
|---------|-------------------------|
| Multilingual | Supports international deployment |
| Robust to noise | Functions in real-world acoustic environments |
| Punctuation-aware | Produces structured output for downstream processing |
| Variable latency | Tradeoff between speed and accuracy |

**System Position**: Whisper sits at the pipeline entry point. Its output quality determines the ceiling for all downstream processing.

### Audio Preprocessing

Before transcription, audio requires preprocessing:

1. **Noise filtering**: Remove background sounds (robot motors, environment)
2. **Voice activity detection**: Identify speech segments vs silence
3. **Normalization**: Standardize volume levels
4. **Segmentation**: Break continuous audio into processable chunks

**Design Decision**: Where does preprocessing occur? Options include on-robot, edge device, or cloud. Each has latency, privacy, and compute tradeoffs.

## Intent Mapping

After transcription, the system must understand what the user wants.

### Intent Classification Approaches

| Approach | Strengths | Weaknesses |
|----------|-----------|------------|
| Rule-based | Predictable, fast, no training | Brittle, limited vocabulary |
| ML classifiers | Handles variations | Requires training data |
| LLM-based | Flexible, contextual | Higher latency, less predictable |

### Command Categories

Robot voice commands typically fall into patterns:

**Navigation**: "Go to the kitchen", "Move forward two meters"
- Extracted entities: location, distance, direction

**Manipulation**: "Pick up the red cup", "Open the door"
- Extracted entities: object, color, action type

**Queries**: "What do you see?", "Where is the table?"
- Expected response: information, not physical action

**Complex Tasks**: "Bring me a drink from the kitchen"
- Requires decomposition into sub-actions

### Entity Extraction

Intent classification identifies the action type. Entity extraction identifies the parameters:

```
Input: "Pick up the red cup from the table"

Intent: MANIPULATION.PICK
Entities:
  - object: cup
  - color: red
  - location: table
```

**Challenge**: Ambiguity. "Get that thing" requires visual grounding to resolve "that thing" to a specific object.

## Complete Pipeline Architecture

### Module Decomposition

```
┌─────────────────────────────────────────────────────────────┐
│                    Voice-to-Action Pipeline                  │
├─────────────┬─────────────┬──────────────┬─────────────────┤
│   Audio     │    ASR      │    NLU       │   Action        │
│ Processing  │  (Whisper)  │  (Intent)    │   Mapping       │
├─────────────┼─────────────┼──────────────┼─────────────────┤
│ - Capture   │ - Transcribe│ - Classify   │ - Map to        │
│ - Filter    │ - Confidence│ - Extract    │   primitives    │
│ - Segment   │   scores    │   entities   │ - Validate      │
│             │             │ - Resolve    │ - Queue for     │
│             │             │   ambiguity  │   execution     │
└─────────────┴─────────────┴──────────────┴─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Robot Control  │
                    │  (ROS 2)        │
                    └─────────────────┘
```

### Data Flow

1. **Audio Capture**: Microphones capture raw audio
2. **Preprocessing**: Clean and segment audio
3. **Transcription**: Whisper produces text with confidence scores
4. **Intent Classification**: Determine action category
5. **Entity Extraction**: Identify parameters (objects, locations)
6. **Validation**: Check if action is feasible
7. **Action Mapping**: Convert to robot primitives
8. **Execution**: Send to ROS 2 action servers

### Integration with Isaac Technologies

In simulation environments:

- **Isaac Sim**: Test voice pipelines with simulated audio and robot responses
- **Isaac ROS**: GPU-accelerated processing for perception feedback
- **Nav2**: Navigation commands interface directly with path planning

## Failure Modes and Handling

### Recognition Failures

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Low confidence transcription | Confidence score < threshold | Request repetition |
| Unknown vocabulary | Out-of-vocabulary detection | Clarification prompt |
| Incomplete audio | Truncated segment detection | Wait for complete utterance |

### Intent Ambiguity

When intent is unclear:

1. **Clarification dialog**: "Did you mean pick up or put down?"
2. **Context inference**: Use conversation history
3. **Safe default**: Request explicit confirmation

### Execution Failures

If the robot cannot execute the understood command:

- Object not found → Report and request guidance
- Path blocked → Replan or report obstacle
- Action unsafe → Refuse with explanation

## Design Considerations

### Latency Budget

For responsive interaction, target end-to-end latency under 2 seconds:

| Stage | Target | Notes |
|-------|--------|-------|
| Audio capture | 100ms | Buffer size dependent |
| Preprocessing | 50ms | On-device |
| ASR | 500ms | Model size dependent |
| NLU | 200ms | Complexity dependent |
| Action mapping | 100ms | Lookup vs compute |
| Feedback | 50ms | Acknowledgment |

### Privacy Considerations

Voice data is sensitive. Design decisions:

- On-device vs cloud processing
- Data retention policies
- User consent and transparency

## Summary

The voice-to-action pipeline converts spoken commands into robot actions through:

1. Audio preprocessing and capture
2. Speech-to-text transcription (Whisper architecture)
3. Intent classification and entity extraction
4. Action mapping to robot primitives
5. Execution via ROS 2

Key design considerations include latency budgets, failure handling, and privacy.

## Next Steps

- [Voice to Action Exercise](./voice-to-action-exercise.md): Design intent mappings
- [Cognitive Planning with LLMs](./cognitive-planning-llms.md): Task decomposition
