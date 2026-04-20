/**
 * Shared design tokens for the Step 2 design system.
 * The full Design object is persisted into cardData.colorPalette so any later
 * step can faithfully render the same card.
 */

export type HeaderStyle =
  | 'botanical'
  | 'monogram'
  | 'starburst'
  | 'confetti'
  | 'starOfDavid'
  | 'ornamentFrame'
  | 'wave'
  | 'dotsField';

export type FontFamily = 'serifScript' | 'serifItalic' | 'sansCaps' | 'serifClassic';

export type OccasionId =
  | 'wedding'
  | 'baby'
  | 'graduation'
  | 'birthday'
  | 'mitzvah'
  | 'corporate'
  | 'general'
  | 'memorial'
  | 'charity';

export interface Design {
  id: string;
  occasion: OccasionId;
  name: string;
  tag: string;
  bg: string;
  headerBg: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accentSoft: string;
  tagBg: string;
  tagColor: string;
  donationBg: string;
  donationColor: string;
  headerStyle: HeaderStyle;
  headlineText: string;
  font: FontFamily;
  greeting: string;
  body: string;
  donation: string;
  fontChoice: 'inter' | 'playfair' | 'dancing';
}

/**
 * Reads a (possibly partial) Design out of cardData.colorPalette.
 * Returns null when the saved palette doesn't contain a Step 2 design
 * (e.g. legacy data or a fresh wizard).
 */
export function readDesignFromPalette(palette: any): Design | null {
  if (!palette || typeof palette !== 'object') return null;
  if (!palette.headerBg || !palette.headerStyle || !palette.ink || !palette.accent) {
    return null;
  }
  return palette as Design;
}
