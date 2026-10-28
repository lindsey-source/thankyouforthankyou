import { describe, it, expect } from 'vitest';
import { resolveGradDetails, resolveBirthdayDetails } from '../src/lib/occasionDetails';

describe('graduation details', () => {
  it('shows soft example when empty', () => {
    expect(resolveGradDetails({}).titleLine).toBe('Maya · Class of 2027');
    expect(resolveGradDetails({}).signOff).toBe('Maya');
  });
  it('adds optional school and signs with graduate name', () => {
    const r = resolveGradDetails({ gradName: 'Noah', gradYear: '2028', gradSchool: 'Lincoln High' });
    expect(r.titleLine).toBe('Noah · Class of 2028 · Lincoln High');
    expect(r.signOff).toBe('Noah');
  });
});

describe('birthday details', () => {
  it('shows soft example when empty', () => {
    expect(resolveBirthdayDetails({}).titleLine).toBe('Maya turns 7 · June 3, 2027');
  });
  it('uses name, age and date; signs with name', () => {
    const r = resolveBirthdayDetails({ bdayName: 'Leo', bdayAge: '40', bdayDate: 'May 1, 2027' });
    expect(r.titleLine).toBe('Leo turns 40 · May 1, 2027');
    expect(r.signOff).toBe('Leo');
  });
});
