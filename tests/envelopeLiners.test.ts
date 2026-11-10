import { describe, expect, test } from 'bun:test';
import { LINERS, linerBackground, linerFor } from '../src/lib/envelopeLiners';
import { OCCASION_STYLES } from '../src/components/CardDesigner/occasionStyles';

describe('envelope liners', () => {
  test('every occasion style has its own liner', () => {
    for (const id of Object.keys(OCCASION_STYLES)) expect(LINERS[id]).toBeDefined();
  });
  test('liners use only the four elegant patterns, never dots', () => {
    for (const l of Object.values(LINERS)) {
      expect(['botanical', 'geometric', 'stripe', 'watercolor']).toContain(l.pattern);
      expect(linerBackground(l)).not.toMatch(/circle|dots/i);
    }
  });
  test('unknown style falls back to a liner', () => {
    expect(linerFor('nope').pattern).toBe('botanical');
  });
});
