# Tasks: Docusaurus UI Enhancement

**Input**: Design documents from `/specs/005-docusaurus-ui-enhancement/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Manual testing and Lighthouse audits - no automated test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

All paths are relative to `website/` directory:
- `src/css/` - Stylesheets
- `src/components/` - React components
- `src/pages/` - Page components
- `static/img/` - Static images
- `docusaurus.config.ts` - Site configuration

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and base files for UI enhancement

- [X] T001 Create components CSS directory at website/src/css/components/
- [X] T002 Create icons directory at website/static/img/icons/
- [X] T003 [P] Backup existing custom.css to website/src/css/custom.css.backup

---

## Phase 2: Foundational (Theme Variables)

**Purpose**: Core CSS variables that ALL user stories depend on - MUST complete before any UI work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Update light mode color palette in website/src/css/custom.css with tech blue theme (#1a365d primary)
- [X] T005 Update dark mode color palette in website/src/css/custom.css with cyan theme (#22d3ee primary)
- [X] T006 [P] Add typography variables (font families, sizes, weights) to website/src/css/custom.css
- [X] T007 [P] Add spacing and layout variables to website/src/css/custom.css
- [X] T008 Add CSS imports for component stylesheets at end of website/src/css/custom.css
- [X] T009 Verify theme toggle works with new color variables (manual test)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Enhanced Visual Design (Priority: P1) 🎯 MVP

**Goal**: Deliver modern, visually appealing interface with professional typography and branding

**Independent Test**: Load site on desktop, verify cohesive color scheme, professional typography, and custom branding

### Implementation for User Story 1

- [X] T010 [P] [US1] Create hero section styles in website/src/css/components/hero.css with gradient background
- [X] T011 [P] [US1] Update hero text content in website/src/pages/index.tsx - change CTA to "Start Learning" linking to /docs/intro
- [X] T012 [US1] Update hero styling in website/src/pages/index.module.css with brand colors and improved padding
- [X] T013 [P] [US1] Create network-nodes.svg icon for ROS 2 in website/static/img/icons/network-nodes.svg
- [X] T014 [P] [US1] Create simulation-3d.svg icon for Digital Twin in website/static/img/icons/simulation-3d.svg
- [X] T015 [P] [US1] Create neural-brain.svg icon for Isaac Brain in website/static/img/icons/neural-brain.svg
- [X] T016 [P] [US1] Create voice-action.svg icon for VLA in website/static/img/icons/voice-action.svg
- [X] T017 [US1] Update HomepageFeatures content in website/src/components/HomepageFeatures/index.tsx with 4 robotics modules
- [X] T018 [US1] Update feature card styling in website/src/components/HomepageFeatures/styles.module.css with hover effects
- [X] T019 [P] [US1] Create code-block.css in website/src/css/components/code-block.css with rounded corners and brand colors
- [X] T020 [P] [US1] Create admonitions.css in website/src/css/components/admonitions.css with brand-colored callouts

**Checkpoint**: User Story 1 complete - Homepage has modern visual design with robotics branding

---

## Phase 4: User Story 2 - Responsive Mobile Experience (Priority: P1)

**Goal**: Ensure full functionality and readability on mobile devices and tablets

**Independent Test**: Access site on 320px, 768px, and 1280px viewports - verify no horizontal scroll, readable text, accessible navigation

### Implementation for User Story 2

- [X] T021 [P] [US2] Add mobile breakpoint styles to website/src/css/components/hero.css for screens < 768px
- [X] T022 [P] [US2] Add tablet breakpoint styles to website/src/css/components/hero.css for screens 768px-1024px
- [X] T023 [US2] Add responsive grid to feature cards in website/src/components/HomepageFeatures/styles.module.css
- [X] T024 [US2] Add touch-friendly tap targets (min 44px) to website/src/css/custom.css
- [X] T025 [US2] Ensure code blocks have horizontal scroll contained in website/src/css/components/code-block.css
- [ ] T026 [US2] Test responsive behavior on Chrome DevTools at 320px, 768px, 1024px viewports (manual test)

**Checkpoint**: User Story 2 complete - Site is fully responsive across all device sizes

---

## Phase 5: User Story 3 - Improved Navigation Experience (Priority: P2)

**Goal**: Intuitive navigation with clear current page indication, breadcrumbs, and smooth sidebar

**Independent Test**: Navigate through modules, verify sidebar highlights current page, breadcrumbs show path, collapsible sections work

### Implementation for User Story 3

- [X] T027 [P] [US3] Create navbar.css in website/src/css/components/navbar.css with logo placement, menu spacing, hover effects
- [X] T028 [P] [US3] Create sidebar.css in website/src/css/components/sidebar.css with active state highlighting and better spacing
- [X] T029 [US3] Add collapsible section styling with icons in website/src/css/components/sidebar.css
- [X] T030 [US3] Style breadcrumb navigation for clear path display in website/src/css/custom.css
- [X] T031 [US3] Add smooth transitions for sidebar expand/collapse in website/src/css/components/sidebar.css
- [X] T032 [US3] Style mobile hamburger menu in website/src/css/components/navbar.css for touch-friendly navigation

**Checkpoint**: User Story 3 complete - Navigation is intuitive with clear location indicators

---

## Phase 6: User Story 4 - Accessibility Compliance (Priority: P2)

**Goal**: Meet WCAG 2.1 AA standards with keyboard navigation, screen reader support, and proper contrast

**Independent Test**: Run Lighthouse accessibility audit, test keyboard navigation, verify contrast ratios

### Implementation for User Story 4

- [X] T033 [P] [US4] Add visible focus indicators for all interactive elements in website/src/css/custom.css
- [X] T034 [P] [US4] Verify color contrast meets 4.5:1 ratio in all color variable definitions
- [X] T035 [US4] Add skip-to-content link at top of page layout (may require swizzling Layout component)
- [X] T036 [US4] Ensure heading hierarchy is correct (h1 > h2 > h3) in all documentation pages
- [X] T037 [US4] Add alt text to all SVG icons in website/static/img/icons/ (role="img" aria-label)
- [ ] T038 [US4] Test keyboard navigation through navbar, sidebar, and content (Tab, Enter, Escape) - manual test
- [ ] T039 [US4] Run Lighthouse accessibility audit and document score (target: 90+)

**Checkpoint**: User Story 4 complete - Site meets WCAG 2.1 AA accessibility standards

---

## Phase 7: User Story 5 - Performance Optimization (Priority: P3)

**Goal**: Fast page loads under 3 seconds with Lighthouse performance score 80+

**Independent Test**: Run Lighthouse performance audit, measure page load times

### Implementation for User Story 5

- [X] T040 [P] [US5] Ensure all icons use optimized SVG format in website/static/img/icons/
- [X] T041 [P] [US5] Remove any unused CSS from website/src/css/custom.css
- [X] T042 [US5] Verify system fonts are used (no external font loading) in typography variables
- [X] T043 [US5] Optimize image loading with lazy loading attributes where applicable
- [X] T044 [US5] Run production build and verify no console errors: npm run build
- [ ] T045 [US5] Run Lighthouse performance audit and document score (target: 80+)

**Checkpoint**: User Story 5 complete - Site loads quickly with good performance scores

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Footer updates, final integration, and cross-browser testing

- [X] T046 [P] Create footer.css in website/src/css/components/footer.css with dark background and link styling
- [X] T047 Update footer links in website/docusaurus.config.ts to include all 4 modules and community resources
- [X] T048 [P] Add hover effects to footer links in website/src/css/components/footer.css
- [ ] T049 Test dark mode toggle - verify all components render correctly in both modes
- [ ] T050 Test site in Chrome, Firefox, Safari, and Edge browsers (manual cross-browser test)
- [X] T051 Run final npm run build and npm run serve to verify production build
- [ ] T052 Document any remaining issues or improvements for future iterations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 and US2 are both P1 priority and can run in parallel
  - US3 and US4 are both P2 priority and can run in parallel after P1
  - US5 is P3 and should run last
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - Independent of US1
- **User Story 3 (P2)**: Can start after Foundational - Independent but benefits from US1 styling
- **User Story 4 (P2)**: Can start after Foundational - Should verify against US1-3 implementations
- **User Story 5 (P3)**: Should run after all visual changes are complete (US1-4)

### Within Each User Story

- Tasks marked [P] within a story can run in parallel
- Non-parallel tasks must complete sequentially
- Manual test tasks should run after implementation tasks

### Parallel Opportunities

**Phase 2 (Foundational)**: T006 and T007 can run in parallel
**Phase 3 (US1)**: T010-T016, T019-T020 can all run in parallel
**Phase 4 (US2)**: T021-T022 can run in parallel
**Phase 5 (US3)**: T027-T028 can run in parallel
**Phase 6 (US4)**: T033-T034 can run in parallel
**Phase 7 (US5)**: T040-T041 can run in parallel
**Phase 8 (Polish)**: T046 and T048 can run in parallel

---

## Parallel Example: User Story 1 (Visual Design)

```bash
# Launch all icons creation in parallel:
Task: "Create network-nodes.svg icon in website/static/img/icons/"
Task: "Create simulation-3d.svg icon in website/static/img/icons/"
Task: "Create neural-brain.svg icon in website/static/img/icons/"
Task: "Create voice-action.svg icon in website/static/img/icons/"

