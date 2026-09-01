# Implementation Plan: Law Firm Website

**Branch**: `[001-law-firm-website]` | **Date**: 2026-09-01 | **Spec**: [specs/001-law-firm-website/spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-law-firm-website/spec.md`

**Note**: This plan covers Phase 0 research and Phase 1 design artifacts for a static marketing site for a law firm.

## Summary

Build a single-page public website for a law firm that prioritizes enquiry conversion, trust, accessibility, and discoverability. The implementation will use a simple static structure with semantic HTML, one shared stylesheet, and one shared JavaScript file to deliver responsive navigation, sectioned content, validated contact capture, legal/SEO metadata, and analytics event tracking without adding operational complexity.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES6+

**Primary Dependencies**: Browser-native Web APIs, Google Fonts, Google Analytics 4

**Storage**: N/A for on-site persistence; enquiry delivery depends on an external contact destination supplied by the business

**Testing**: Manual browser validation, automated DOM/unit checks for JavaScript behavior, end-to-end viewport and accessibility checks, analytics smoke validation

**Target Platform**: Modern desktop and mobile browsers in current stable Chrome, Firefox, Safari, and Edge

**Project Type**: Static single-page marketing website

**Performance Goals**: First-view content should be immediately usable on standard mobile connections, non-critical imagery should load lazily, and interactions should remain visually responsive throughout navigation and form use

**Constraints**: Single HTML entry point, single external CSS file, single external JavaScript file, mobile-first responsive behavior, keyboard accessibility, WCAG 2.1 AA text contrast, no framework or build step required

**Scale/Scope**: One marketing site, four main sections, at least six service cards, at least one lawyer profile, one enquiry form, two legal links, and analytics coverage for page load, CTA clicks, and successful form submission

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- The current constitution file under `.specify/memory/constitution.md` is still a placeholder template and defines no enforceable project-specific gates.
- No constitutional violations are identified for this feature.
- Phase 0 and Phase 1 remain aligned with repository constraints: keep the solution simple, operate within the existing static-site structure, and avoid adding unnecessary tooling.
- Post-design re-check: still passes because the generated artifacts preserve the single-page static architecture and do not introduce governance conflicts.

## Project Structure

### Documentation (this feature)

```text
specs/001-law-firm-website/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── analytics-events.md
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
assets/
├── css/
│   └── styles.css
├── images/
└── js/
    └── main.js
```

**Structure Decision**: Use the existing root-level static website layout. All markup remains in `index.html`, all presentation remains in `assets/css/styles.css`, and all interactive behavior remains in `assets/js/main.js`. This matches the requirements and avoids introducing application layering that would add complexity without business value.

## Phase 0 Research Output

- Completed in [specs/001-law-firm-website/research.md](./research.md).
- Resolved delivery approach for static-site interaction handling, analytics instrumentation, accessibility behavior, and validation strategy without leaving open clarifications.

## Phase 1 Design Output

- Data model documented in [specs/001-law-firm-website/data-model.md](./data-model.md).
- Public-facing contracts documented in [specs/001-law-firm-website/contracts/ui-contract.md](./contracts/ui-contract.md) and [specs/001-law-firm-website/contracts/analytics-events.md](./contracts/analytics-events.md).
- End-to-end validation guide documented in [specs/001-law-firm-website/quickstart.md](./quickstart.md).

## Complexity Tracking

No constitution violations or exceptional complexity require justification.
*** Add File: /home/jmguisado/Projects/anagonzalezabogada/specs/001-law-firm-website/research.md
# Research: Law Firm Website

## Decision 1: Keep the site as a static single-page implementation

**Decision**: Deliver the feature as a single static HTML page supported by one shared stylesheet and one shared JavaScript file.

**Rationale**: The feature is content-driven, has simple interaction needs, and must remain easy to host and maintain. A static single-page structure satisfies the navigation, trust-building, contact, SEO, and analytics requirements while minimizing deployment and operational risk.

**Alternatives considered**:
- Multi-page site for each legal section: rejected because it adds routing and duplicated layout complexity without a stated business need.
- Framework-based frontend architecture: rejected because it conflicts with the repository constraints and offers little value for the requested scope.

## Decision 2: Use semantic HTML and CSS breakpoints as the main contract for responsive behavior

**Decision**: Express the core user experience through semantic sections, heading hierarchy, landmark roles, and a small set of mobile-first breakpoints.

**Rationale**: Most requirements are structural and presentational. Encoding them directly in the document structure produces a simpler, more accessible implementation than relying on script-generated layout changes.

**Alternatives considered**:
- JavaScript-driven layout changes: rejected because responsive behavior is more robust and maintainable in CSS.
- Component abstraction layers: rejected because the project structure does not justify extra indirection.

## Decision 3: Use client-side validation for the enquiry form and treat delivery as an external integration boundary

**Decision**: Validate the enquiry form in the browser, show field-level feedback, and model final delivery as a configurable outbound contact channel to be supplied by the business.

**Rationale**: The current repository has no backend service. Client-side validation is required for immediate user feedback, and the actual delivery path must remain configurable until the firm provides the final contact mechanism.

**Alternatives considered**:
- Implement a custom backend submission endpoint now: rejected because no backend exists in scope.
- Accept form input without validation: rejected because it fails explicit quality and usability requirements.

## Decision 4: Track analytics through GA4 events with safe guards around unavailable tracking globals

**Decision**: Use GA4 for page-load, CTA-click, and successful-form-submission events, while ensuring event dispatch fails safely if the analytics global is unavailable.

**Rationale**: The requirements explicitly call for Google Analytics and named CTA reporting. Safe guards prevent analytics configuration issues from breaking the visitor experience.

**Alternatives considered**:
- Track every interaction category: rejected for now because the requested scope is limited to key marketing and contact conversions.
- Omit analytics in local or unconfigured environments: partially accepted by making event dispatch conditional rather than mandatory for page operation.

## Decision 5: Validate quality with layered checks rather than a single test type

**Decision**: Use a mix of manual responsive review, DOM/unit-level JavaScript validation, accessibility auditing, and browser smoke tests.

**Rationale**: This feature spans content structure, styling, DOM behavior, accessibility, and analytics. No single validation method covers all of those risks. Layered checks keep the plan realistic while maintaining confidence.

**Alternatives considered**:
- Manual-only testing: rejected because form logic and analytics instrumentation benefit from repeatable checks.
- Heavy end-to-end coverage only: rejected because it is excessive for a static site and provides poor isolation for validation logic defects.
*** Add File: /home/jmguisado/Projects/anagonzalezabogada/specs/001-law-firm-website/data-model.md
# Data Model: Law Firm Website

## Site Section

**Purpose**: Represents a navigable content block on the page.

**Fields**:
- `id`: unique anchor identifier used by navigation and CTA links
- `label`: visible section name presented to users
- `heading`: primary displayed heading for the section
- `summary`: short content purpose or introduction
- `order`: display order on the page

**Validation Rules**:
- `id` must be unique across the page
- `label` must match the navigation target text for user-facing sections
- Every major section must expose a heading that preserves the document outline

## Practice Area

**Purpose**: Represents one legal service offering displayed in the services grid.

**Fields**:
- `name`: service name shown on the card
- `description`: concise explanation of the service
- `iconLabel`: decorative or supporting visual indicator
- `displayOrder`: ordering within the services grid

**Validation Rules**:
- At least six practice areas must be present
- `description` should remain brief enough to fit the card design without overflow
- `name` must be distinct enough for visitors to differentiate services

## Lawyer Profile

**Purpose**: Represents a trust-building professional profile in the about section.

**Fields**:
- `fullName`: lawyer name
- `specialty`: main area or areas of expertise
- `biography`: short professional summary
- `portraitAltText`: accessible description for the image
- `profileTitle`: optional professional label or role

**Validation Rules**:
- At least one lawyer profile must be present
- `portraitAltText` must describe the image meaningfully
- `biography` must support credibility without requiring long-form reading

## Contact Enquiry

**Purpose**: Represents visitor-submitted contact intent through the form.

**Fields**:
- `fullName`: required visitor name
- `email`: required visitor email
- `phone`: optional visitor phone number
- `subject`: required enquiry subject
- `message`: required enquiry body
- `validationErrors`: field-to-message map generated before acceptance
- `submissionStatus`: one of `idle`, `invalid`, `accepted`, or `delivery_failed`

**Validation Rules**:
- `fullName`, `email`, `subject`, and `message` are required
- `email` must match a valid email-address pattern acceptable for browser and business use
- Optional `phone` may be blank without blocking acceptance
- `validationErrors` must be empty before an enquiry can move to `accepted`

**State Transitions**:
- `idle` -> `invalid` when required inputs are missing or malformed
- `idle` -> `accepted` when all required inputs are valid and the site confirms submission
- `accepted` -> `idle` after the form has been reset for a new enquiry
- `idle` -> `delivery_failed` only if an external delivery path is added later and rejects a valid enquiry

## CTA Interaction

**Purpose**: Represents a tracked marketing interaction on a call to action.

**Fields**:
- `ctaName`: analytics-facing identifier for the CTA
- `location`: page region where the CTA appears
- `destination`: target section or action intent
- `interactionType`: current action type, such as click

**Validation Rules**:
- Every tracked CTA must expose a non-empty identifier
- CTA identifiers must remain stable enough for analytics interpretation
- Primary and secondary hero actions plus form submission must be represented

## SEO Metadata

**Purpose**: Represents the discoverability and sharing information embedded in the page head and markup structure.

**Fields**:
- `pageTitle`: unique search-facing page title
- `metaDescription`: concise search summary
- `canonicalUrl`: canonical page address
- `openGraphTitle`: social-preview title
- `openGraphDescription`: social-preview description
- `openGraphImage`: preview image reference
- `openGraphUrl`: shared page URL
- `primaryHeading`: single H1 content
- `sectionHeadings`: ordered H2 headings for main sections

**Validation Rules**:
- Only one primary heading may exist on the page
- `metaDescription` must remain descriptive and concise
- Open Graph fields must describe the same firm identity as the visible page
*** Add File: /home/jmguisado/Projects/anagonzalezabogada/specs/001-law-firm-website/contracts/ui-contract.md
# UI Contract: Law Firm Website

## Purpose

Define the visitor-facing structure and behavioral contract that implementation must preserve.

## Page Landmarks and Anchors

| Section | Required Anchor | Required Visible Purpose |
|---------|-----------------|--------------------------|
| Header navigation | `inicio` target available from logo/home link | Move visitors to the top of the page and expose all primary sections |
| Hero | `inicio` | Introduce the firm and expose primary CTAs |
| Services | `servicios` | Present at least six legal practice areas |
| About | `nosotros` | Present firm background and at least one lawyer profile |
| Contact | `contacto` | Present contact details and the enquiry form |
| Footer | none required | Present legal links, current year, and social link |

## Navigation Behavior Contract

- The primary navigation must expose links for Inicio, Servicios, Nosotros, and Contacto.
- On mobile-sized viewports, navigation links may collapse behind a toggle control, but all destinations must remain reachable.
- Selecting a navigation link must move the visitor to the corresponding section.
- The mobile menu must support explicit toggle open/close and close when the visitor interacts outside the active menu.

## Hero Contract

- The hero must contain exactly one page H1.
- The hero must expose a primary CTA that leads to the contact section.
- The hero must expose a secondary CTA that leads to the services section.

## Services Contract

- The services area must show at least six practice-area cards.
- Each card must expose a title and description.
- The grid must degrade from multi-column layouts on larger screens to a single-column layout on narrow screens.

## About Contract

- The about area must communicate history, mission, and firm values.
- At least one lawyer profile must include image, name, specialty, and biography.

## Contact Form Contract

### Required Fields

| Field Name | Required | Validation Expectation |
|------------|----------|------------------------|
| `name` | Yes | Must not be empty |
| `email` | Yes | Must not be empty and must be a valid email address |
| `phone` | No | May be empty |
| `subject` | Yes | Must not be empty |
| `message` | Yes | Must not be empty |

### Submission Outcomes

| Condition | Required Outcome |
|-----------|------------------|
| Missing required field | Show field-level error and do not accept submission |
| Invalid email | Show email-specific error and do not accept submission |
| Valid submission | Show confirmation, clear inputs, and emit analytics event |

## Accessibility Contract

- Interactive elements must be keyboard reachable.
- Interactive elements must show a visible focus state.
- Informative images must include descriptive alternative text.
- Text contrast must meet the project's accessibility target.

## SEO Contract

- The page must expose one H1 and section-level H2 headings.
- The page head must contain a descriptive title, meta description, and Open Graph metadata.
- Links and images should expose descriptive labeling where meaningful for users and discovery.
*** Add File: /home/jmguisado/Projects/anagonzalezabogada/specs/001-law-firm-website/contracts/analytics-events.md
# Analytics Contract: Law Firm Website

## Purpose

Define the minimum analytics events that the website must emit to support usage and conversion reporting.

## Event Catalog

| Event Name | Trigger | Required Parameters | Notes |
|------------|---------|---------------------|-------|
| `page_view` | Initial page load | page identity supplied by GA configuration | May be handled automatically by the analytics configuration |
| `cta_click` | Visitor activates any tracked CTA | `cta_name` | Must identify the CTA that was used |
| `form_submission` | Visitor successfully submits a valid contact enquiry | `form_id` or equivalent submission identifier | Must fire only after validation succeeds |

## CTA Coverage

The following visitor actions must be trackable at minimum:

| CTA Intent | Minimum Identifier Expectation |
|------------|-------------------------------|
| Hero primary contact action | stable identifier for contact CTA |
| Hero secondary services action | stable identifier for services CTA |
| Contact form submit action | stable identifier for successful enquiry submission |

## Reliability Rules

- Analytics dispatch must not block or break the visitor journey if the analytics library is unavailable.
- CTA event identifiers must remain stable across styling or wording changes whenever possible.
- Failed form validations must not emit `form_submission`.
*** Add File: /home/jmguisado/Projects/anagonzalezabogada/specs/001-law-firm-website/quickstart.md
# Quickstart: Law Firm Website

## Purpose

Provide the minimum validation flow needed to prove the feature works end-to-end after implementation.

## Prerequisites

- Repository checked out locally
- A modern browser available for manual validation
- Optional local static server if browser security settings make direct file opening inconvenient
- Optional analytics test property details if event verification is required beyond console-level smoke testing

## Run the Site Locally

Open `index.html` directly in a browser, or serve the repository root with a simple static server if needed by the implementation workflow.

## Validation Scenarios

### 1. Navigation and Hero

1. Load the homepage at desktop width.
2. Confirm the hero shows the firm name, value proposition, and two CTAs.
3. Use each navigation link and confirm the page moves to the matching section.
4. Scroll beyond the navbar threshold and confirm the navigation appearance changes for readability.

**Expected outcome**: All primary destinations are reachable and the hero communicates immediate contact and service paths.

### 2. Mobile Navigation

1. Resize the viewport to a mobile width below 768 pixels.
2. Confirm the navigation links collapse behind a menu toggle.
3. Open the menu, select a section link, and confirm the menu closes appropriately.
4. Reopen the menu and interact outside it.

**Expected outcome**: The mobile menu opens, closes, and never traps access to the page.

### 3. Services and About Content

1. Confirm at least six practice areas are present.
2. Check that the layout becomes one column on narrow screens, two columns on tablet widths, and three columns on desktop widths.
3. Confirm the about section shows firm background information and at least one lawyer profile.

**Expected outcome**: Visitors can evaluate expertise and trust signals across responsive breakpoints.

### 4. Contact Form Validation

1. Submit the form with all required fields empty.
2. Submit again with an invalid email address.
3. Submit with valid required fields and an empty optional phone field.

**Expected outcome**: Empty or invalid inputs show field-level errors; a valid submission shows confirmation and clears the form.

### 5. Accessibility and SEO Smoke Checks

1. Navigate all interactive controls using only the keyboard.
2. Confirm focus remains visible on links, buttons, and form fields.
3. Inspect the document outline and confirm there is a single H1 plus section H2 headings.
4. Inspect the page head and confirm title, meta description, and Open Graph tags are present.

**Expected outcome**: The site remains navigable without a pointer and exposes its required search/discovery metadata.

### 6. Analytics Verification

1. Load the page with analytics configured.
2. Activate each tracked CTA.
3. Submit a valid contact enquiry.

**Expected outcome**: A page-view event is registered by configuration, CTA interactions emit `cta_click` with a stable identifier, and successful form submission emits `form_submission`.

## Related Artifacts

- UI behavior expectations: [contracts/ui-contract.md](./contracts/ui-contract.md)
- Analytics expectations: [contracts/analytics-events.md](./contracts/analytics-events.md)
- Data definitions: [data-model.md](./data-model.md)
