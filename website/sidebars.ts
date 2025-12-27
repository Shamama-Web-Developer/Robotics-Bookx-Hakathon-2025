import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Module 1 - The Robotic Nervous System (ROS 2)',
      items: [
        'module1/intro',
        'module1/ros2-foundations',
        'module1/rclpy-communication',
        'module1/urdf-humanoid-description',
      ],
    },
    {
      type: 'category',
      label: 'Module 2 - Digital Twin Robotics',
      items: [
        'digital-twin-robotics/physics-simulation',
        'digital-twin-robotics/rendering-twins',
        'digital-twin-robotics/sensor-simulation',
      ],
    },
    {
      type: 'category',
      label: 'Module 4 - Vision-Language-Action',
      items: [
        'vla-humanoid-robotics/intro',
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
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
