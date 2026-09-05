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