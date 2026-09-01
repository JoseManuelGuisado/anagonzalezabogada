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