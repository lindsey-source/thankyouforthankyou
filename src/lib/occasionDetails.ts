/**
 * Shared per-occasion personal details (graduation, birthday, mitzvah,
 * corporate, general, memorial, charity). Examples are display-only;
 * empty personal fields stay empty in the draft.
 */
export type DetailOccasion =
  | 'graduation' | 'birthday' | 'mitzvah' | 'corporate' | 'general' | 'memorial' | 'charity';

export type DetailKey =
  | 'gradName' | 'gradYear' | 'gradSchool'
  | 'bdayName' | 'bdayAge' | 'bdayDate'
  | 'mitzvahName' | 'mitzvahDate'
  | 'companyName' | 'corpSender' | 'corpTitle'
  | 'senderName'
  | 'memName' | 'memDates' | 'memFamily'
  | 'orgName' | 'orgCampaign';

export type DetailValues = Partial<Record<DetailKey, string | null | undefined>>;

export interface DetailField { key: DetailKey; label: string; placeholder: string; optional?: boolean }

export const OCCASION_FIELDS: Record<DetailOccasion, { heading: string; fields: DetailField[] }> = {
  graduation: { heading: 'The graduate', fields: [
    { key: 'gradName', label: "Graduate's name", placeholder: 'Maya' },
    { key: 'gradYear', label: 'Class year', placeholder: '2027' },
    { key: 'gradSchool', label: 'School', placeholder: 'Lincoln High School', optional: true },
  ] },
  birthday: { heading: 'The birthday', fields: [
    { key: 'bdayName', label: "Celebrant's name", placeholder: 'Maya' },
    { key: 'bdayAge', label: 'Age', placeholder: '7' },
    { key: 'bdayDate', label: 'Date', placeholder: 'June 3, 2027' },
  ] },
  mitzvah: { heading: 'The celebrant', fields: [
    { key: 'mitzvahName', label: "Celebrant's name", placeholder: 'Noah' },
    { key: 'mitzvahDate', label: 'Date', placeholder: 'May 14, 2027' },
  ] },
  corporate: { heading: 'Your company', fields: [
    { key: 'companyName', label: 'Company name', placeholder: 'Northwind Studio' },
    { key: 'corpSender', label: "Sender's name", placeholder: 'Alex Morgan' },
    { key: 'corpTitle', label: "Sender's title", placeholder: 'Managing Director' },
  ] },
  general: { heading: 'From', fields: [
    { key: 'senderName', label: 'Your name', placeholder: 'Jordan' },
  ] },
  memorial: { heading: 'In memory', fields: [
    { key: 'memName', label: "Loved one's name", placeholder: 'Eleanor Cohen' },
    { key: 'memDates', label: 'Their dates', placeholder: '1941–2027' },
    { key: 'memFamily', label: 'Family sign-off', placeholder: 'The Cohen Family' },
  ] },
  charity: { heading: 'Your organization', fields: [
    { key: 'orgName', label: 'Organization name', placeholder: 'Harbor Food Bank' },
    { key: 'orgCampaign', label: 'Project or campaign', placeholder: 'Winter Meals Drive' },
  ] },
};

export const DETAIL_KEYS: DetailKey[] = Object.values(OCCASION_FIELDS).flatMap((o) => o.fields.map((f) => f.key));

const PREFIXES: Record<string, DetailOccasion> = {
  'grad-': 'graduation', 'bday-': 'birthday', 'mitzvah-': 'mitzvah', 'corp-': 'corporate',
  'gen-': 'general', 'mem-': 'memorial', 'charity-': 'charity',
};

export function detailOccasionFor(occasionOrId?: string | null): DetailOccasion | undefined {
  if (!occasionOrId) return undefined;
  if (occasionOrId in OCCASION_FIELDS) return occasionOrId as DetailOccasion;
  const p = Object.keys(PREFIXES).find((k) => occasionOrId.startsWith(k));
  return p ? PREFIXES[p] : undefined;
}

export interface ResolvedDetails {
  titleLine?: string;
  signOff: string;
  /** Gift badge label */
  giftLabel: string;
  /** Short art values (initials, year, age, name) */
  art: { name: string; initials: string; year?: string; age?: string };
}

const v = (d: DetailValues, k: DetailKey, ex: string) => (d[k] ?? '').toString().trim() || ex;
const initialsOf = (s: string) => s.split(/[\s&]+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase()).slice(0, 2).join('');

export function resolveOccasionDetails(occasion: DetailOccasion, d: DetailValues = {}): ResolvedDetails {
  const gift = 'A gift in your name';
  switch (occasion) {
    case 'graduation': {
      const name = v(d, 'gradName', 'Maya');
      const year = v(d, 'gradYear', '2027').replace(/^class of\s*/i, '');
      const school = (d.gradSchool ?? '').toString().trim();
      return { titleLine: [name, `Class of ${year}`, school].filter(Boolean).join(' · '), signOff: name, giftLabel: gift, art: { name, initials: initialsOf(name), year } };
    }
    case 'birthday': {
      const name = v(d, 'bdayName', 'Maya');
      const age = v(d, 'bdayAge', '7');
      return { titleLine: `${name} turns ${age} · ${v(d, 'bdayDate', 'June 3, 2027')}`, signOff: name, giftLabel: gift, art: { name, initials: initialsOf(name), age } };
    }
    case 'mitzvah': {
      const name = v(d, 'mitzvahName', 'Noah');
      return { titleLine: `${name} · ${v(d, 'mitzvahDate', 'May 14, 2027')}`, signOff: name, giftLabel: gift, art: { name, initials: initialsOf(name) } };
    }
    case 'corporate': {
      const company = v(d, 'companyName', 'Northwind Studio');
      const sender = v(d, 'corpSender', 'Alex Morgan');
      const title = v(d, 'corpTitle', 'Managing Director');
      return { titleLine: company, signOff: `${sender}, ${title}`, giftLabel: gift, art: { name: company, initials: initialsOf(company) } };
    }
    case 'general': {
      const name = v(d, 'senderName', 'Jordan');
      return { titleLine: undefined, signOff: name, giftLabel: gift, art: { name, initials: initialsOf(name) } };
    }
    case 'memorial': {
      const name = v(d, 'memName', 'Eleanor Cohen');
      const dates = v(d, 'memDates', '1941–2027');
      const first = name.split(/\s+/)[0];
      return { titleLine: `In loving memory of ${name} · ${dates}`, signOff: v(d, 'memFamily', 'The Cohen Family'), giftLabel: `A gift in memory of ${first}`, art: { name, initials: initialsOf(name) } };
    }
    case 'charity': {
      const org = v(d, 'orgName', 'Harbor Food Bank');
      const campaign = v(d, 'orgCampaign', 'Winter Meals Drive');
      return { titleLine: `${org} · ${campaign}`, signOff: org, giftLabel: gift, art: { name: org, initials: initialsOf(org) } };
    }
  }
}
