import { describe, expect, test } from 'bun:test';
import { BODY_FONT, SCRIPT_FONT, fontsFor } from '../src/lib/cardFonts';

describe('card fonts', () => {
  test('the script choice is the clearer script face', () => {
    expect(SCRIPT_FONT).toBe("'Satisfy', cursive");
    expect(fontsFor('dancing').heading).toBe(SCRIPT_FONT);
  });

  test('body copy never turns into script', () => {
    for (const choice of ['dancing', 'playfair', 'inter', null, undefined]) {
      expect(fontsFor(choice).body).toBe(BODY_FONT);
      expect(fontsFor(choice).body).not.toContain('Satisfy');
    }
  });

  test('modern choice keeps the sans heading', () => {
    expect(fontsFor('inter').heading).toContain('Inter');
    expect(fontsFor('inter').body).toBe(BODY_FONT);
  });
});
