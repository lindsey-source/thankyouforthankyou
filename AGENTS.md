# Project conventions

- Keep homepage editorial layout rules scoped to `.homepage` in the global stylesheet so spacing refinements do not alter the card wizard or other pages.
- Use shared Button variants and semantic shadow tokens for control and depth refinements so all consumers stay consistent without local glow overrides.
- Wedding grid and live previews share HeaderArt; design fontChoice must match its default title font so selecting a style preserves typography while explicit font overrides remain available.
- Preserve existing wedding design IDs and header-style keys when changing artwork so saved cards continue to resolve; wedding header surfaces remain design-led rather than accent-tinted.
- Normalize obsolete sample messages at wizard draft hydration and updates through the shared message sanitizer so legacy saved content cannot re-enter previews, while personal writing is preserved.
- Homepage wedding gallery headers reuse HeaderArt and the wedding design set so artwork and default typography stay aligned with the builder.
- Baby Style cards and all wizard previews resolve title lines and sign-offs through the shared baby details helper; examples remain display-only so empty drafts never store sample identities.
- Baby artwork resolves by stable design ID through the shared BabyHeaderArt renderer so legacy drafts receive current design-led surfaces without accent overrides altering the artwork; watercolor assets stay beneath crisp text.- Graduation, birthday, mitzvah, corporate, general, memorial and charity details resolve through the shared occasion details helper, and their artwork resolves by stable design ID through OccasionHeaderArt, so every preview shows the same caps line, sign-off and gift wording.
- Homepage and card-builder stationery surfaces (linen, postage stamp, pastel icon circles, gold hairlines) use shared classes in the global stylesheet and components in src/components/stationery so donation stamps and textures stay identical everywhere.
- Envelope liners resolve by stable design ID through src/lib/envelopeLiners and render via SuiteEnvelope/EnvelopeReveal, so every preview shows the same per-style liner; shared stationery finish (letterpress title, print grain, cotton deckle) lives in HeaderArt's wrapper and global CSS.
- Card colors resolve by stable design ID through src/lib/cardPalettes (default swatch first, chosen colorId falls back to default) and flow through HeaderArt and linerFor, so card, art accents and liner always recolor together.
- Occasion illustrations resolve through StationeryIllustration by stable style key and occupy a separate in-flow region above title/details, preventing artwork-text collisions across all preview sizes.
- Baby gift samples and title/name lines resolve through babyDetails; draft hydration and updates migrate only known obsolete announcement defaults to preserve personal writing.
