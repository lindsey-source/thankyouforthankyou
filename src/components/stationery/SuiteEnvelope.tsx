import { linerBackground, linerFor } from '@/lib/envelopeLiners';

interface SuiteEnvelopeProps {
  designId?: string | null;
  /** Envelope paper color — defaults to warm cream. */
  color?: string | null;
  className?: string;
}

/** Open envelope with the style's patterned liner, tucked behind a card. */
export const SuiteEnvelope = ({ designId, color, className = '' }: SuiteEnvelopeProps) => {
  const liner = linerBackground(linerFor(designId));
  return (
    <div className={`suite-envelope ${className}`} style={{ ['--env' as string]: color || 'hsl(var(--envelope-cream))' }} aria-hidden="true">
      <div className="suite-envelope-flap" style={{ background: liner }} />
      <div className="suite-envelope-back" style={{ background: liner }} />
      <div className="suite-envelope-pocket" />
    </div>
  );
};

export default SuiteEnvelope;
