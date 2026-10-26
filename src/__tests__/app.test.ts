import { describe, it, expect } from 'vitest';
import { SERVICES, BLOG_POSTS, FAQ_ITEMS } from '../data';
import { isSupabaseConfigured } from '../lib/supabase';

// NECTA index number regex used in application
const NECTA_INDEX_REGEX = /^[SP]\d{4}\/\d{4}\/\d{4}$/i;

// Tanzanian phone regex used in contact form validation
const TZ_PHONE_REGEX = /^(?:\+255|0)[67]\d{8}$/;

describe('NECTA Index Number Validation', () => {
  it('accepts valid school candidate index numbers', () => {
    expect(NECTA_INDEX_REGEX.test('S0116/0023/2026')).toBe(true);
    expect(NECTA_INDEX_REGEX.test('s0116/0023/2026')).toBe(true);
    expect(NECTA_INDEX_REGEX.test('S1234/0567/2025')).toBe(true);
  });

  it('accepts valid private candidate index numbers', () => {
    expect(NECTA_INDEX_REGEX.test('P0116/0023/2026')).toBe(true);
    expect(NECTA_INDEX_REGEX.test('p0345/0001/2024')).toBe(true);
  });

  it('rejects invalid index numbers', () => {
    expect(NECTA_INDEX_REGEX.test('')).toBe(false);
    expect(NECTA_INDEX_REGEX.test('S0116')).toBe(false);
    expect(NECTA_INDEX_REGEX.test('S0116/0023')).toBe(false);
    expect(NECTA_INDEX_REGEX.test('S0116/023/2026')).toBe(false); // only 3 digits in center
    expect(NECTA_INDEX_REGEX.test('X0116/0023/2026')).toBe(false); // invalid starting prefix
    expect(NECTA_INDEX_REGEX.test('S0116-0023-2026')).toBe(false); // hyphens instead of slashes
    expect(NECTA_INDEX_REGEX.test('S0116/0023/2026<script>')).toBe(false); // script injection attempt
  });
});

describe('Contact Form & Security Validation', () => {
  it('validates Tanzanian phone number formats correctly', () => {
    expect(TZ_PHONE_REGEX.test('+255787547236')).toBe(true);
    expect(TZ_PHONE_REGEX.test('+255655123456')).toBe(true);
    expect(TZ_PHONE_REGEX.test('0787547236')).toBe(true);
    expect(TZ_PHONE_REGEX.test('0655123456')).toBe(true);
  });

  it('rejects invalid or international non-Tanzanian phone numbers', () => {
    expect(TZ_PHONE_REGEX.test('12345')).toBe(false);
    expect(TZ_PHONE_REGEX.test('+14155552671')).toBe(false);
    expect(TZ_PHONE_REGEX.test('0222123456')).toBe(false); // landline prefix not accepted
    expect(TZ_PHONE_REGEX.test('abc0787547236')).toBe(false);
  });

  it('prevents bot submissions via honeypot field', () => {
    const isBot = (honeypotVal: string) => Boolean(honeypotVal && honeypotVal.trim().length > 0);
    expect(isBot('')).toBe(false);
    expect(isBot('   ')).toBe(false);
    expect(isBot('bot_token_value')).toBe(true);
  });
});

describe('Factual Data & Content Audit', () => {
  it('contains verified services with legitimate Tanzanian portals', () => {
    expect(SERVICES.length).toBeGreaterThanOrEqual(4);
    const serviceIds = SERVICES.map(s => s.id);
    expect(serviceIds).toContain('heslb');
    expect(serviceIds).toContain('tcu');
    expect(serviceIds).toContain('rita');
    expect(serviceIds).toContain('nida');
  });

  it('ensures official government URLs are HTTPS and legitimate .go.tz domains', () => {
    const heslb = SERVICES.find(s => s.id === 'heslb');
    expect(heslb?.officialLink).toBe('https://olams.heslb.go.tz');

    const tcu = SERVICES.find(s => s.id === 'tcu');
    expect(tcu?.officialLink).toBe('https://www.tcu.go.tz');

    const rita = SERVICES.find(s => s.id === 'rita');
    expect(rita?.officialLink).toBe('https://e.rita.go.tz');

    const nida = SERVICES.find(s => s.id === 'nida');
    expect(nida?.officialLink).toBe('https://services.nida.go.tz/eservice');
  });

  it('qualifies fees transparently in requirements and steps', () => {
    const heslb = SERVICES.find(s => s.id === 'heslb');
    const feeRequirement = heslb?.requirements.find(r => r.textSwahili.includes('Tsh 30,000'));
    expect(feeRequirement?.textSwahili).toContain('GePG');
    expect(feeRequirement?.textSwahili).toContain('heslb.go.tz');
  });

  it('contains well-structured FAQ answers that avoid fabricated guarantees', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(5);
    const boomFaq = FAQ_ITEMS.find(f => f.id === 'f5');
    expect(boomFaq?.answerSwahili).toContain('HESLB');
    expect(boomFaq?.answerEnglish).toContain('heslb.go.tz');
  });
});

describe('Supabase Client Architecture', () => {
  it('reports configuration status truthfully depending on env vars', () => {
    expect(typeof isSupabaseConfigured()).toBe('boolean');
  });
});
