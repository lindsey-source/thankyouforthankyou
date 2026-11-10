import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveBabyDetails, cleanBabyDraft } from '../src/lib/babyDetails';

test('empty baby details use display-only examples without filling the draft', () => {
  const draft = { babyName: '', babyDate: '', parentsNames: '' };
  assert.deepEqual(resolveBabyDetails(draft), { headline: 'Thank You', fromLine: 'from Baby Lily', titleLine: 'Baby Lily · March 3, 2027', signOff: 'Emma & James' });
  assert.deepEqual(draft, { babyName: '', babyDate: '', parentsNames: '' });
});

test('baby name and birth or shower date form the title line', () => {
  assert.equal(resolveBabyDetails({ babyName: ' Nora ', babyDate: ' April 12, 2027 ' }).titleLine, 'Baby Nora · April 12, 2027');
});

test('parents names are the card sign-off', () => {
  assert.equal(resolveBabyDetails({ parentsNames: ' Lindsey & Josh ' }).signOff, 'Lindsey & Josh');
});

test('a name already prefixed with Baby is not duplicated', () => {
  assert.equal(resolveBabyDetails({ babyName: 'Baby Lily' }).titleLine, 'Baby Lily · March 3, 2027');
});

test('obsolete baby announcement defaults are replaced on draft hydration', () => {
  const draft = cleanBabyDraft({ occasion: 'baby', messageHeadline: 'Welcome, Little One', colorPalette: { headlineText: 'Welcome, Little Star' } });
  assert.equal(draft.messageHeadline, 'Thank You');
  assert.equal(draft.colorPalette.headlineText, 'Thank You');
});

test('baby draft cleanup preserves a personal parent-written gift message', () => {
  const draft = { occasion: 'baby', messageBody: 'Thank you for the quilt you made for Lily. We love it!', babyName: 'Lily' };
  assert.deepEqual(cleanBabyDraft(draft), draft);
});