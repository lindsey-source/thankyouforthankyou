import { describe, expect, it } from 'bun:test';
import { OCCASION_TILES } from '../src/lib/occasionTiles';

const toneById = Object.fromEntries(OCCASION_TILES.map((o) => [o.id, o.tone]));

describe('occasion tiles (builder step 1)', () => {
  it('lists all nine occasions in order', () => {
    expect(OCCASION_TILES.map((o) => o.id)).toEqual([
      'wedding',
      'baby',
      'graduation',
      'birthday',
      'mitzvah',
      'corporate',
      'general',
      'memorial',
      'charity',
    ]);
  });

  it('pairs each occasion with its pastel circle tone', () => {
    expect(toneById).toEqual({
      wedding: 'blush',
      baby: 'sky',
      graduation: 'sage',
      birthday: 'butter',
      mitzvah: 'lilac',
      corporate: 'stone',
      general: 'rose',
      memorial: 'sand',
      charity: 'mint',
    });
  });

  it('shows a serif title and exactly one short line per tile', () => {
    for (const occasion of OCCASION_TILES) {
      expect(occasion.name.length).toBeGreaterThan(0);
      expect(occasion.line.split('.').filter((s) => s.trim()).length).toBe(1);
      expect(occasion.line.length).toBeLessThanOrEqual(40);
      expect(occasion.line).not.toContain('\n');
    }
  });

  it('gives every tile its own fine outline icon', () => {
    const icons = new Set(OCCASION_TILES.map((o) => o.Icon));
    expect(icons.size).toBe(OCCASION_TILES.length);
    for (const occasion of OCCASION_TILES) {
      expect(occasion.Icon).toBeTruthy();
    }
  });
});
