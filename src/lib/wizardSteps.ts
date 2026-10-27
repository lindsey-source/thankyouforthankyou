// Single source of truth for the card builder flow: one address per step.
export const WIZARD_STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Guests', path: '/create-card/step4' },
  { name: 'Cause', path: '/create-card/step5' },
  { name: 'Review', path: '/create-card/step6' },
];
export const WIZARD_STEP_NAMES = WIZARD_STEPS.map((s) => s.name);
export const WIZARD_TOTAL_STEPS = WIZARD_STEPS.length;
