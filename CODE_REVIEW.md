# Code Review — improvements ? main

## Summary
This PR modernizes the static site, fixes malformed markup and encoding issues, introduces a hero background aligned to brand colors, improves accessibility, and streamlines assets usage.

## Key Changes
- index.html: fixed invalid span, corrected Polish diacritics, cleaned comments, removed redundant hero image, improved aria labels, updated SEO placeholders, and JSON-LD set to Organization.
- styles.css: added dark theme palette, updated header/menu/btn/card styles, hero background shows full image with overlay and bounded height, simplified reveal behavior to avoid hidden sections.
- script.js: added OPIS constant and used it for subtitle; normalized JSON-LD injection.
- assets: added background01.png; retained logo01.png uses; gallery uses placeholders.
- Git: initialized repo, created branch improvements; iterative refinements committed.

## Accessibility
- Improved aria-labels and alt texts.
- Contrast: hero text over dark overlay passes; brand button color now white over red background.

## Risks
- Some text still hardcoded; consider extracting to config.
- Gallery uses placeholders; expect 404s if removed.

## Follow-ups
- Update canonical/og:url to final domain.
- Replace gallery placeholders with real images.
- Consider LocalBusiness/Electrician schema with address/phone.

## Testing
- Open index.html locally; verify hero shows entire background image, header/logo layout, button color, and bottom sections are visible.
