import executive from '@/assets/corporate-executive-engraving.png';
import geometric from '@/assets/corporate-geometric-watercolor.png';
import celestial from '@/assets/corporate-celestial-engraving.png';
import sketchbook from '@/assets/corporate-sketchbook-atelier.png';
import laurel from '@/assets/stationery-laurel-engraving.png';
import champagne from '@/assets/stationery-champagne-engraving.png';
import olive from '@/assets/stationery-olive-watercolor.png';
import star from '@/assets/stationery-mitzvah-star.png';
import hands from '@/assets/stationery-hands-engraving.png';
import doodle from '@/assets/stationery-doodle-watercolor.png';
import torah from '@/assets/stationery-torah-watercolor.png';
import candle from '@/assets/stationery-candle-watercolor.png';
import cap from '@/assets/grad-watercolor-cap.png';
import balloons from '@/assets/bday-watercolor-balloons.png';
import bloom from '@/assets/mitzvah-watercolor-bloom.png';
import ferns from '@/assets/general-pressed-ferns.png';
import seedlings from '@/assets/charity-watercolor-seedlings.png';
import sunrise from '@/assets/charity-watercolor-sunrise.jpg';
import tallit from '@/assets/stationery-tallit-watercolor.png';
import ribbon from '@/assets/stationery-gilded-ribbon.png';
import diamond from '@/assets/stationery-graduation-diamond.png';
import type { OccasionStyleKey } from './occasionStyles';

const illustrations: Partial<Record<OccasionStyleKey, string>> = {
  cleanExec: executive, geometric, nightSky: celestial, sketchbook,
  goldClass: diamond, capTassel: cap, boldType: geometric, laurelCrest: laurel,
  balloons, champagne, colorBlock: geometric, boldStar: star,
  tallit, mosaicTorah: torah, bloom, gildedStripes: ribbon, pressed: ferns, doodle,
  candle, olive, seedling: seedlings, hands, newDay: sunrise,
};

/** Stable style keys keep illustration upgrades identical in every preview. */
export function StationeryIllustration({ styleKey }: { styleKey: OccasionStyleKey }) {
  const src = illustrations[styleKey];
  if (!src) return null;
  return <img src={src} alt="" aria-hidden="true" loading="lazy" width={1152} height={576} className={`stationery-illustration stationery-illustration--${styleKey}`} />;
}

export const hasStationeryIllustration = (key: OccasionStyleKey) => Boolean(illustrations[key]);