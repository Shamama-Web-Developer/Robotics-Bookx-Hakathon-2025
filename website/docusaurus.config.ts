import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A comprehensive guide to ROS 2-based humanoid robot control',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here (Vercel deployment)
  url: 'https://robotics-bookx-hakathon-2025.vercel.app',
  // For Vercel deployment, baseUrl should be '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Shamama-Web-Developer', // Your GitHub username
  projectName: 'Robotics-Bookx-Hakathon-2025', // Your repo name

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Shamama-Web-Developer/Robotics-Bookx-Hakathon-2025/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Shamama-Web-Developer/Robotics-Bookx-Hakathon-2025/tree/main/website/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI & Humanoid Robotics Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Modules',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/Shamama-Web-Developer/Robotics-Bookx-Hakathon-2025',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modules',
          items: [
            {
              label: 'Module 1 - ROS 2 Foundations',
              to: '/docs/module1/intro',
            },
            {
              label: 'Module 2 - Digital Twin',
              to: '/docs/digital-twin-robotics/physics-simulation',
            },
            {
              label: 'Module 3 - Isaac Brain',
              to: '/docs/isaac-robotic-brain/quickstart-guide',
            },
            {
              label: 'Module 4 - VLA',
              to: '/docs/vla-humanoid-robotics/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'ROS Discourse',
              href: 'https://discourse.ros.org/',
            },
            {
              label: 'Robotics Stack Exchange',
              href: 'https://robotics.stackexchange.com/',
            },
            {
              label: 'NVIDIA Forums',
              href: 'https://forums.developer.nvidia.com/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'ROS 2 Docs',
              href: 'https://docs.ros.org/en/jazzy/',
            },
            {
              label: 'Isaac Sim',
              href: 'https://developer.nvidia.com/isaac-sim',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Shamama-Web-Developer/Robotics-Bookx-Hakathon-2025',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
