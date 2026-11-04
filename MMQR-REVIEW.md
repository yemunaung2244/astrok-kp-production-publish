# AstroK Pro MMQR review build — 2026-11-04

Application ID: MM73905177. KYC approved. Application status observed in the
merchant console: DEVELOPMENT. No Production keys generated yet. The merchant
console explicitly requires a compliance review before LIVE customer traffic.

Review entry: /#plans → MMQR → Try MMQR Sandbox. Uses the existing AstroK login.
The checkout is explicitly Sandbox. Real money is not accepted and Sandbox
success never activates a real customer plan. Current integration test amount:
50,000 MMK for one month of KP Premium.

The checkout preserves the account-bound order and exact QR across reopening,
refresh and return from a banking app. QR PNG download is generated locally;
no third-party QR encoder receives the payment data. The 15-minute countdown
and original MMQR logo follow the authenticated merchant-console guidelines.

Verification:
- Website: 62 tests passed and Vite build passed.
- Shared MMQR package: 18 tests passed, including hex simulator nonce HMAC.
- Provider Dashboard FIRE SUCCESS and FIRE FAIL callbacks both received HTTP 200
  after independent server retrieval of the provider transaction.
- Unauthenticated and other-account order operations are rejected.
- No real test-account plan grants were created.

Remaining for actual customer payments: production credential generation and
activation, compliance approval, isolated Live transport/webhook/refund workflow,
and authorized real transaction/renewal tests. The MMQR test amount is 50,000;
review any mobile promotional price differences before enabling Live checkout.
