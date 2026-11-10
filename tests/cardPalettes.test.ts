import { describe, expect, test } from 'bun:test';
import { STYLE_DEFAULTS, SWATCHES, swatchesFor, paletteFor } from '../src/lib/cardPalettes';

const ids = Object.keys(STYLE_DEFAULTS);
describe('card palettes', () => {
  test('orange card text has readable contrast', () => {
    const luminance = (hex: string) => {
      const channels = [1, 3, 5].map((start) => {
        const value = parseInt(hex.slice(start, start + 2), 16) / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const { bg, ink } = SWATCHES.terracotta;
    const light = Math.max(luminance(bg), luminance(ink));
    const dark = Math.min(luminance(bg), luminance(ink));
    expect((light + 0.05) / (dark + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
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
