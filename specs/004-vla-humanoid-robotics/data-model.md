# Data Model: Vision-Language-Action for Humanoid Robotics

**Date**: 2024-12-23
**Branch**: `004-vla-humanoid-robotics`
**Purpose**: Define content entities and their relationships for the VLA module

---

## 1. Content Entities

### Module Entity

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | `vla-humanoid-robotics` |
| label | string | `Module 4 - Vision-Language-Action` |
| directory | path | `website/docs/vla-humanoid-robotics/` |
| prerequisites | array | [module1, digital-twin-robotics, isaac-robotic-brain] |
| chapters | array | Reference to Chapter entities |
| quickstart | reference | Link to quickstart guide |

### Chapter Entity

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique chapter identifier |
| label | string | Display name in sidebar |
| order | number | Position in module (1, 2, 3) |
| topics | array | Reference to Topic entities |
| exercise | reference | Associated exercise file |
| learningObjectives | array | What students will learn |

### Topic Entity

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique topic identifier (filename without .md) |
| title | string | H1 heading in document |
| chapter | reference | Parent chapter |
| content | markdown | Topic content |
| codeExamples | array | Embedded code snippets |
| diagrams | array | Visual content references |

### Exercise Entity

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique exercise identifier |
| title | string | Exercise name |
| chapter | reference | Associated chapter |
| objectives | array | Learning goals |
| steps | array | Step-by-step instructions |
| expectedOutcome | string | What success looks like |

---

## 2. File Structure Mapping

### Module 4 Content Files

```
vla-humanoid-robotics/
│
├── README.md                           # Module overview
│   ├── title: "Vision-Language-Action for Humanoid Robotics"
│   ├── learningObjectives: [...]
│   ├── prerequisites: [...]
│   └── chapterLinks: [...]
│
├── Chapter 1: Voice to Action
│   ├── voice-to-action-pipelines.md    # Main topic
│   │   ├── title: "Voice-to-Action Pipelines"
│   │   ├── sections: [whisper, intent-mapping, pipeline]
│   │   └── integration: isaac
│   │
│   └── voice-to-action-exercise.md     # Exercise
│       ├── title: "Hands-on: Voice Command Processing"
│       └── objectives: [transcription, intent-extraction]
│
├── Chapter 2: Cognitive Planning
│   ├── cognitive-planning-llms.md      # Main topic
│   │   ├── title: "Cognitive Planning with LLMs"
│   │   ├── sections: [task-decomposition, action-sequences]
│   │   └── examples: [simple-commands, complex-tasks]
│   │
│   ├── llm-ros2-integration.md         # Integration topic
│   │   ├── title: "LLM to ROS 2 Integration Concepts"
│   │   ├── sections: [action-mapping, behavior-trees]
│   │   └── interfaces: [action-server, service-client]
│   │
│   └── cognitive-planning-exercise.md  # Exercise
│       ├── title: "Hands-on: LLM Task Planning"
│       └── objectives: [decomposition, sequencing]
│
├── Chapter 3: Capstone
│   ├── capstone-autonomous-humanoid.md # Main topic
│   │   ├── title: "The Autonomous Humanoid"
│   │   ├── sections: [architecture, pipeline, integration]
│   │   └── flow: voice→plan→navigate→perceive→manipulate
│   │
│   └── capstone-exercise.md            # Exercise
│       ├── title: "Capstone: End-to-End VLA System"
│       └── objectives: [design, trace, evaluate]
│
└── quickstart-guide.md                 # Getting started
    ├── title: "Quickstart Guide"
    ├── prerequisites: [...]
    └── steps: [...]
```

---

## 3. Sidebar Data Structure

### Sidebar Configuration Entity

```typescript
// Type definition for sidebar entry
interface SidebarCategory {
  type: 'category';
  label: string;
  items: (string | SidebarCategory)[];
}

// Module 4 Sidebar Structure
const module4Sidebar: SidebarCategory = {
  type: 'category',
  label: 'Module 4 - Vision-Language-Action',
  items: [
    'vla-humanoid-robotics/README',
    {
      type: 'category',
      label: 'Chapter 1: Voice to Action',
      items: [
        'vla-humanoid-robotics/voice-to-action-pipelines',
        'vla-humanoid-robotics/voice-to-action-exercise',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 2: Cognitive Planning',
      items: [
        'vla-humanoid-robotics/cognitive-planning-llms',
        'vla-humanoid-robotics/llm-ros2-integration',
        'vla-humanoid-robotics/cognitive-planning-exercise',
      ],
    },
    {
      type: 'category',
      label: 'Chapter 3: Capstone Project',
      items: [
        'vla-humanoid-robotics/capstone-autonomous-humanoid',
        'vla-humanoid-robotics/capstone-exercise',
      ],
    },
    'vla-humanoid-robotics/quickstart-guide',
  ],
};
```

---

## 4. Cross-Reference Relationships

### Module Dependencies

```
Module 1 (ROS 2)
    └── Module 2 (Digital Twin)
            └── Module 3 (Isaac)
                    └── Module 4 (VLA) ← Current
```

### Content Cross-References

| From | To | Relationship |
|------|----|--------------|
| VLA README | Module 1-3 | Prerequisites |
| Voice-to-Action | Isaac ROS | Integration context |
| LLM-ROS2 Integration | Module 1 ROS concepts | Foundation |
| Capstone | All prior modules | Synthesis |
| Capstone | Nav2 (Module 3) | Navigation component |

---

## 5. Validation Rules

### File Naming Convention
- Pattern: `kebab-case.md`
- Valid: `voice-to-action-pipelines.md`
- Invalid: `VoiceToAction.md`, `voice_to_action.md`

### Frontmatter Requirements (optional for Docusaurus)
```yaml
---
sidebar_position: 1  # Optional ordering
title: "Page Title"   # Optional override
---
```

### Content Structure Rules
- H1 heading must match sidebar label intent
- Code blocks must specify language for syntax highlighting
- Internal links use relative paths: `./other-topic.md`
- Cross-module links: `../module-name/topic.md`

---

## 6. State Transitions

### Document Lifecycle

```
Draft → Review → Published
  │        │         │
  │        │         └── Available in production build
  │        └── Under review (dev environment)
  └── Initial creation
```

### Module Completion States

| State | Files Complete | Sidebar Added | Footer Updated |
|-------|----------------|---------------|----------------|
| Planning | 0% | No | No |
| Development | 1-99% | Yes | No |
| Review | 100% | Yes | No |
| Published | 100% | Yes | Yes |

---

## 7. Content Templates

### Topic File Template

```markdown
# [Topic Title]

## Introduction

[Brief overview of the topic]

## [Section 1]

[Content]

### [Subsection]

[Detailed content]

## [Section 2]

[Content with code examples]

\`\`\`python
# Example code
\`\`\`

## Summary

[Key takeaways]

## Next Steps

- [Link to next topic](./next-topic.md)
- [Link to exercise](./chapter-exercise.md)
```

### Exercise File Template

```markdown
# [Exercise Title]

## Objectives

After completing this exercise, you will be able to:
- [Objective 1]
- [Objective 2]

## Prerequisites

- [Required prior knowledge]
- [Required tools/setup]

## Exercise Steps

### Step 1: [Step Title]

[Instructions]

### Step 2: [Step Title]

[Instructions]

## Expected Outcome

[What success looks like]

## Troubleshooting

### Common Issue 1
[Solution]

## Further Exploration

- [Optional advanced topic]
```
