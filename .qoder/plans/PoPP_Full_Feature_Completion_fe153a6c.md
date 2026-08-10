# PoPP Full Feature Completion

## Phase 1: Core Protocol Gaps (Items 1-7)

### 1. On-chain Token Transfers
- Add `bank` module integration in `popp-chain/x/ticket/keeper/msg_server.go`
- On submission validation: mint/transfer $POPPT rewards to submitter, validators, proofers
- In Rust backend `resolution.rs`: after resolution, broadcast `MsgSend` tx to chain for reward distribution
- Add `CHAIN_DENOM` env var (default: `stake`) and `REWARD_BASE` for reward calculation
- Update `chain.rs` with `broadcast_reward()` function using Cosmos bank module

### 2. Slashing/Burn Mechanism
- Add `slash_validator` endpoint in `validator.rs` — when validation is proven wrong
- In `chain.rs`: add `broadcast_slash()` that sends tokens to a burn address or uses `MsgBurn`
- DB: track `slash_count`, `total_slashed` per validator in `validators` table
- Auto-slash: if validator votes against consensus >3 times, trigger slash
- Add `burn_address` config in `.env`

### 3. Soulbound Reputation NFTs
- New Cosmos SDK module `popp-chain/x/reputation/` with `SoulboundNFT` type
- Mint NFT when R-Score reaches thresholds (100, 250, 500, 1000)
- In Rust `reputation.rs`: add `check_and_mint_nft()` after R-Score updates
- NFT metadata: level, icon, earned_at, non-transferable flag
- Add REST endpoint `/api/reputation/nfts/{user_id}`

### 4. Emergency/Critical Protocols
- Add `urgency_level` field to submissions (low, medium, high, critical)
- In `escalation.rs`: if AI severity = "Critical" or community flags > 50, auto-escalate to national tier immediately
- Add `emergency_broadcast()` in `chain.rs` — flags ticket as emergency on-chain
- New endpoint: `/api/emergency/activate` — triggers accelerated timeline (1h instead of 24h)
- DB migration: add `urgency_level`, `emergency_activated_at` to submissions

### 5. Cross-Verification
- In `validator.rs` `submit_vote()`: after voting, check if consensus < 60%
- If low consensus: auto-assign 3 more validators via `auto_assign_validators()`
- Add `verification_round` field to track re-assignment rounds
- Max 3 rounds, then escalate to proofer review
- New endpoint: `/api/validators/reassign/{submission_id}`

### 6. Decentralized ID (DID) Integration
- Add `did` field to `users` table (optional, nullable)
- New route `/api/did/register` — accepts DID document, stores hash
- New route `/api/did/verify` — verify a DID against stored hash
- In `auth.rs`: if user has DID, include in JWT claims
- Keep wallet-based auth as default; DID as optional upgrade

### 7. Arweave Memory Chain
- Add Arweave client dependency in Rust (`arweave-rs` crate or HTTP API)
- New module `arweave.rs`: `anchor_to_arweave()` — uploads ticket data as Arweave transaction
- Trigger after proof generation in `proofer.rs`
- Store `arweave_tx_id` in submissions table
- New endpoint: `/api/submissions/{id}/archive` — returns Arweave URL
- Add `ARWEAVE_WALLET_KEY`, `ARWEAVE_NODE_URL` to `.env`

## Phase 2: Infrastructure Gaps (Items 8-16)

### 8. Webhook System
- New `webhooks` table: id, user_id, url, events[], secret, active, created_at
- Routes: `/api/webhooks` (CRUD), test webhook endpoint
- `webhook_dispatcher.rs`: on key events (ticket created, validated, escalated, resolved), POST to registered URLs with HMAC signature
- Fire-and-forget via `tokio::spawn`

### 9. API Key Management
- New `api_keys` table: id, user_id, key_hash, name, rate_limit, active, created_at
- Routes: `/api/api-keys` (create, list, revoke)
- New middleware `api_key_auth.rs`: validate `X-API-Key` header
- Support both wallet-based and API key auth

### 10. Rate Limiting
- Add `tower-http` or `actix-governor` middleware
- Default: 100 req/min per IP, 1000 req/min per API key
- Configurable per-route limits
- Return 429 with `Retry-After` header

### 11. PoPP Zones
- New `popp_zones` table: id, name, zone_type, geo_boundary (PostGIS), admin_id, active
- Routes: `/api/zones` (CRUD), `/api/zones/{id}/tickets`, `/api/zones/nearest/{lat}/{lng}`
- Zone admins can view/manage tickets within their zone
- Integration with existing `infrastructure.rs`

