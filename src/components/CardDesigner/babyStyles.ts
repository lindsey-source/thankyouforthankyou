export const BABY_STYLES = {
  'baby-wildflower-sage': { name: 'Little Star', headerStyle: 'babyMoon' },
  'baby-soft-blush': { name: 'Watercolor Wash', headerStyle: 'babyWash' },
  'baby-sky-blue': { name: 'Modern Minimal', headerStyle: 'babyMinimal' },
  'baby-sunshine': { name: 'Over the Rainbow', headerStyle: 'babyRainbow' },
} as const;

export function babyStyleFor(id: string) {
  return Object.prototype.hasOwnProperty.call(BABY_STYLES, id)
    ? BABY_STYLES[id as keyof typeof BABY_STYLES]
    : undefined;
}