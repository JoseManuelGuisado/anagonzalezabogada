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