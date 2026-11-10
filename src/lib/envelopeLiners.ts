/**
 * Envelope liners — one per card style, tinted from that style's palette.
 * Patterns stay fine and elegant: botanical sprigs, geometric lattice,
 * pinstripes or a soft watercolor wash. Never dot grids.
 */
export type LinerPattern = 'botanical' | 'geometric' | 'stripe' | 'watercolor';

export interface Liner {
  pattern: LinerPattern;
  /** Pattern ink (from the style palette). */
  tint: string;
  /** Liner paper ground. */
  ground: string;
}

export const LINERS: Record<string, Liner> = {
  'wedding-rose-garden': { pattern: 'botanical', tint: '#b9727f', ground: '#fbf1f0' },
  'wedding-ivory-elegance': { pattern: 'stripe', tint: '#c9a96e', ground: '#fffaf0' },
  'wedding-garden-party': { pattern: 'geometric', tint: '#b8975a', ground: '#f6f3ee' },
  'wedding-timeless': { pattern: 'geometric', tint: '#2d2420', ground: '#f4efe8' },
  'baby-wildflower-sage': { pattern: 'botanical', tint: '#7f9a7b', ground: '#f3f6ef' },
  'baby-soft-blush': { pattern: 'watercolor', tint: '#e2a9b3', ground: '#fdf3f2' },
  'baby-sky-blue': { pattern: 'watercolor', tint: '#9fbad3', ground: '#f2f6fa' },
  'baby-sunshine': { pattern: 'stripe', tint: '#d9b25f', ground: '#fdf8ec' },
  'grad-golden-cap': { pattern: 'geometric', tint: '#c9a24a', ground: '#1f2b4a' },
  'grad-classic-scholar': { pattern: 'watercolor', tint: '#8a9fb8', ground: '#faf6ee' },
  'grad-celebration': { pattern: 'stripe', tint: '#e07a5f', ground: '#fff7f0' },
  'grad-modern': { pattern: 'botanical', tint: '#b8975a', ground: '#faf6ee' },
  'bday-confetti-joy': { pattern: 'stripe', tint: '#c9a24a', ground: '#fbf6ea' },
  'bday-golden': { pattern: 'watercolor', tint: '#e5a3a8', ground: '#fdf6ef' },
  'bday-floral': { pattern: 'geometric', tint: '#d4b06a', ground: '#3d2340' },
  'bday-bold-fun': { pattern: 'geometric', tint: '#e8956b', ground: '#fdf4ec' },
  'mitzvah-midnight-gala': { pattern: 'geometric', tint: '#9fb3d9', ground: '#1d2a4d' },
  'mitzvah-star-of-david': { pattern: 'stripe', tint: '#4a6fa5', ground: '#ffffff' },
  'mitzvah-garden-blessing': { pattern: 'geometric', tint: '#c9a24a', ground: '#23314f' },
  'mitzvah-regal-gold': { pattern: 'botanical', tint: '#c48a96', ground: '#fcf5f2' },
  'corp-gilded-note': { pattern: 'stripe', tint: '#1f2f4f', ground: '#ffffff' },
  'corp-clean-modern': { pattern: 'geometric', tint: '#2a7f80', ground: '#f3f6f6' },
  'corp-forest-pro': { pattern: 'geometric', tint: '#c9a24a', ground: '#17213a' },
  'corp-navy-exec': { pattern: 'botanical', tint: '#6b5a45', ground: '#e8dcc6' },
  'gen-classic-rose': { pattern: 'stripe', tint: '#c17b8a', ground: '#fbf6ef' },
  'gen-elegant-cream': { pattern: 'stripe', tint: '#8fa9c7', ground: '#f6f9fc' },
  'gen-modern-minimal': { pattern: 'botanical', tint: '#7f9a7b', ground: '#f6f4ec' },
  'gen-nature-thanks': { pattern: 'watercolor', tint: '#e6b26b', ground: '#fffaf1' },
  'mem-peaceful-white': { pattern: 'stripe', tint: '#a89e92', ground: '#faf7f1' },
  'mem-soft-memorial': { pattern: 'watercolor', tint: '#6f7f99', ground: '#2f3a4d' },
  'mem-golden-memory': { pattern: 'botanical', tint: '#b8975a', ground: '#eeedeb' },
  'mem-natures-rest': { pattern: 'geometric', tint: '#a89e92', ground: '#f4f1ec' },
  'charity-hope-green': { pattern: 'stripe', tint: '#2f7d5b', ground: '#ffffff' },
  'charity-giving-heart': { pattern: 'botanical', tint: '#7f9a7b', ground: '#faf6ee' },
  'charity-community-blue': { pattern: 'geometric', tint: '#c9a24a', ground: '#1d4a4f' },
  'charity-grateful-gold': { pattern: 'watercolor', tint: '#eab07a', ground: '#fff8f0' },
};

const FALLBACK: Liner = { pattern: 'botanical', tint: '#c17b8a', ground: '#fbf3f1' };

export const linerFor = (designId?: string | null): Liner =>
  (designId && LINERS[designId]) || FALLBACK;

const enc = (c: string) => encodeURIComponent(c);

/** CSS `background` for a liner — fine lines only, never dots. */
export const linerBackground = (liner: Liner): string => {
  const { tint, ground } = liner;
  switch (liner.pattern) {
    case 'stripe':
      return `repeating-linear-gradient(90deg, ${tint}38 0 1px, transparent 1px 7px), repeating-linear-gradient(90deg, ${tint}1f 0 3px, transparent 3px 21px), ${ground}`;
    case 'geometric':
      return `repeating-linear-gradient(45deg, ${tint}40 0 0.75px, transparent 0.75px 12px), repeating-linear-gradient(-45deg, ${tint}40 0 0.75px, transparent 0.75px 12px), ${ground}`;
    case 'watercolor':
      return `radial-gradient(ellipse 60% 45% at 25% 30%, ${tint}55, transparent 70%), radial-gradient(ellipse 55% 50% at 78% 62%, ${tint}40, transparent 72%), radial-gradient(ellipse 40% 35% at 50% 90%, ${tint}30, transparent 70%), ${ground}`;
    case 'botanical':
    default: {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'><g fill='none' stroke='${tint}' stroke-opacity='0.55' stroke-width='0.7' stroke-linecap='round'><path d='M8 36 C14 26 18 18 26 8'/><path d='M13 27 C9 25 7 21 8 18 C11 20 13 23 13 27Z'/><path d='M17 20 C21 19 24 16 24 13 C20 14 18 16 17 20Z'/><path d='M21 14 C18 12 17 9 18 6 C20 8 21 11 21 14Z'/><path d='M30 40 C33 35 36 32 40 30'/><path d='M35 34 C35 31 37 29 39 28'/></g></svg>`;
      return `url("data:image/svg+xml,${enc(svg)}") 0 0 / 44px 44px, ${ground}`;
    }
  }
};
