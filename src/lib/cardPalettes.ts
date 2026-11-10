/**
 * Curated card colors. Each style has 6–8 swatches; the first is its default.
 * Within an occasion no two styles share a default color, and navy is the
 * default for one style only (Gold Class).
 */
export interface Swatch { id: string; name: string; bg: string; ink: string; accent: string; dark: boolean }

const S = (id: string, name: string, bg: string, ink: string, accent: string, dark = false): Swatch => ({ id, name, bg, ink, accent, dark });

export const SWATCHES: Record<string, Swatch> = {
  ivory: S('ivory', 'Ivory', '#faf6ee', '#2d2420', '#b8975a'),
  blush: S('blush', 'Blush', '#f5dcd8', '#4a2c2e', '#b9727f'),
  dustyRose: S('dustyRose', 'Dusty Rose', '#d8a7a7', '#3a2023', '#7f3f4a'),
  sage: S('sage', 'Sage', '#cdd9c5', '#2c3829', '#6c8a64'),
  eucalyptus: S('eucalyptus', 'Eucalyptus', '#a7beb3', '#1d2d27', '#47685b'),
  terracotta: S('terracotta', 'Terracotta', '#c4704f', '#201815', '#f3d3a2'),
  marigold: S('marigold', 'Marigold', '#ebbd52', '#3a2a10', '#8a5612'),
  lavender: S('lavender', 'Lavender', '#dbd2ec', '#2f2a45', '#7a6ba6'),
  powderBlue: S('powderBlue', 'Powder Blue', '#cfe0ee', '#1f3248', '#5a7ea6'),
  plum: S('plum', 'Plum', '#4b2442', '#f6e9df', '#d6b26c', true),
  forest: S('forest', 'Forest', '#2e4a3a', '#f3ecdc', '#cdae72', true),
  charcoal: S('charcoal', 'Charcoal', '#35373b', '#f1ece3', '#c8a464', true),
  navy: S('navy', 'Navy', '#1d2a44', '#f6efe3', '#c8a464', true),
};

/** Default color for each style (stable design IDs). */
export const STYLE_DEFAULTS: Record<string, string> = {
  'wedding-rose-garden': 'blush', 'wedding-ivory-elegance': 'ivory', 'wedding-garden-party': 'sage', 'wedding-timeless': 'charcoal',
  'baby-wildflower-sage': 'eucalyptus', 'baby-soft-blush': 'blush', 'baby-sky-blue': 'powderBlue', 'baby-sunshine': 'marigold',
  'grad-golden-cap': 'navy', 'grad-classic-scholar': 'lavender', 'grad-celebration': 'terracotta', 'grad-modern': 'forest',
  'bday-confetti-joy': 'marigold', 'bday-golden': 'blush', 'bday-floral': 'plum', 'bday-bold-fun': 'powderBlue',
  'mitzvah-midnight-gala': 'charcoal', 'mitzvah-star-of-david': 'powderBlue', 'mitzvah-garden-blessing': 'plum', 'mitzvah-regal-gold': 'blush',
  'corp-gilded-note': 'ivory', 'corp-clean-modern': 'eucalyptus', 'corp-forest-pro': 'charcoal', 'corp-navy-exec': 'terracotta',
  'gen-classic-rose': 'dustyRose', 'gen-elegant-cream': 'powderBlue', 'gen-modern-minimal': 'sage', 'gen-nature-thanks': 'marigold',
  'mem-peaceful-white': 'ivory', 'mem-soft-memorial': 'charcoal', 'mem-golden-memory': 'sage', 'mem-natures-rest': 'lavender',
  'charity-hope-green': 'ivory', 'charity-giving-heart': 'sage', 'charity-community-blue': 'forest', 'charity-grateful-gold': 'blush',
};

// Memorial stays quiet: no bright options.
const QUIET = ['ivory', 'sage', 'lavender', 'powderBlue', 'charcoal', 'eucalyptus', 'blush'];
const CORE = ['ivory', 'blush', 'sage', 'terracotta', 'lavender', 'powderBlue', 'plum'];

/** 7 swatches per style, default first. */
export const swatchesFor = (designId?: string | null): Swatch[] => {
  const def = designId ? STYLE_DEFAULTS[designId] : undefined;
  if (!def) return [];
  const pool = designId!.startsWith('mem-') ? QUIET : CORE;
  return [def, ...pool.filter((c) => c !== def)].slice(0, 7).map((c) => SWATCHES[c]);
};

/** The swatch to render: the chosen one if it belongs to this style, else the style default. */
export const paletteFor = (designId?: string | null, colorId?: string | null): Swatch | undefined => {
  const list = swatchesFor(designId);
  return list.find((s) => s.id === colorId) || list[0];
};
