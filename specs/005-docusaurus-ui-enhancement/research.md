# Research: Docusaurus UI Enhancement

**Date**: 2025-12-23
**Feature**: 005-docusaurus-ui-enhancement
**Branch**: 005-docusaurus-ui-enhancement

## Executive Summary

Analysis of the existing Docusaurus implementation reveals a standard template setup with minimal customization. This research defines the color palette, typography, layout strategy, and component customization approach for the Physical AI & Humanoid Robotics documentation site.

---

## 1. Existing UI Structure Analysis

### Current State

| Component | Status | Location |
|-----------|--------|----------|
| Theme CSS | Default Infima with green palette | `src/css/custom.css` |
| Homepage | Default template structure | `src/pages/index.tsx` |
| Features Section | Default 3-column SVG layout | `src/components/HomepageFeatures/` |
| Module CSS | Custom robotics styling exists | `src/css/robotics-module.css` |
| Dark Mode | Enabled via default config | `docusaurus.config.ts` |

### Findings

1. **Color Palette**: Currently using default green (`#2e8555`) which doesn't align with robotics/AI branding
2. **Typography**: Using Infima defaults without customization
3. **Homepage**: Uses generic Docusaurus template text ("Docusaurus Tutorial - 5min")
4. **Feature Cards**: Using default Docusaurus SVGs, not relevant to robotics content
5. **Existing Module CSS**: Good foundation in `robotics-module.css` with responsive grid patterns

---

## 2. Color Palette Decision

### Decision: Technical Blue-Purple Theme

A professional palette that conveys technology, precision, and innovation.

### Primary Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Deep Tech Blue | `#1a365d` | Headers, primary buttons, active states |
| Primary Light | Sky Blue | `#3182ce` | Links, accents, hover states |
| Primary Dark | Navy | `#0d1b2a` | Dark mode backgrounds, footer |
| Accent | Electric Cyan | `#00d4ff` | Highlights, code accents, badges |
| Secondary | Warm Gray | `#4a5568` | Body text, secondary elements |

### Dark Mode Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Deep Navy | `#0f172a` | Main background |
| Surface | Dark Slate | `#1e293b` | Cards, sidebar, elevated surfaces |
| Primary | Bright Cyan | `#22d3ee` | Links, active states |
| Text Primary | Off White | `#f1f5f9` | Headings, body text |
| Text Secondary | Cool Gray | `#94a3b8` | Muted text, metadata |

### Rationale
- Blue conveys trust and technical expertise (common in AI/robotics)
- Cyan accent provides visual energy without overwhelming
- High contrast ratios ensure WCAG AA compliance
- Consistent with ROS 2 and NVIDIA branding aesthetics

### Alternatives Considered
1. **Orange/Amber** - Too warm, doesn't convey technical precision
2. **Green (current)** - Generic, no brand differentiation
3. **Purple-only** - Lower readability, less professional feel

---

## 3. Typography Decision

### Decision: System Font Stack with Fallbacks

