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