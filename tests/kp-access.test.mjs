import test from 'node:test';
import assert from 'node:assert/strict';
import { hasKPAccess, kpPlanFromKey, kpPlanAccess, kpProductLicenseAccess } from '../src/kp-access.js';

test('KP gate accepts only a verified lifetime or unexpired KP key', () => {
  const now = Date.parse('2026-10-26T00:00:00Z');
  assert.equal(hasKPAccess(null, now), false);
  assert.equal(hasKPAccess({ active: false, lifetime: true }, now), false);
  assert.equal(hasKPAccess({ active: true, lifetime: true }, now), true);
  assert.equal(hasKPAccess({ active: true, lifetime: false, expiresAt: '2026-11-26T00:00:00Z' }, now), true);
  assert.equal(hasKPAccess({ active: true, lifetime: false, expiresAt: '2026-10-25T00:00:00Z' }, now), false);
});

test('KP Standard and Premium keys select only KP plans', () => {
  assert.deepEqual(kpPlanFromKey('ASTROK-STANDARD-KP-MONTH-ABCDEFGHJKLMNPQR'),
    { plan: 'standard', system: 'kp', term: 'month' });
  assert.deepEqual(kpPlanFromKey('ASTROK-PREMIUM-KP-LIFETIME-ABCDEFGHJKLMNPQR'),
    { plan: 'premium', system: 'kp', term: 'lifetime' });
  assert.equal(kpPlanFromKey('ASTROK-PREMIUM-NUMEROLOGY-YEAR-ABCDEFGHJKLMNPQR'), null);
});

test('restored KP plan is active only for its account term', () => {
  const now = Date.parse('2026-10-30T00:00:00Z');
  const wallet = { planEntitlements: [
    { plan: 'standard', system: 'numerology', lifetime: true },
    { plan: 'standard', system: 'kp', lifetime: false, expiresAt: '2026-10-29T00:00:00Z' },
    { plan: 'premium', system: 'kp', lifetime: false, expiresAt: '2026-11-30T00:00:00Z' },
  ] };
  assert.equal(kpPlanAccess(wallet, now)?.plan, 'premium');
  assert.equal(kpPlanAccess(wallet, Date.parse('2026-12-01T00:00:00Z')), null);
});

test('mobile KP subscription and Bank Vault restore from the shared wallet',()=>{
  const now=Date.parse('2026-11-01T00:00:00Z');
  assert.equal(kpPlanAccess({kpSubscriptionActive:true,kpSubscriptionExpiresAt:'2026-12-01T00:00:00Z'},now)?.plan,'standard');
  assert.equal(kpPlanAccess({bankVault:true,bankVaultExpiresAt:'2026-12-01T00:00:00Z'},now)?.plan,'premium');
  assert.equal(kpPlanAccess({bankVault:true,bankVaultExpiresAt:'2026-10-01T00:00:00Z'},now),null);
  assert.equal(kpPlanAccess({planEntitlements:[{plan:'premium',system:'numerology',lifetime:true}]},now)?.plan,'premium');
});

test('historic account-owned KP license restores only while active',()=>{
  const now=Date.parse('2026-11-01T00:00:00Z');
  assert.equal(kpProductLicenseAccess([{product:'kp',expiry_date:'9999-12-31'}],now)?.lifetime,true);
  assert.equal(kpProductLicenseAccess([{product:'kp',expiry_date:'2026-10-31'}],now),null);
});
