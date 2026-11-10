import { describe, expect, test } from 'bun:test';
import { STYLE_DEFAULTS, swatchesFor, paletteFor } from '../src/lib/cardPalettes';

const ids = Object.keys(STYLE_DEFAULTS);
describe('card palettes', () => {
  test('no two styles in an occasion share a default color', () => {
    const byOcc: Record<string, string[]> = {};
    ids.forEach((id) => (byOcc[id.split('-')[0]] ||= []).push(STYLE_DEFAULTS[id]));
    for (const colors of Object.values(byOcc)) expect(new Set(colors).size).toBe(colors.length);
  });
  test('navy is the default for at most one style', () => {
    expect(ids.filter((id) => STYLE_DEFAULTS[id] === 'navy').length).toBeLessThanOrEqual(1);
  });
  test('every style offers 6-8 swatches, default first', () => {
    for (const id of ids) {
      const list = swatchesFor(id);
      expect(list.length).toBeGreaterThanOrEqual(6);
      expect(list.length).toBeLessThanOrEqual(8);
      expect(list[0].id).toBe(STYLE_DEFAULTS[id]);
    }
  });
  test('unknown chosen color falls back to the style default', () => {
    expect(paletteFor('bday-floral', 'nope')?.id).toBe('plum');
    expect(paletteFor('bday-floral', 'sage')?.id).toBe('sage');
  });
});
