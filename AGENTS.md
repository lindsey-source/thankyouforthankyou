# Project conventions

- Keep homepage editorial layout rules scoped to `.homepage` in the global stylesheet so spacing refinements do not alter the card wizard or other pages.
- Use shared Button variants and semantic shadow tokens for control and depth refinements so all consumers stay consistent without local glow overrides.
- Wedding grid and live previews share HeaderArt; design fontChoice must match its default title font so selecting a style preserves typography while explicit font overrides remain available.
- Preserve existing wedding design IDs and header-style keys when changing artwork so saved cards continue to resolve; wedding header surfaces remain design-led rather than accent-tinted.