export interface BabyDetails {
  babyName?: string;
  babyDate?: string;
  parentsNames?: string;
}

/** Examples are display-only; empty personal fields stay empty in the draft. */
export function resolveBabyDetails(details: BabyDetails) {
  const name = details.babyName?.trim() || 'Lily';
  const babyLabel = /^baby\b/i.test(name) ? name : `Baby ${name}`;
  return {
    titleLine: `${babyLabel} · ${details.babyDate?.trim() || 'March 3, 2027'}`,
    signOff: details.parentsNames?.trim() || 'Emma & James',
  };
}