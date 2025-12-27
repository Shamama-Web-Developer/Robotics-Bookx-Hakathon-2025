# Quickstart: Vision-Language-Action Module

**Date**: 2024-12-23
**Branch**: `004-vla-humanoid-robotics`
**Purpose**: Step-by-step guide for implementing Module 4

---

## Prerequisites

Before starting, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Access to the repository
- [ ] Familiarity with Docusaurus structure
- [ ] Understanding of Markdown/MDX

---

## Quick Setup (5 minutes)

### Step 1: Create Module Directory

```bash
mkdir -p website/docs/vla-humanoid-robotics
```

### Step 2: Create Initial Files

Create these files in `website/docs/vla-humanoid-robotics/`:

| File | Purpose |
|------|---------|
| `README.md` | Module overview |
| `voice-to-action-pipelines.md` | Chapter 1 main content |
| `voice-to-action-exercise.md` | Chapter 1 exercise |
| `cognitive-planning-llms.md` | Chapter 2 main content |
| `llm-ros2-integration.md` | Chapter 2 integration topic |
| `cognitive-planning-exercise.md` | Chapter 2 exercise |
| `capstone-autonomous-humanoid.md` | Chapter 3 main content |
| `capstone-exercise.md` | Chapter 3 capstone project |
| `quickstart-guide.md` | Getting started guide |

### Step 3: Update Sidebar Configuration

Edit `website/sidebars.ts` and add Module 4 after Module 3:

```typescript
{
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
},
```

### Step 4: Update Footer Links

Edit `website/docusaurus.config.ts` footer section:

```typescript
{
  title: 'Modules',
  items: [
    {
      label: 'Module 1 - The Robotic Nervous System',
      to: '/docs/module1/intro',
    },
    {
      label: 'Module 4 - Vision-Language-Action',
      to: '/docs/vla-humanoid-robotics/README',
    },
  ],
},
```

### Step 5: Migrate Existing Content

```bash
# Move existing VLA content if present
mv website/docs/vla-robotics/voice-to-action-pipelines.md \
   website/docs/vla-humanoid-robotics/voice-to-action-pipelines.md

# Remove old directory
rm -rf website/docs/vla-robotics
```

### Step 6: Test Locally

```bash
cd website
npm install  # If not already done
npm start
```

Navigate to `http://localhost:3000/docs/vla-humanoid-robotics/README`

---

## File Content Starters

### README.md (Module Overview)

```markdown
# Vision-Language-Action for Humanoid Robotics

Welcome to Module 4! This module integrates language, vision, and action
to enable humanoid robots to understand human commands and execute
multi-step tasks using LLM-driven planning.

## Learning Objectives

After completing this module, you will be able to:
- Understand Vision Language Action (VLA) pipelines
- Convert voice commands into structured robot actions
- Use LLMs for cognitive task planning over ROS 2
- Understand end-to-end autonomy through a capstone project

## Prerequisites

This module builds on concepts from:
- Module 1: ROS 2 fundamentals
- Module 2: Digital twin simulation
- Module 3: Isaac perception and navigation

## Chapter Overview

1. **Voice to Action Pipelines** - Speech-to-text and intent mapping
2. **Cognitive Planning with LLMs** - Task decomposition and ROS 2 integration
3. **Capstone: The Autonomous Humanoid** - End-to-end system design

## Getting Started

Begin with [Voice to Action Pipelines](./voice-to-action-pipelines.md)
or review the [Quickstart Guide](./quickstart-guide.md).
```

### Exercise File Starter

```markdown
# Hands-on: [Topic] Exercise

## Objectives

After this exercise, you will be able to:
- [Objective 1]
- [Objective 2]

## Prerequisites

- Completed [previous topic](./previous-topic.md)
- Understanding of [concept]

## Exercise Overview

[Brief description of what students will build/analyze]

## Steps

### Step 1: [Title]

[Instructions with code examples]

### Step 2: [Title]

[Instructions]

## Validation

How to verify your work:
- [ ] Checkpoint 1
- [ ] Checkpoint 2

## Solution Discussion

[Explain expected outcomes]

## Next Steps

Continue to [next topic](./next-topic.md).
```

---

## Verification Checklist

After implementation, verify:

- [ ] All 9 markdown files created
- [ ] Sidebar shows Module 4 as final section
- [ ] All internal links work (no 404s)
- [ ] Footer includes Module 4 link
- [ ] `npm run build` completes without errors
- [ ] Local preview shows correct navigation

---

## Common Issues

### Sidebar Not Showing

1. Check file exists at correct path
2. Verify sidebar item path matches file location (without `.md`)
3. Restart dev server after sidebar changes

### Build Errors

```bash
# Clear cache and rebuild
cd website
npm run clear
npm run build
```

### Broken Links

- Use relative paths: `./other-file.md`
- Cross-module: `../other-module/file.md`
- Verify paths with `npm run build` (catches broken links)

---

## Development Workflow

1. Create/edit markdown files
2. Preview locally with `npm start`
3. Run `npm run build` to catch errors
4. Commit changes to `004-vla-humanoid-robotics` branch
5. Create PR for review
