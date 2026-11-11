import { describe, expect, test } from 'bun:test';
import { SANS_FONT, SERIF_FONT, SCRIPT_FONT, fontsFor } from '../src/lib/cardFonts';

describe('card fonts', () => {
  test('the script choice is the clearer script face', () => {
    expect(SCRIPT_FONT).toBe("'Satisfy', cursive");
    expect(fontsFor('dancing').heading).toBe(SCRIPT_FONT);
  });

  test('script choice changes both heading and card text', () => {
    expect(fontsFor('dancing')).toEqual({ heading: SCRIPT_FONT, body: SCRIPT_FONT });
  });

  test('serif choice changes both heading and card text', () => {
    expect(fontsFor('playfair')).toEqual({ heading: SERIF_FONT, body: SERIF_FONT });
  });

  test('modern choice keeps the sans heading', () => {
    expect(fontsFor('inter').heading).toContain('Inter');
    expect(fontsFor('inter').body).toBe(SANS_FONT);
  });
});
