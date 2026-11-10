import {
  Baby,
  Briefcase,
  Cake,
  Flame,
  GraduationCap,
  HandHeart,
  Heart,
  Mail,
  Star,
  type LucideIcon,
} from 'lucide-react';
import type { Tone } from '@/components/stationery/IconCircle';

export type OccasionId =
  | 'wedding'
  | 'baby'
  | 'graduation'
  | 'birthday'
  | 'mitzvah'
  | 'corporate'
  | 'general'
  | 'memorial'
  | 'charity';

export interface OccasionTile {
  id: OccasionId;
  name: string;
  /** One short line under the serif title. */
  line: string;
  /** Fine outline icon, drawn in a pastel circle. */
  Icon: LucideIcon;
  /** Pastel circle tone. */
  tone: Tone;
}

/**
 * The occasion picker on builder step 1: white stationery tiles, each with a
 * fine outline icon in a pastel circle, a serif title and one short line.
 */
export const OCCASION_TILES: OccasionTile[] = [
  { id: 'wedding', name: 'Wedding', line: 'For the day, and all the days after', Icon: Heart, tone: 'blush' },
  { id: 'baby', name: 'Baby', line: 'For gifts, showers and sweet surprises', Icon: Baby, tone: 'sky' },
  { id: 'graduation', name: 'Graduation', line: 'For the next chapter', Icon: GraduationCap, tone: 'sage' },
  { id: 'birthday', name: 'Birthday', line: 'For another year well lived', Icon: Cake, tone: 'butter' },
  { id: 'mitzvah', name: 'Bar / Bat Mitzvah', line: 'For a milestone worth marking', Icon: Star, tone: 'lilac' },
  { id: 'corporate', name: 'Corporate', line: 'Gratitude in your company’s voice', Icon: Briefcase, tone: 'stone' },
  { id: 'general', name: 'General Thank You', line: 'For any gift, favor, or kindness', Icon: Mail, tone: 'rose' },
  { id: 'memorial', name: 'Memorial', line: 'Quiet thanks for quiet support', Icon: Flame, tone: 'sand' },
  { id: 'charity', name: 'Charity', line: 'Thanks that give back', Icon: HandHeart, tone: 'mint' },
];
