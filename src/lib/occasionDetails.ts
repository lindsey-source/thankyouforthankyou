export interface GradDetails { gradName?: string; gradYear?: string; gradSchool?: string }
export interface BirthdayDetails { bdayName?: string; bdayAge?: string; bdayDate?: string }

/** Examples are display-only; empty personal fields stay empty in the draft. */
export function resolveGradDetails(d: GradDetails) {
  const name = d.gradName?.trim() || 'Maya';
  const year = (d.gradYear?.trim() || '2027').replace(/^class of\s*/i, '');
  const school = d.gradSchool?.trim();
  return {
    titleLine: [name, `Class of ${year}`, school].filter(Boolean).join(' · '),
    signOff: name,
    year,
    initials: name.split(/\s+/).map((w) => w.charAt(0).toUpperCase()).slice(0, 2).join(''),
  };
}

export function resolveBirthdayDetails(d: BirthdayDetails) {
  const name = d.bdayName?.trim() || 'Maya';
  const age = d.bdayAge?.trim() || '7';
  return {
    titleLine: `${name} turns ${age} · ${d.bdayDate?.trim() || 'June 3, 2027'}`,
    signOff: name,
  };
}
