# Quickstart: Docusaurus UI Enhancement

**Date**: 2025-12-23
**Feature**: 005-docusaurus-ui-enhancement
**Branch**: 005-docusaurus-ui-enhancement

## Overview

This quickstart guide covers how to implement and test the UI enhancements for the Physical AI & Humanoid Robotics documentation site.

---

## Prerequisites

- Node.js 18+ installed
- Git repository cloned
- Branch `005-docusaurus-ui-enhancement` checked out

---

## Quick Setup

```bash
# Navigate to website directory
cd website

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

The site will be available at `http://localhost:3000/REBOTIC-BOOK-HAKATHON/`

---

## Implementation Order

### Phase 1: Theme Variables (custom.css)

1. Open `website/src/css/custom.css`
2. Replace existing color variables with the new palette
3. Add typography and spacing variables
4. Test both light and dark modes

**Verification**: Toggle dark mode using the navbar switch, colors should update consistently.

### Phase 2: Homepage Updates

1. Update `website/src/pages/index.tsx`:
   - Change CTA button text from "Docusaurus Tutorial" to "Start Learning"
   - Update link to point to `/docs/intro`

2. Update `website/src/components/HomepageFeatures/index.tsx`:
   - Replace default features with robotics content
   - Update icons (create SVGs or use existing)

**Verification**: Homepage should display robotics-themed feature cards.

### Phase 3: Component Styling

1. Create component-specific CSS files in `website/src/css/components/`
2. Import them in `custom.css`
3. Style navbar, sidebar, footer, code blocks

**Verification**: Navigation and UI elements should have consistent styling.

### Phase 4: Responsive Testing

Test on multiple viewports:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px
- Wide: 1920px

**Verification**: All content readable without horizontal scroll on any viewport.

### Phase 5: Accessibility Audit

1. Run Lighthouse accessibility audit
2. Test keyboard navigation (Tab, Enter, Escape)
3. Check color contrast ratios
4. Verify screen reader compatibility

**Verification**: Lighthouse accessibility score 90+.

---

## File Structure After Implementation

```
website/src/
├── css/
│   ├── custom.css                 # Main theme variables (UPDATED)
│   ├── robotics-module.css        # Existing module styles
│   └── components/                # NEW
│       ├── navbar.css
│       ├── sidebar.css
│       ├── footer.css
│       ├── code-block.css
│       └── admonitions.css
├── components/
│   └── HomepageFeatures/
│       ├── index.tsx              # UPDATED
│       └── styles.module.css      # UPDATED
└── pages/
    ├── index.tsx                  # UPDATED
    └── index.module.css           # UPDATED
```

---

## Testing Scenarios

### Scenario 1: Theme Toggle

1. Load homepage
2. Click theme toggle in navbar
3. **Expected**: All colors switch between light/dark palettes
4. Refresh page
5. **Expected**: Theme preference persists

### Scenario 2: Mobile Navigation

1. Open site on mobile viewport (< 768px)
2. Click hamburger menu
3. **Expected**: Full navigation appears
4. Navigate to a doc page
5. **Expected**: Menu closes, content loads

### Scenario 3: Documentation Reading

1. Navigate to any documentation page
2. Scroll through content
3. **Expected**:
   - Sidebar tracks current section
   - Code blocks are syntax highlighted
   - Images are responsive
   - Text is comfortable to read (line height, width)

### Scenario 4: Keyboard Navigation

1. Press Tab from page load
2. **Expected**: Focus moves through all interactive elements
3. Press Enter on focused link
4. **Expected**: Navigation occurs
5. **Expected**: Focus indicators visible on all elements

### Scenario 5: Search Functionality

1. Click search icon or press Cmd/Ctrl + K
2. Type "ROS 2"
3. **Expected**: Relevant results appear
4. Click a result
5. **Expected**: Navigate to that page

---

## Verification Checklist

### Visual Design
- [ ] Custom color palette applied
- [ ] Dark mode works correctly
- [ ] Typography is consistent
- [ ] Code blocks have syntax highlighting
- [ ] Feature cards display correctly

### Responsive Design
- [ ] No horizontal scroll on mobile
- [ ] Navigation collapses on mobile
- [ ] Images scale appropriately
- [ ] Touch targets are adequate size

### Navigation
- [ ] Sidebar highlights current page
- [ ] Breadcrumbs show correct path
- [ ] Next/Previous links work
- [ ] Search returns relevant results

### Accessibility
- [ ] Lighthouse accessibility 90+
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA

### Performance
- [ ] Lighthouse performance 80+
- [ ] Page loads under 3 seconds
- [ ] No layout shift during load

---

## Common Issues and Solutions

### Issue: Colors don't update in dark mode

**Solution**: Ensure variables are defined in both `:root` and `[data-theme='dark']` selectors.

### Issue: Sidebar too narrow on tablet

**Solution**: Adjust `--doc-sidebar-width` breakpoint or use collapsible sidebar on tablet.

### Issue: Code blocks overflow on mobile

**Solution**: Add `overflow-x: auto` to code block container.

### Issue: Focus indicators not visible

**Solution**: Add explicit `:focus-visible` styles with high-contrast outline.

---

## Deployment

After all tests pass:

```bash
# Build production version
npm run build

# Test production build locally
npm run serve

# Deploy (if using GitHub Pages)
npm run deploy
```

---

## Resources

- [Docusaurus Styling Guide](https://docusaurus.io/docs/styling-layout)
- [Infima CSS Framework](https://infima.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
