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