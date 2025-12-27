# Data Model: Docusaurus UI Enhancement

**Date**: 2025-12-23
**Feature**: 005-docusaurus-ui-enhancement
**Branch**: 005-docusaurus-ui-enhancement

## Overview

This document defines the data entities and configuration structures for the UI enhancement. Since this is a front-end only feature, "data" refers to theme configuration, component props, and styling tokens rather than database entities.

---

## 1. Theme Configuration Entity

### ThemeColors

Defines the color palette for light and dark modes.

```typescript
interface ThemeColors {
  light: {
    primary: string;         // #1a365d - Deep Tech Blue
    primaryLight: string;    // #3182ce - Sky Blue
    primaryDark: string;     // #0d1b2a - Navy
    accent: string;          // #00d4ff - Electric Cyan
    background: string;      // #ffffff - White
    surface: string;         // #f8fafc - Light gray
    textPrimary: string;     // #1e293b - Dark slate
    textSecondary: string;   // #4a5568 - Warm gray
    border: string;          // #e2e8f0 - Light border
    success: string;         // #10b981 - Green
    warning: string;         // #f59e0b - Amber
    error: string;           // #ef4444 - Red
    info: string;            // #3b82f6 - Blue
  };
  dark: {
    primary: string;         // #22d3ee - Bright Cyan
    primaryLight: string;    // #67e8f9 - Light Cyan
    primaryDark: string;     // #0891b2 - Deep Cyan
    accent: string;          // #00d4ff - Electric Cyan
    background: string;      // #0f172a - Deep Navy
    surface: string;         // #1e293b - Dark Slate
    textPrimary: string;     // #f1f5f9 - Off White
    textSecondary: string;   // #94a3b8 - Cool Gray
    border: string;          // #334155 - Dark border
    success: string;         // #34d399 - Light Green
    warning: string;         // #fbbf24 - Light Amber
    error: string;           // #f87171 - Light Red
    info: string;            // #60a5fa - Light Blue
  };
}
```

### Validation Rules

- All color values must be valid 6-digit hex codes
- Contrast ratio between `textPrimary` and `background` must be >= 4.5:1
- Contrast ratio between `textSecondary` and `background` must be >= 3:1

---

## 2. Typography Entity

### TypographyConfig

Defines font families, sizes, and weights.

```typescript
interface TypographyConfig {
  fontFamily: {
    base: string;      // System font stack
    monospace: string; // JetBrains Mono stack
    heading: string;   // Same as base or custom
  };
  fontSize: {
    xs: string;    // 0.75rem (12px)
    sm: string;    // 0.875rem (14px)
    base: string;  // 1rem (16px)
    lg: string;    // 1.125rem (18px)
    xl: string;    // 1.25rem (20px)
    '2xl': string; // 1.5rem (24px)
    '3xl': string; // 2rem (32px)
    '4xl': string; // 2.5rem (40px)
  };
  fontWeight: {
    normal: number;   // 400
    medium: number;   // 500
    semibold: number; // 600
    bold: number;     // 700
  };
  lineHeight: {
    tight: number;  // 1.2
    snug: number;   // 1.375
    normal: number; // 1.5
    relaxed: number; // 1.7
    loose: number;  // 2
  };
}
```

---

## 3. Spacing Entity

### SpacingConfig

Defines consistent spacing tokens.

```typescript
interface SpacingConfig {
  xs: string;   // 0.25rem (4px)
  sm: string;   // 0.5rem (8px)
  md: string;   // 1rem (16px)
  lg: string;   // 1.5rem (24px)
  xl: string;   // 2rem (32px)
  '2xl': string; // 3rem (48px)
  '3xl': string; // 4rem (64px)
}
```

---

## 4. Layout Entity

### LayoutConfig

Defines responsive layout parameters.

```typescript
interface LayoutConfig {
  containerMaxWidth: string;  // 1400px
  contentMaxWidth: string;    // 800px
  sidebarWidth: string;       // 280px
  headerHeight: string;       // 60px
  breakpoints: {
    mobile: string;  // 768px
    tablet: string;  // 1024px
    desktop: string; // 1280px
    wide: string;    // 1536px
  };
  borderRadius: {
    none: string;  // 0
    sm: string;    // 4px
    md: string;    // 8px
    lg: string;    // 12px
    xl: string;    // 16px
    full: string;  // 9999px
  };
}
```

