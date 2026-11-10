import type { LucideIcon } from "lucide-react";

export type Tone =
  | "blush"
  | "sage"
  | "sky"
  | "butter"
  | "lilac"
  | "stone"
  | "rose"
  | "sand"
  | "mint";

export const IconCircle = ({ Icon, tone = "blush", size = "md" }: { Icon: LucideIcon; tone?: Tone; size?: "sm" | "md" }) => (
  <span className={`icon-circle icon-circle-${tone} icon-circle-${size}`} aria-hidden="true">
    <Icon strokeWidth={1.25} />
  </span>
);

export default IconCircle;
