# PARITY-DIFF — core routes

Re-fetched live HTML on 2026-08-19 and compared to localhost after Stef→Kate. Copy was not rewritten. Testimonial “Stef” → “Kate” stays (needs-review, already applied).

| route | live | local | missing sentences | missing images | missing CTAs | form / disclaimer |
|---|---|---|---|---|---|---|
| `/` | 200 | 200 | none | none | none | newsletter honeypot (“Leave this field empty if you're human”) not copied — spam trap, not public copy |
| `/about-us` | 200 | 200 | none | none | none | n/a |
| `/our-team` | 200 | 200 | none | none | none | n/a |
| `/testimonials` | 200 | 200 | none | none | none | n/a |
| `/clinic-forms` | 200 | 200 | none | none | none | n/a |
| `/contact` | 200 | 200 | none (fluentform dump is one mashed “sentence”; fields exist as our form) | none | none | First Name, Last Name, Email, Phone/Mobile, Subject, Your Message, Submit Form, HIPAA disclaimer present |
| `/contact/map-directions` | 200 | 200 | none | none | none | live map iframe kept; Ste #106 is in live meta, not body |
| `/what-is-acupuncture` | 200 | 200 | none | none | none | n/a |
| `/what-is-acupuncture/first-visit` | 200 | 200 | none | none | none | n/a |
| `/treatment-modalities` | 200 | 200 | none (false split on “Tuina…Click here…”; table + Tuina link are in content) | none | none | n/a |
| `/cancellations-late-arrivals` | 200 | 200 | none | none | none | n/a |
| `/does-acupuncture-hurt` | 200 | 200 | none | none | none | n/a |
| `/apw_wwt/pain` | 200 | 200 | none | none | none | n/a |
| `/apw_qa/does-it-hurt` | 200 | 200 | none | none | none | n/a |

## Fixes from this pass

- None required for copy/CTAs/images/forms on these 14 routes.
- Media on these pages now uses local `/media/wp-content/...` (see MEDIA-LOCAL.md).

## Notes

- Contact live body has Kate + Aaron booking (not Megan). Port matches live HTML.
- Contact live meta still mentions Becky; body wins. Stefanie in that meta string was already changed to Kate.
