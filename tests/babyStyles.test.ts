import { test } from 'node:test';
import assert from 'node:assert/strict';
import { babyStyleFor, BABY_STYLES } from '../src/components/CardDesigner/babyStyles';

test('all four saved baby IDs retain distinct gender-neutral style identities', () => {
  assert.deepEqual(Object.values(BABY_STYLES).map(style => style.name), ['Little Star', 'Watercolor Wash', 'Modern Minimal', 'Over the Rainbow']);
  assert.equal(new Set(Object.values(BABY_STYLES).map(style => style.headerStyle)).size, 4);
});

test('no baby style uses dot or confetti artwork', () => {
  for (const style of Object.values(BABY_STYLES)) {
    assert.notEqual(style.headerStyle as string, 'dotsField');
    assert.notEqual(style.headerStyle as string, 'confetti');
  }
});

test('legacy saved baby IDs resolve to the redesigned artwork', () => {
  assert.equal(babyStyleFor('baby-sky-blue')?.headerStyle, 'babyMinimal');
  assert.equal(babyStyleFor('baby-soft-blush')?.headerStyle, 'babyWash');
  assert.equal(babyStyleFor('wedding-rose-garden'), undefined);
});