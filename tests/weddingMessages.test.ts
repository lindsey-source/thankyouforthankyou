import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanWeddingDraft } from '../src/lib/weddingMessages';

test('restoring a wedding draft clears obsolete auto-filled messages and legacy fields', () => {
  const result = cleanWeddingDraft({
    occasion: 'wedding',
    messageBody: 'Your wedding was the most beautiful day…',
    message: 'Your wedding was the most beautiful day...',
  });
  assert.equal(result.messageBody, '');
  assert.equal(result.message, '');
});

test('restoring a wedding draft clears old gallery teaser autofill', () => {
  const result = cleanWeddingDraft({ occasion: 'wedding', messageBody: 'Thank you for celebrating with us…' });
  assert.equal(result.messageBody, '');
});

test('draft cleanup preserves personal writing and other saved choices', () => {
  const draft = { occasion: 'wedding', messageBody: 'Aunt Rachel, we loved dancing with you. Thank you for the lovely vase!', coupleNames: 'Lindsey & Josh', weddingDate: 'October 3, 2027' };
  assert.deepEqual(cleanWeddingDraft(draft), draft);
});

test('non-wedding personal drafts are preserved', () => {
  const draft = { occasion: 'general', messageBody: 'Sharing our day with you was a joy…' };
  assert.deepEqual(cleanWeddingDraft(draft), draft);
});