---

## 5. Homepage Feature Entity

### FeatureItem

Defines the structure for homepage feature cards.

```typescript
interface FeatureItem {
  id: string;           // Unique identifier
  title: string;        // Feature title
  description: string;  // Feature description (ReactNode allowed)
  icon: string;         // Path to SVG icon or icon component name
  link?: string;        // Optional link to related documentation
  badge?: string;       // Optional badge text (e.g., "New", "Updated")
}
```

### Predefined Features

| ID | Title | Icon | Link |
|----|-------|------|------|
| `ros2-foundations` | ROS 2 Foundations | network-nodes.svg | /docs/module1/intro |
| `digital-twin` | Digital Twin Simulation | simulation-3d.svg | /docs/digital-twin-robotics/physics-simulation |
| `ai-robotics` | AI-Powered Robotics | neural-brain.svg | /docs/isaac-robotic-brain/quickstart-guide |
| `vla-systems` | Vision-Language-Action | voice-action.svg | /docs/vla-humanoid-robotics/intro |

---

## 6. Navigation Entity

### NavItem

Defines sidebar and navbar navigation items.

```typescript
interface NavItem {
  label: string;        // Display text
  to?: string;          // Internal link path
  href?: string;        // External link URL
  position?: 'left' | 'right'; // Navbar position
  items?: NavItem[];    // Nested items for dropdowns
  icon?: string;        // Optional icon
  className?: string;   // Custom CSS class
}
```

### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string;   // Display text
  href: string;    // Link path
  isActive: boolean; // Is current page
}
```

---

## 7. Component State Entity

### SidebarState

```typescript
interface SidebarState {
  isCollapsed: boolean;
  expandedCategories: string[];
  activeItem: string | null;
}
```

### ThemeState

```typescript
interface ThemeState {
  colorMode: 'light' | 'dark';
  respectPrefersColorScheme: boolean;
}
```

---

## 8. CSS Variable Mapping

Maps data model values to Docusaurus/Infima CSS variables.

### Color Variables

| Entity Property | CSS Variable |
|-----------------|--------------|
| `colors.light.primary` | `--ifm-color-primary` |
| `colors.light.primaryDark` | `--ifm-color-primary-dark` |
| `colors.light.primaryLight` | `--ifm-color-primary-light` |
| `colors.light.background` | `--ifm-background-color` |
| `colors.light.surface` | `--ifm-background-surface-color` |
| `colors.light.textPrimary` | `--ifm-font-color-base` |
| `colors.light.border` | `--ifm-color-emphasis-300` |

### Typography Variables

| Entity Property | CSS Variable |
|-----------------|--------------|
| `typography.fontFamily.base` | `--ifm-font-family-base` |
| `typography.fontFamily.monospace` | `--ifm-font-family-monospace` |
| `typography.fontSize.base` | `--ifm-font-size-base` |
| `typography.lineHeight.normal` | `--ifm-line-height-base` |

### Layout Variables

| Entity Property | CSS Variable |
|-----------------|--------------|
| `layout.containerMaxWidth` | `--ifm-container-width` |
| `layout.sidebarWidth` | `--doc-sidebar-width` |
| `layout.borderRadius.md` | `--ifm-global-radius` |

---

## 9. State Persistence

### LocalStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `theme` | `'light' \| 'dark'` | Color mode preference |
| `docusaurus.sidebar.collapsed` | `boolean` | Sidebar collapse state |

---

## Entity Relationships

```
ThemeColors
    │
    ├── Applied to → All Components
    │
    └── Persisted via → LocalStorage (theme preference)

TypographyConfig
    │
    └── Applied to → Document body, headings, code blocks

LayoutConfig
    │
    ├── Controls → Responsive breakpoints
    │
    └── Applied to → Container, sidebar, content area

FeatureItem[]
    │
    └── Rendered by → HomepageFeatures component

NavItem[]
    │
    ├── Rendered by → Navbar component
    │
    └── Rendered by → Sidebar component
```
