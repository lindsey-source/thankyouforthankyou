/**
 * Shared card typography.
 *
 * The selected face applies to both the headline and the card message.
 */
export const SCRIPT_FONT = "'Satisfy', cursive";
export const SERIF_FONT = "'Playfair Display', Georgia, serif";
export const SANS_FONT = "'Inter', system-ui, sans-serif";
export const BODY_FONT = "'Inter', sans-serif";

export interface CardFonts {
  heading: string;
  body: string;
}

/** Keep heading and message typography aligned across all previews. */
export const fontsFor = (choice?: string | null): CardFonts => {
  const face = choice === 'dancing' ? SCRIPT_FONT : choice === 'inter' ? SANS_FONT : SERIF_FONT;
  return { heading: face, body: face };
};

export default fontsFor;
