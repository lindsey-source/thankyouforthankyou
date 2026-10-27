# Project conventions

- Keep homepage editorial layout rules scoped to `.homepage` in the global stylesheet so spacing refinements do not alter the card wizard or other pages.
- Use shared Button variants and semantic shadow tokens for control and depth refinements so all consumers stay consistent without local glow overrides.
- Wedding grid and live previews share HeaderArt; design fontChoice must match its default title font so selecting a style preserves typography while explicit font overrides remain available.
- Preserve existing wedding design IDs and header-style keys when changing artwork so saved cards continue to resolve; wedding header surfaces remain design-led rather than accent-tinted.
- Normalize obsolete sample messages at wizard draft hydration and updates through the shared message sanitizer so legacy saved content cannot re-enter previews, while personal writing is preserved.
- Homepage wedding gallery headers reuse HeaderArt and the wedding design set so artwork and default typography stay aligned with the builder.
- Baby Style cards and all wizard previews resolve title lines and sign-offs through the shared baby details helper; examples remain display-only so empty drafts never store sample identities.