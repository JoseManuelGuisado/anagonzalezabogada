---

description: "Task list for implementing and finishing the Law Firm Website feature"
---

# Tasks: Law Firm Website

**Input**: Design documents from `/specs/001-law-firm-website/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [contracts/analytics-events.md](./contracts/analytics-events.md)

**Tests**: Property-based and validation tasks are included because the design explicitly requires property tests and end-to-end validation.

**Organization**: Tasks are grouped by user story so each story can be validated independently. Checked tasks reflect work already present in the repository and verified against the current files.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Every task includes exact file paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the base project shape and add the remaining project-level scaffolding needed for completion.

- [x] T001 Create the static site structure in [index.html](../../index.html), [assets/css/styles.css](../../assets/css/styles.css), and [assets/js/main.js](../../assets/js/main.js)
- [x] T002 Create the shared asset directories under [assets/](../../assets/)
- [x] T003 Add project usage and implementation notes in [README.md](../../README.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared foundation and validation infrastructure used by all stories.

**⚠️ CRITICAL**: Remaining user-story tasks depend on this phase being complete.

- [x] T004 Define the design tokens, reset, responsive layout rules, and shared component styles in [assets/css/styles.css](../../assets/css/styles.css)
- [x] T005 Build the semantic single-page structure and core sections in [index.html](../../index.html)
- [x] T006 Implement shared interactive behaviors for navigation, form handling, analytics guard logic, and footer year in [assets/js/main.js](../../assets/js/main.js)
- [x] T007 Create the test harness and scripts in [package.json](../../package.json), [tests/properties/navigation.test.js](../../tests/properties/navigation.test.js), [tests/properties/form-validation.test.js](../../tests/properties/form-validation.test.js), and [tests/properties/analytics.test.js](../../tests/properties/analytics.test.js)

**Checkpoint**: Foundation is complete when the repository includes the missing project documentation and runnable test scaffolding.

---

## Phase 3: User Story 1 - Discover the firm and reach contact quickly (Priority: P1) 🎯 MVP

**Goal**: Ensure visitors can land on the site, understand the firm immediately, and reach key sections through responsive navigation.

**Independent Test**: Open the homepage on desktop and mobile widths, verify the hero CTAs, verify smooth navigation to each section, and confirm the mobile menu opens and closes correctly.

### Tests for User Story 1

- [x] T008 [P] [US1] Add property tests for hamburger toggle state and navbar scroll threshold in [tests/properties/navigation.test.js](../../tests/properties/navigation.test.js)
- [x] T009 [US1] Add a navigation acceptance checklist for desktop and mobile behavior in [tests/manual/navigation-checklist.md](../../tests/manual/navigation-checklist.md)

### Implementation for User Story 1

- [x] T010 [US1] Implement the hero CTAs, fixed navigation, responsive mobile toggle, and smooth section navigation in [index.html](../../index.html) and [assets/js/main.js](../../assets/js/main.js)
- [x] T011 [US1] Implement responsive navbar, hero, and section layout behavior in [assets/css/styles.css](../../assets/css/styles.css)

**Checkpoint**: User Story 1 is complete when the property tests pass and the manual navigation checklist is satisfied across desktop and mobile widths.

---

## Phase 4: User Story 2 - Evaluate expertise and trustworthiness (Priority: P2)

**Goal**: Ensure visitors can assess services, firm credibility, legal information, and search/social metadata.

**Independent Test**: Review the services, about, footer, legal links, and page metadata; verify the page exposes a coherent trust narrative and opens valid legal destinations.

### Tests for User Story 2

- [x] T012 [P] [US2] Add a metadata and legal-link validation checklist in [tests/manual/seo-legal-checklist.md](../../tests/manual/seo-legal-checklist.md)

### Implementation for User Story 2

- [x] T013 [US2] Implement the services grid, about content, lawyer profile, and footer trust elements in [index.html](../../index.html) and [assets/css/styles.css](../../assets/css/styles.css)
- [x] T014 [US2] Add meta description, Open Graph tags, and canonical metadata in [index.html](../../index.html)
- [x] T015 [US2] Add missing descriptive `title` coverage for navigational and CTA links in [index.html](../../index.html)
- [x] T016 [P] [US2] Create the privacy policy page in [privacidad.html](../../privacidad.html)
- [x] T017 [P] [US2] Create the legal notice page in [aviso-legal.html](../../aviso-legal.html)
- [x] T018 [P] [US2] Add the social preview image asset referenced by Open Graph metadata in [assets/images/og-image.svg](../../assets/images/og-image.svg)

**Checkpoint**: User Story 2 is complete when legal links resolve, metadata is present in the head, and the manual SEO/legal checklist passes.

---

## Phase 5: User Story 3 - Submit an enquiry successfully (Priority: P3)

**Goal**: Ensure visitors can complete the contact flow with validation, success feedback, and analytics tracking.

**Independent Test**: Submit the contact form with empty required fields, invalid email data, and a valid enquiry; confirm errors, success behavior, and analytics events behave as specified.

### Tests for User Story 3

- [x] T019 [P] [US3] Add property tests for required-field validation, invalid-email rejection, valid-form acceptance, form-data round trip, and footer-year formatting in [tests/properties/form-validation.test.js](../../tests/properties/form-validation.test.js)
- [x] T020 [P] [US3] Add property tests for CTA analytics dispatch in [tests/properties/analytics.test.js](../../tests/properties/analytics.test.js)

### Implementation for User Story 3

- [x] T021 [US3] Implement form field collection, validation, error rendering, focus management, success messaging, and footer-year rendering in [assets/js/main.js](../../assets/js/main.js)
- [x] T022 [US3] Implement form structure, validation message containers, and visible contact details in [index.html](../../index.html)
- [x] T023 [US3] Add the GTM container snippet `GTM-W8XKS29X` and configuration block in [index.html](../../index.html)
- [x] T024 [US3] Align analytics event coverage with the GTM contract and verify safe fallback behavior in [assets/js/main.js](../../assets/js/main.js) and [contracts/analytics-events.md](./contracts/analytics-events.md)

**Checkpoint**: User Story 3 is complete when the property tests pass, valid submissions show confirmation, and analytics events are emitted only for successful tracked actions.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish the feature with accessibility, browser validation, and end-to-end quality checks across all stories.

- [x] T025 [P] Audit keyboard navigation order, focus visibility, and ARIA state accuracy in [index.html](../../index.html), [assets/css/styles.css](../../assets/css/styles.css), and [assets/js/main.js](../../assets/js/main.js)
- [x] T026 [P] Validate responsive rendering and horizontal overflow at 360 px, 768 px, and 1024 px using [quickstart.md](./quickstart.md)
- [ ] T027 [P] Verify cross-browser behavior for the supported browsers and record results in [tests/manual/browser-compatibility-report.md](../../tests/manual/browser-compatibility-report.md)
- [ ] T028 Run the full feature validation workflow and record the final checklist outcomes in [tests/manual/final-validation-report.md](../../tests/manual/final-validation-report.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup and unlocks the remaining validation work.
- **User Story 1 (Phase 3)**: Depends on Phase 2 because it needs the test harness to close out the already-built navigation behavior.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and can proceed in parallel with User Story 1 once the test scaffolding exists.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and can proceed in parallel with User Story 2 after test scaffolding exists.
- **Polish (Phase 6)**: Depends on completion of the desired user stories.

### User Story Dependencies

- **US1**: No functional dependency on other stories; it is already implemented and only needs validation closure.
- **US2**: No strict dependency on US1, but it shares the same document shell and should be validated after foundational scaffolding is in place.
- **US3**: No strict dependency on US2, but it shares analytics and accessibility concerns resolved in the final polish phase.

### Parallel Opportunities

- T016, T017, and T018 can run in parallel because they touch different files.
- T019 and T020 can run in parallel because they touch different test files.
- T025, T026, and T027 can run in parallel after story work stabilizes.

---

## Parallel Example: User Story 2

```bash
Task: "Create the privacy policy page in privacidad.html"
Task: "Create the legal notice page in aviso-legal.html"
Task: "Add the social preview image asset in assets/images/og-image.jpg"
```

## Parallel Example: User Story 3

```bash
Task: "Add property tests for form validation in tests/properties/form-validation.test.js"
Task: "Add property tests for CTA analytics dispatch in tests/properties/analytics.test.js"
```

---

## Implementation Strategy

### MVP First

1. Finish T003 and T007 so the project has documentation and runnable validation scaffolding.
2. Finish T008 and T009 to close out User Story 1, which is already implemented in the UI.
3. Validate User Story 1 independently before expanding the release scope.

### Incremental Delivery

1. Close the foundational gaps.
2. Validate US1 as the MVP navigation and conversion shell.
3. Add SEO, legal pages, and social preview coverage for US2.
4. Add GA4 bootstrap and the property-based validation suite for US3.
5. Run the final cross-cutting accessibility and browser checks.

### Parallel Team Strategy

1. One developer closes T003 and T007.
2. A second developer handles US2 metadata and legal pages.
3. A third developer handles US3 analytics bootstrap and property tests.

---

## Notes

- The repository already contains substantial implementation in [index.html](../../index.html), [assets/css/styles.css](../../assets/css/styles.css), and [assets/js/main.js](../../assets/js/main.js); this task list now reflects the work completed in this session and leaves only browser-wide certification and final sign-off open.
- Property tests are included because the design document explicitly requires them.
- The legal footer links currently point to pages that do not yet exist in the repository.
- Cross-browser certification is still pending because this environment only validated the site in the integrated automated browser.