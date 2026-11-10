export interface BabyDetails {
  babyName?: string;
  babyDate?: string;
  parentsNames?: string;
}

export const BABY_GIFT_SAMPLES = {
  babyMoon: 'Thank you for the beautiful gift for our little one. We are so grateful for your thoughtfulness and the love you share with our family.',
  babyWash: 'Thank you for the sweet baby gift and for making our shower so special. Your kindness means so much to us.',
  babyMinimal: 'Thank you for your thoughtful gift for our baby. We will treasure it, and we are so grateful to have you in our lives.',
  babyRainbow: 'Thank you for the lovely gift and for celebrating our baby shower with us. We feel so lucky to have your love and support.',
};

const oldSamples = new Set([
  'Thank you for welcoming our little one with so much love. Your kindness lights up these first days for our family.',
  'Thank you for welcoming our little one with so much love. Your thoughtfulness means the world to our growing family.',
  'Thank you for the sweet gift and the warm wishes. Our newest arrival is already surrounded by so much love.',
  'Thank you for celebrating our baby with us. Your thoughtfulness means the world to our growing family.',
  "Thank you for showering our little one with love. We can't wait for you to meet our baby soon.",
]);

/** Replace obsolete defaults only; personal messages remain the parent's own. */
export function cleanBabyDraft<T>(draft: T, baby = false): T {
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return draft;
  const record = draft as Record<string, unknown>;
  const isBaby = baby || record.occasion === 'baby' ||
    (typeof record.id === 'string' && record.id.startsWith('baby-'));
  return Object.fromEntries(Object.entries(record).map(([key, value]) => {
    if (isBaby && typeof value === 'string') {
      if (['headlineText', 'messageHeadline', 'message_headline'].includes(key) &&
          ['Welcome, Little Star', 'Welcome, Little One', 'Hello, Little Wonder', 'Lily'].includes(value)) return [key, 'Thank You'];
      if (['body', 'messageBody', 'message_body'].includes(key) && oldSamples.has(value)) return [key, BABY_GIFT_SAMPLES.babyMoon];
    }
    return [key, cleanBabyDraft(value, isBaby)];
  })) as T;
}

/** Examples are display-only; empty personal fields stay empty in the draft. */
export function resolveBabyDetails(details: BabyDetails) {
  const name = details.babyName?.trim() || 'Lily';
  const babyLabel = /^baby\b/i.test(name) ? name : `Baby ${name}`;
  return {
    headline: 'Thank You',
    fromLine: `from ${babyLabel}`,
    titleLine: `${babyLabel} · ${details.babyDate?.trim() || 'March 3, 2027'}`,
    signOff: details.parentsNames?.trim() || 'Emma & James',
  };
}