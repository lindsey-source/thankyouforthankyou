import { PostageStamp } from "./PostageStamp";
import { HeaderArt } from "@/components/CardDesigner/HeaderArt";
import { DESIGN_SETS } from "@/pages/CreateCardStep2";

/** Homepage hero: cream envelope with blush liner; card rises on hover. */
export const HeroEnvelope = () => {
  const design = DESIGN_SETS.wedding[0];
  return (
    <div className="hero-envelope-stage" role="img" aria-label="A cream envelope with a thank-you card and a $3 to charity stamp">
      <div className="hero-envelope">
        <div className="hero-envelope-back" />
        <div className="hero-envelope-flap-open"><div className="hero-envelope-liner" /></div>
        <div className="hero-envelope-card">
          <HeaderArt design={design} height="150px" initials="E & J" subtext="With love & gratitude" />
          <div className="hero-envelope-card-body">
            <p className="hero-envelope-card-greeting">Dear Aunt Rachel,</p>
            <p className="hero-envelope-card-text">Thank you for celebrating with us — a gift in your name has been made.</p>
          </div>
        </div>
        <div className="hero-envelope-front" />
        <div className="hero-envelope-flap" />
        <PostageStamp amount="$3" className="hero-envelope-stamp" />
        <div className="hero-envelope-address">
          <span>Aunt Rachel</span>
          <span>With gratitude</span>
        </div>
      </div>
      <div className="hero-envelope-shadow" />
    </div>
  );
};

export default HeroEnvelope;
