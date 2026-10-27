export const WEDDING_MESSAGE_EXAMPLE = 'Thank you for celebrating with us. Having you there meant the world to us.';

const normalize = (text: string) => text.trim().replace(/…/g, '...').replace(/\s+/g, ' ').toLowerCase();
const oldTeasers = new Set([
  'thank you for celebrating with us...',
  'sharing our day with you was a joy...',
  'your presence made our day complete...',
]);

/** Only remove known obsolete samples; never discard a personal draft. */
export function cleanWeddingMessage(message: unknown, isWedding = false): string {
  if (typeof message !== 'string') return '';
  const normalized = normalize(message);
  if (/^your wedding was the most beautiful day(?:\b|\.{3})/.test(normalized)) return '';
  if (isWedding && oldTeasers.has(normalized)) return '';
  return message;
}

/** Migrate local drafts, including legacy message keys and saved design copy. */
export function cleanWeddingDraft<T>(draft: T, wedding = false): T {
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return draft;
  const record = draft as Record<string, unknown>;
  const isWedding = wedding || record.occasion === 'wedding' ||
    (typeof record.id === 'string' && record.id.startsWith('wedding-'));
  const cleaned = Object.fromEntries(Object.entries(record).map(([key, value]) => {
    if (['messageBody', 'message_body', 'message', 'body'].includes(key) && typeof value === 'string') {
      const message = cleanWeddingMessage(value, isWedding);
      return [key, key === 'body' && message !== value ? WEDDING_MESSAGE_EXAMPLE : message];
    }
    return [key, cleanWeddingDraft(value, isWedding)];
  }));
  return cleaned as T;
}