```css
--ifm-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                        'Helvetica Neue', Arial, sans-serif;
--ifm-font-family-monospace: 'JetBrains Mono', 'Fira Code', 'Consolas',
                              'Monaco', monospace;
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem | 700 | 1.2 |
| H2 | 2rem | 600 | 1.3 |
| H3 | 1.5rem | 600 | 1.4 |
| H4 | 1.25rem | 600 | 1.4 |
| Body | 1rem (16px) | 400 | 1.7 |
| Small | 0.875rem | 400 | 1.5 |
| Code | 0.9rem | 400 | 1.5 |

### Rationale
- System fonts ensure fast loading (no external font requests)
- JetBrains Mono is modern and highly readable for code
- Line height of 1.7 for body improves readability of technical content
- Weight progression provides clear visual hierarchy

### Alternatives Considered
1. **Inter font** - Good but requires external loading
2. **Roboto** - Overused, less distinctive
3. **Source Sans Pro** - Good but system fonts are faster

---

## 4. Layout Strategy Decision

### Decision: Responsive Three-Breakpoint System

| Breakpoint | Width | Layout | Sidebar |
|------------|-------|--------|---------|
| Mobile | < 768px | Single column | Hidden (hamburger) |
| Tablet | 768px - 1024px | Single column | Collapsible |
| Desktop | > 1024px | Content + sidebar | Fixed visible |

### Content Width Strategy

```css
--ifm-container-width: 1400px;        /* Maximum container width */
--doc-content-max-width: 800px;       /* Optimal reading width */
--doc-sidebar-width: 280px;           /* Sidebar width */
```

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 0.25rem (4px) | Tight padding |
| `--spacing-sm` | 0.5rem (8px) | Small gaps |
| `--spacing-md` | 1rem (16px) | Standard padding |
| `--spacing-lg` | 1.5rem (24px) | Section spacing |
| `--spacing-xl` | 2rem (32px) | Large section gaps |
| `--spacing-2xl` | 3rem (48px) | Page sections |

### Rationale
- 800px content width is optimal for reading technical documentation
- 280px sidebar provides room for nested navigation without cramping
- Consistent spacing tokens ensure visual harmony

### Alternatives Considered
1. **Full-width content** - Hurts readability
2. **Narrower sidebar (220px)** - Too cramped for nested items
3. **Four breakpoints** - Unnecessary complexity

---

## 5. Component Customization Plan

### Components to Customize

| Component | Priority | Customization |
|-----------|----------|---------------|
| Navbar | P1 | Brand colors, logo, hover effects |
| Hero Banner | P1 | Complete redesign for robotics theme |
| Sidebar | P1 | Active state styling, icons |
| Footer | P2 | Reorganized links, brand styling |
| Code Blocks | P2 | Enhanced syntax highlighting |
| Feature Cards | P1 | Robotics-themed icons and content |
| Buttons | P2 | Consistent styling with hover/focus |
| Admonitions | P3 | Custom icons and colors |
| TOC (Table of Contents) | P2 | Sticky positioning, active tracking |

### Homepage Feature Cards

Replace default Docusaurus features with robotics-relevant content:

1. **ROS 2 Foundations** - Icon: network/nodes
2. **Digital Twin Simulation** - Icon: 3D/simulation
3. **AI-Powered Robotics** - Icon: brain/neural
4. **Hands-On Learning** - Icon: code/practice

### Rationale
- Focus on high-impact visual changes first (Hero, Navbar, Features)
- Maintain Docusaurus patterns to ensure upgrade compatibility
- Use CSS overrides rather than component ejection where possible

---

## 6. Accessibility Implementation

### WCAG 2.1 AA Compliance Strategy

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | All text: minimum 4.5:1 ratio |
| Focus Indicators | 3px outline with offset for visibility |
| Skip Links | Hidden link to main content for keyboard users |
| Alt Text | All decorative images marked `role="presentation"` |
| Heading Hierarchy | Strict H1 > H2 > H3 nesting |
| Keyboard Navigation | All interactive elements focusable and operable |

### Focus State Design

```css
:focus-visible {
  outline: 3px solid var(--ifm-color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 7. Performance Considerations

### Optimization Strategy

| Technique | Implementation |
|-----------|----------------|
| Font Loading | System fonts (no external requests) |
| CSS Variables | Centralized theme values for caching |
| Image Optimization | SVG for icons, WebP for photos |
| Code Splitting | Docusaurus handles automatically |
| Lazy Loading | Native browser lazy loading for images |

### Target Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Performance Score | > 80 | Lighthouse |

---

## 8. Implementation Approach

### Decision: CSS Variable Override Strategy

Rather than ejecting Docusaurus components, use the layered override approach:

1. **Layer 1**: Infima CSS variable overrides in `custom.css`
2. **Layer 2**: Component-specific styles in dedicated CSS files
3. **Layer 3**: React component swizzling only when CSS is insufficient

### File Organization

```
website/src/
├── css/
│   ├── custom.css           # Main theme variables
│   ├── components/
│   │   ├── navbar.css       # Navbar overrides
│   │   ├── sidebar.css      # Sidebar overrides
│   │   ├── footer.css       # Footer overrides
│   │   └── code-block.css   # Code styling
│   └── pages/
│       └── homepage.css     # Homepage-specific styles
├── components/
│   └── HomepageFeatures/    # Updated feature cards
└── pages/
    └── index.tsx            # Updated homepage
```

### Rationale
- Preserves Docusaurus upgrade path
- Centralizes customization for maintainability
- CSS variables cascade naturally through dark/light modes

---

## Summary of Decisions

| Area | Decision |
|------|----------|
| Color Palette | Tech Blue (#1a365d) with Cyan accent (#00d4ff) |
| Typography | System font stack, JetBrains Mono for code |
| Layout | 800px content width, 280px sidebar, 3 breakpoints |
| Components | Hero, Navbar, Sidebar, Features (P1 priority) |
| Implementation | CSS variable overrides, minimal swizzling |
| Accessibility | WCAG 2.1 AA, visible focus states, semantic HTML |
| Performance | System fonts, SVG icons, Lighthouse 80+ target |
