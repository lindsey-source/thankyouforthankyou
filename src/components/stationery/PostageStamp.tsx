import { Heart } from "lucide-react";

interface PostageStampProps {
  amount?: string;
  className?: string;
}

/** Perforated postage stamp — the postage you save becomes the donation. */
export const PostageStamp = ({ amount = "$3", className = "" }: PostageStampProps) => (
  <div className={`postage-stamp ${className}`} aria-label={`${amount} to charity`}>
    <div className="postage-stamp-inner">
      <Heart className="postage-stamp-icon" strokeWidth={1.5} aria-hidden="true" />
      <span className="postage-stamp-amount">{amount}</span>
      <span className="postage-stamp-label">to charity</span>
    </div>
  </div>
);

export default PostageStamp;
