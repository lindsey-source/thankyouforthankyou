/**
 * Shared card typography.
 *
 * The script face is for headlines and the handwritten sign-off only — body copy
 * always stays on the readable body face, so a script choice never turns the
 * whole message into script.
 */
export const SCRIPT_FONT = "'Satisfy', cursive";
export const SERIF_FONT = "'Playfair Display', Georgia, serif";
export const SANS_FONT = "'Inter', system-ui, sans-serif";
export const BODY_FONT = "'Inter', sans-serif";

export interface CardFonts {
  heading: string;
  body: string;
}

/** Heading face follows the chosen style; body copy never does. */
export const fontsFor = (choice?: string | null): CardFonts => ({
  heading: choice === 'dancing' ? SCRIPT_FONT : choice === 'inter' ? SANS_FONT : SERIF_FONT,
  body: BODY_FONT,
});

export default fontsFor;
