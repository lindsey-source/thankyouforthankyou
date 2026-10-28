import { describe, it, expect } from 'vitest';
import { resolveOccasionDetails as r } from '../src/lib/occasionDetails';

describe('occasion details', () => {
  it('graduation example and sign-off', () => {
    expect(r('graduation', {}).titleLine).toBe('Maya · Class of 2027');
    expect(r('graduation', { gradName: 'Noah', gradYear: '2028', gradSchool: 'Lincoln High' }).titleLine).toBe('Noah · Class of 2028 · Lincoln High');
    expect(r('graduation', { gradName: 'Noah' }).signOff).toBe('Noah');
  });
  it('birthday line', () => {
    expect(r('birthday', {}).titleLine).toBe('Maya turns 7 · June 3, 2027');
    expect(r('birthday', { bdayName: 'Leo' }).signOff).toBe('Leo');
  });
  it('mitzvah line', () => {
    expect(r('mitzvah', {}).titleLine).toBe('Noah · May 14, 2027');
  });
  it('corporate shows company, signs with sender and title', () => {
    const d = r('corporate', { companyName: 'Acme', corpSender: 'Sam Lee', corpTitle: 'CEO' });
    expect(d.titleLine).toBe('Acme');
    expect(d.signOff).toBe('Sam Lee, CEO');
  });
  it('general signs with sender', () => {
    expect(r('general', { senderName: 'Ava' }).signOff).toBe('Ava');
  });
  it('memorial line and gift wording', () => {
    const d = r('memorial', {});
    expect(d.titleLine).toBe('In loving memory of Eleanor Cohen · 1941–2027');
    expect(d.giftLabel).toBe('A gift in memory of Eleanor');
    expect(d.signOff).toBe('The Cohen Family');
  });
  it('charity signs with organization', () => {
    const d = r('charity', { orgName: 'Hope', orgCampaign: 'Clean Water' });
    expect(d.titleLine).toBe('Hope · Clean Water');
    expect(d.signOff).toBe('Hope');
  });
});