# Launch component CSS files in parallel:
Task: "Create hero.css in website/src/css/components/"
Task: "Create code-block.css in website/src/css/components/"
Task: "Create admonitions.css in website/src/css/components/"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Visual Design)
4. Complete Phase 4: User Story 2 (Responsive)
5. **STOP and VALIDATE**: Test on desktop and mobile
6. Deploy/demo if ready - this is a functional MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test visual design → Deploy (Basic branding)
3. Add User Story 2 → Test responsive → Deploy (Mobile-ready)
4. Add User Story 3 → Test navigation → Deploy (Better UX)
5. Add User Story 4 → Test accessibility → Deploy (WCAG compliant)
6. Add User Story 5 → Test performance → Deploy (Optimized)

### Priority Summary

| User Story | Priority | Tasks | Parallel Tasks |
|------------|----------|-------|----------------|
| US1 - Visual Design | P1 | 11 | 8 |
| US2 - Responsive | P1 | 6 | 2 |
| US3 - Navigation | P2 | 6 | 2 |
| US4 - Accessibility | P2 | 7 | 2 |
| US5 - Performance | P3 | 6 | 2 |

---

## Notes

- [P] tasks = different files, no dependencies - can run simultaneously
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual test tasks verify acceptance criteria are met
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All CSS changes should work in both light and dark modes

---

## Implementation Status

**Completed**: 2025-12-23
**Tasks Completed**: 45 / 52 (86%)
**Manual Tests Remaining**: 7 (T026, T038, T039, T045, T049, T050, T052)

All implementation tasks are complete. Remaining tasks are manual testing activities.