### 12. Sensor/IoT Integration
- New endpoint: `/api/sensors/register` — register IoT device with type, location
- New endpoint: `/api/sensors/report` — accept sensor data (water quality, noise, etc.)
- Sensor reports create auto-submissions with `source: "sensor"` flag
- Add `sensors` table: id, type, location, owner_id, last_report, active

### 13. Proposal Auto-Execution
- In `governance.rs` `execute_proposal()`: after voting ends, check quorum + majority
- If passed: execute based on `proposal_type`:
  - `parameter_change`: update system params
  - `treasury_spend`: trigger token transfer
  - `feature`: mark for dev team review
- Add `executed_at`, `execution_result` to proposals table

### 14. Quorum Enforcement
- In `cast_vote()`: calculate total eligible voters
- In `execute_proposal()`: check `yes_votes + no_votes >= quorum * eligible_voters`
- If quorum not met: mark proposal as `failed_quorum`
- Add `eligible_voter_count` snapshot at proposal creation

### 15. Real-time Notifications (WebSocket)
- Add `actix-web-actors` for WebSocket support
- New route: `/ws/notifications/{user_id}` — live notification stream
- On any notification creation, push to connected WebSocket clients
- Fallback to polling if WS not connected

### 16. Background Job Scheduler
- Add `tokio-cron-scheduler` crate
- Jobs:
  - Every 7 days: decay R-Scores (already computed on read, but persist)
  - Every hour: check expired proposals, auto-execute passed ones
  - Every hour: check submissions pending > 7 days, auto-escalate
  - Daily: cleanup expired sessions/tokens
- New `scheduler.rs` module

## Phase 3: Frontend/UX Gaps (Items 17-22)

### 17. Stub Landing Pages
Build out ~15 stub pages with real content matching PoPP theme:
- `/faqs` — Accordion FAQ component
- `/news` — Blog listing with categories
- `/learn` — Learning path with progress tracking
- `/students` — Student program details
- `/developer-docs` — Interactive API docs with code examples
- `/validator-docs` — Validator guide
- `/validator-exam` — Interactive exam with scoring
- `/validator-leaderboards` — Top validators with stats
- `/validator-smart-contracts` — Contract explorer
- `/validator-tools` — Toolkit page
- `/incentive-structures` — Tokenomics explainer
- `/origin/*` — Team, mission, story pages
- `/how-it-works/*` — Architecture and validation flow diagrams

### 18. Voice Submission (Mobile)
- In Hukum voice assistant: add "submit problem" intent
- Voice flow: wake -> "submit problem" -> capture description -> confirm category -> submit
- Use existing STT/TTS pipeline
- Add `voice_description` field to submission API

### 19. Video Evidence Analysis
- Extend `offchain-intelligence` Python service
- Add video frame extraction (ffmpeg)
- Analyze key frames with ChatGPT Vision API
- Return video-specific findings (damage, conditions, timestamps)
- Add `video_analysis` field to AI response

### 20. Dispute/Appeals UI
- New page `/explorer/dispute` — list disputed tickets
- In detail page: add "Dispute" button if ticket is validated
- Dispute form: reason, evidence upload
- New backend route: `/api/disputes` (create, list, resolve)
- Dispute triggers re-validation with fresh validator set

### 21. Public API Documentation
- Build interactive API docs at `/developer-docs` or `/api-references`
- Use existing page, add endpoint explorer with try-it-out
- Group by category: submissions, validators, governance, chain
- Show auth methods, request/response examples, code snippets

### 22. Ticket Lifecycle Visualization
- In explorer detail page: add visual state-flow diagram
- Show: Submitted -> Validating -> Validated -> Proven -> Escalated -> Resolved
- Highlight current state with animation
- Show timestamps at each transition
- Use framer-motion for smooth transitions

## Execution Order
1. Start with Phase 1 items 1-2 (token transfers + slashing) — foundation for economics
2. Phase 1 items 3-4 (NFTs + emergency) — trust and safety
3. Phase 1 items 5-7 (cross-verification, DID, Arweave) — protocol completeness
4. Phase 2 item 16 (scheduler) first — enables other infrastructure
5. Phase 2 items 8-10 (webhooks, API keys, rate limiting) — API maturity
6. Phase 2 items 11-15 (zones, IoT, auto-execution, quorum, WebSocket)
7. Phase 3 items 17 (stub pages) — quick wins for public presence
8. Phase 3 items 18-22 (voice, video, disputes, API docs, lifecycle viz)
