/**
 * Stable design ID → style identity for graduation, birthday, mitzvah,
 * corporate, general, memorial and charity cards. IDs never change so saved
 * drafts resolve to current artwork.
 */
export const OCCASION_STYLES = {
  'grad-golden-cap': { name: 'Gold Class', key: 'goldClass' },
  'grad-classic-scholar': { name: 'Cap & Tassel', key: 'capTassel' },
  'grad-celebration': { name: 'Bold Type', key: 'boldType' },
  'grad-modern': { name: 'Laurel Crest', key: 'laurelCrest' },
  'bday-confetti-joy': { name: 'Golden Number', key: 'goldenNumber' },
  'bday-golden': { name: 'Watercolor Balloons', key: 'balloons' },
  'bday-floral': { name: 'Champagne Toast', key: 'champagne' },
  'bday-bold-fun': { name: 'Color Block Pop', key: 'colorBlock' },
  'mitzvah-midnight-gala': { name: 'Bold Star', key: 'boldStar' },
  'mitzvah-star-of-david': { name: 'Tallit Stripes', key: 'tallit' },
  'mitzvah-garden-blessing': { name: 'Mosaic Torah', key: 'mosaicTorah' },
  'mitzvah-regal-gold': { name: 'Watercolor Bloom', key: 'bloom' },
  'corp-gilded-note': { name: 'Clean Executive', key: 'cleanExec' },
  'corp-clean-modern': { name: 'Bold Geometric', key: 'geometric' },
  'corp-forest-pro': { name: 'Night Sky', key: 'nightSky' },
  'corp-navy-exec': { name: 'Sketchbook', key: 'sketchbook' },
  'gen-classic-rose': { name: 'Big Type', key: 'bigType' },
  'gen-elegant-cream': { name: 'Gilded Stripes', key: 'gildedStripes' },
  'gen-modern-minimal': { name: 'Pressed Botanicals', key: 'pressed' },
  'gen-nature-thanks': { name: 'Doodle Thanks', key: 'doodle' },
  'mem-peaceful-white': { name: 'Quiet Cream', key: 'quietCream' },
  'mem-soft-memorial': { name: 'Evening Candle', key: 'candle' },
  'mem-golden-memory': { name: 'Olive Branch', key: 'olive' },
  'mem-natures-rest': { name: 'Portrait Arch', key: 'portraitArch' },
  'charity-hope-green': { name: 'Mission Minimal', key: 'mission' },
  'charity-giving-heart': { name: 'Seedling Watercolor', key: 'seedling' },
  'charity-community-blue': { name: 'Circle of Hands', key: 'hands' },
  'charity-grateful-gold': { name: 'New Day', key: 'newDay' },
} as const;

export type OccasionStyleKey = (typeof OCCASION_STYLES)[keyof typeof OCCASION_STYLES]['key'];

export function occasionStyleFor(id?: string) {
  return id && Object.prototype.hasOwnProperty.call(OCCASION_STYLES, id)
    ? OCCASION_STYLES[id as keyof typeof OCCASION_STYLES]
    : undefined;
}
