# solana-agent-kit-plugin-madeonsol

[![npm version](https://img.shields.io/npm/v/solana-agent-kit-plugin-madeonsol?style=flat-square)](https://www.npmjs.com/package/solana-agent-kit-plugin-madeonsol)
[![npm downloads](https://img.shields.io/npm/dm/solana-agent-kit-plugin-madeonsol?style=flat-square)](https://www.npmjs.com/package/solana-agent-kit-plugin-madeonsol)
[![SAK](https://img.shields.io/badge/Solana%20Agent%20Kit-plugin-blueviolet?style=flat-square)](https://github.com/sendaifun/solana-agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

> 📚 **[API docs](https://madeonsol.com/api-docs)** · 💰 **[Free API key](https://madeonsol.com/pricing)** · 🤖 **[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit)**

[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit) plugin for [MadeOnSol](https://madeonsol.com) — Solana KOL intelligence, deployer analytics, bundle-cohort held-% signals, and wallet tracking.

> Real-time Solana trading intelligence: track 1,069 KOL wallets with <3s latency, score 23,000+ Pump.fun deployers, surface deshred deploy signals ~500ms before on-chain confirmation, detect multi-KOL coordination, and stream every DEX trade. Free tier: 200 requests/day, every endpoint — no signup payment. Get a key at [madeonsol.com/pricing](https://madeonsol.com/pricing).

> **New in 1.16.0** — **Bundle-cohort holdings.** New tool `tokenBundle()` + action `MADEONSOL_TOKEN_BUNDLE_ACTION` — which same-slot "bundle" wallets (≥3 buying in one slot) bought a token and how much of supply they STILL hold, from confirmed on-chain data. Returns a `bundle` summary (`wallet_count`, `bundle_kind` [`atomic_tx`/`same_slot`/`none`], `held_ratio`, **`held_pct_of_supply`** [the headline rug/insider signal], `fully_exited`, `buy_volume`, `tokens_held`) plus a `wallets[]` list (`rank`, `wallet`, `held_ratio`, `has_sold`, `atomic`, `is_kol`). BASIC/TRADER get the `bundle` block only (`wallets: []`); PRO gets top-10 flags-only; ULTRA adds full holdings + wallet identity (`kol_name`, `win_rate`, `bot_confidence`, `tokens_held`). PRO/ULTRA only.
>
> **New in 1.15.0** — **Batch risk scoring + WebSocket session control.** New tool `tokenRiskBatch()` + action `MADEONSOL_TOKEN_RISK_BATCH_ACTION` — bulk 0–100 rug-risk/safety scoring for 1–50 mints in one call (`{ tokens, count }`, same per-mint shape as `tokenRisk()` plus an `as_of` ISO string; untracked mints come back as `{ mint, error: "not_tracked" }` without failing the batch; counts as one request). New tools `streamSessions()` / `streamSessionKill({ id })` + actions `MADEONSOL_STREAM_SESSIONS_ACTION` / `MADEONSOL_STREAM_SESSION_KILL_ACTION` — list your live ws-streaming/dex-stream sessions (`id`, `service`, `tier`, `channels[]`, `connected_at`, `remote_ip`, `messages_sent`) and evict one by id to free a connection slot. PRO/ULTRA only.
>
> **New in 1.14.0** — **Almost-bonded discovery + trending sorts.** New tool `almostBonded()` + action `MADEONSOL_ALMOST_BONDED_ACTION` — pre-bond pump.fun tokens near graduation, ranked by velocity (Δprogress/min): "95% and accelerating" beats "92% stalled". Each token carries `progress_pct`, `velocity_pct_per_min`, `eta_minutes`, `stalled`, `real_sol_reserves`, `market_cap_usd`, `liquidity_usd`, `authorities_revoked`, `deployer_tier`, and `age_minutes`. Params: `min_progress`, `max_progress`, `min_velocity_pct_per_min`, `max_age_minutes`, `deployer_tier`, `authority_revoked`, `min_liq`, `sort` (velocity_desc / progress_desc / eta_asc), `limit`. PRO/ULTRA only. Plus `tokensList({ sort })` gains four momentum sorts — `mc_change_5m_desc`, `mc_change_1h_desc`, `volume_1h_desc`, and `trending` (composite recent-volume × positive-momentum rank).
>
> **New in 1.13.0** — **Token net flow.** New tool `tokenFlow()` + action `MADEONSOL_TOKEN_FLOW_ACTION` — net buy/sell flow over a rolling window (`1h` default, or `24h`): `unique_wallets`, `unique_buyers`, `unique_sellers`, `buy_count`, `sell_count`, `total_trades`, `buy_sol`, `sell_sol`, `net_sol`, `trades_per_wallet`. PRO/ULTRA only. Deployer alerts now also surface `deployer_sol_balance` — the deployer wallet's SOL balance at alert time (`null` for historical rows).
>
> **New in 1.12.0** — **Token OHLCV candles.** New tool `tokenCandles()` + action `MADEONSOL_TOKEN_CANDLES_ACTION` — historical price candles (1m/5m/15m/1h/4h/1d) aggregated from the on-chain trade firehose. Each candle has `t/open/high/low/close/volume_usd/trades/market_cap_usd`. PRO returns OHLCV for the last 30 days; ULTRA adds buy/sell volume + count splits, net flow, MEV volume, open/close liquidity, high/low MC, and full history. PRO/ULTRA only.
>
> **New in 1.11.0** — **Token risk score.** New tool `tokenRisk()` + action `MADEONSOL_TOKEN_RISK_ACTION` — a transparent 0–100 rug-risk/safety score (higher = riskier) with a `band` (safe/caution/danger), an explainable `factors[]` array, and the raw `inputs` (mint/freeze authority, liquidity, liq-to-MC ratio, transfer fee, launch cohort, deployer bond rate, KOL signal, blacklist). PRO/ULTRA only.

> **New in 1.9.3** — Deployer alerts now surface `runner_rate` + `labeled_tokens` (fraction of a deployer's labeled tokens that ran vs dumped, gate on `labeled_tokens` ≥3) and `avg_time_to_bond_minutes`.

> **New in 1.9.2** — **Dump-cluster detection.** Buyer-quality breakdown now includes `dump_cluster_count` (3+ dump-cluster wallets in the first-20 → 94% historical dump rate vs 61% base) and `recycled_early_buyer_count`, on all tiers. The API also pushes every pump.fun graduation in real time (`token:graduations` WS channel).

> **New in 1.9** — **Price alerts, scout leaderboard, coordination history.** `agent.methods.priceAlertsCreate()` (PRO=5, ULTRA=25). `agent.methods.scoutLeaderboard()`, `kolConsensus()`, `peakHistory()`, `coordinationHistory()`. `walletStats` now returns `derived`: win_rate, roi, verdict, biggest_miss.
>
> **New in 1.8** — **Universal Wallet API.** `agent.methods.walletStats()`, `walletPnl()`, `walletPositions()`, `walletTrades()` — FIFO cost-basis PnL for any wallet. PRO+. Cache hits free.
>
> **New in 1.7.0** *(2026-05-12)* — **Account introspection + filtered token directory.** Two new actions: `meAction` (`GET /me`) returns your tier, daily/burst quota state, remaining requests, and per-feature usage so the agent can self-throttle; `tokensListAction` (`GET /tokens`, PRO+) exposes the full filtered/sortable token directory with MC band, liquidity floor, recent-activity window, primary DEX, authority flags, computed 1h volume floor, MEV-share ceiling, and MC change deltas — defaults to `min_liq=2000` to skip dust. Token responses now carry velocity / MEV-share fields. `/token/{mint}` returns structured 400 errors (`code`, `reason`, `example`, `docs`) instead of bare 400s. Deprecated `avg_entry_mc_usd` removed from leaderboards.

## Quick start (10 seconds)

```bash
npm install solana-agent-kit-plugin-madeonsol
```

```ts
import { SolanaAgentKit } from "solana-agent-kit";
import MadeOnSolPlugin from "solana-agent-kit-plugin-madeonsol";
const agent = new SolanaAgentKit(privateKey, rpcUrl, { MADEONSOL_API_KEY: "msk_..." }); // free tier at https://madeonsol.com/pricing
agent.use(MadeOnSolPlugin);
const trades = await agent.methods.kolFeed(agent, { limit: 5, action: "buy" });
```

## Authentication

Two options (in priority order):

| Method | Config key | Best for |
|---|---|---|
| **MadeOnSol API key** (recommended) | `MADEONSOL_API_KEY` | Developers — [get a free key](https://madeonsol.com/pricing) |
| x402 micropayments | `SVM_PRIVATE_KEY` | AI agents with Solana wallets |

> **v1.0 breaking change:** RapidAPI auth (`RAPIDAPI_KEY`) has been removed. The MadeOnSol RapidAPI marketplace was retired on 2026-04-19. Get a free `msk_` key at [madeonsol.com/pricing](https://madeonsol.com/pricing).

## Install

```bash
npm install solana-agent-kit-plugin-madeonsol
```

> x402 peer deps (`@x402/fetch @x402/svm @x402/core @solana/kit @scure/base`) are only needed when using `SVM_PRIVATE_KEY`.

## Usage

```typescript
import { SolanaAgentKit } from "solana-agent-kit";
import MadeOnSolPlugin from "solana-agent-kit-plugin-madeonsol";

const agent = new SolanaAgentKit(privateKey, rpcUrl, {
  MADEONSOL_API_KEY: "msk_your_api_key_here",
});

agent.use(MadeOnSolPlugin);

// Use via methods
const trades = await agent.methods.kolFeed(agent, { limit: 10, action: "buy" });

// Wallet tracker
const watchlist = await agent.methods.walletTrackerWatchlist(agent);
await agent.methods.walletTrackerAdd(agent, { wallet_address: "WALLET", label: "whale" });
const events = await agent.methods.walletTrackerTrades(agent, { limit: 50 });

// Or let the LLM trigger actions via natural language
// "What are KOLs buying right now?" → MADEONSOL_KOL_FEED_ACTION
```

## Actions

| Action | Triggers on |
|---|---|
| `MADEONSOL_KOL_FEED_ACTION` | "kol trades", "what are kols buying" |
| `MADEONSOL_KOL_COORDINATION_ACTION` | "kol convergence", "tokens kols accumulating" |
| `MADEONSOL_KOL_LEADERBOARD_ACTION` | "top kols", "kol rankings" — periods: today, 7d, 30d, 90d, 180d |
| `MADEONSOL_DEPLOYER_ALERTS_ACTION` | "deployer alerts", "pump fun launches" |
| `MADEONSOL_KOL_PNL_ACTION` | "kol pnl", "kol profit", "wallet pnl" |
| `MADEONSOL_KOL_TRENDING_TOKENS_ACTION` | "kol trending tokens", "kol volume" |
| `MADEONSOL_KOL_FIRST_TOUCHES_ACTION` | "kol first touch", "first kol buyer", "scout signal" — backtested first-mover signal (new in 1.3) |
| `MADEONSOL_WALLET_TRACKER_WATCHLIST_ACTION` | "wallet watchlist", "tracked wallets" |
| `MADEONSOL_WALLET_TRACKER_ADD_ACTION` | "track wallet", "watch wallet", "add to watchlist" |
| `MADEONSOL_WALLET_TRACKER_REMOVE_ACTION` | "untrack wallet", "remove from watchlist" |
| `MADEONSOL_WALLET_TRACKER_TRADES_ACTION` | "wallet tracker trades", "watchlist activity" |
| `MADEONSOL_WALLET_TRACKER_SUMMARY_ACTION` | "wallet tracker summary", "tracked wallet stats" |
| `MADEONSOL_ME_ACTION` | "my api account", "api quota", "remaining requests" — tier + quota introspection (new in 1.7) |
| `MADEONSOL_TOKENS_LIST_ACTION` | "filter tokens", "tokens by market cap", "scan tokens" — filtered/sortable token directory + momentum/trending sorts, PRO+ (new in 1.7) |
| `MADEONSOL_ALMOST_BONDED_ACTION` | **New 1.14** · "almost bonded", "about to graduate", "near graduation" — pre-bond pump.fun tokens ranked by velocity (Δprogress/min): progress, ETA, stalled, deployer tier (PRO+) |
| `MADEONSOL_WALLET_STATS_ACTION` | **New 1.8** · "wallet stats", "wallet info", "check wallet" — aggregate 90d stats + cross-product flags (KOL/alpha/deployer) for any Solana wallet (PRO+) |
| `MADEONSOL_WALLET_PNL_ACTION` | **New 1.8** · "wallet pnl", "wallet profit", "wallet performance" — FIFO cost-basis PnL with profit factor, drawdown, daily curve, closed + open positions (PRO+) |
| `MADEONSOL_WALLET_POSITIONS_ACTION` | **New 1.8** · "wallet positions", "wallet bags", "open positions" — open lots with live unrealized SOL (PRO+) |
| `MADEONSOL_WALLET_TRADES_ACTION` | **New 1.8** · "wallet trades", "wallet history" — cursor-paginated raw trades with filters (PRO+) |
| `MADEONSOL_TOKEN_FLOW_ACTION` | **New 1.13** · "token flow", "net flow", "buy/sell pressure" — net buy/sell flow over a 1h/24h window (PRO+) |
| `MADEONSOL_TOKEN_RISK_BATCH_ACTION` | **New 1.15** · "batch token risk", "bulk rug risk", "score many tokens" — rug-risk scoring for 1–50 mints in one call; untracked mints don't fail the batch (PRO+) |
| `MADEONSOL_STREAM_SESSIONS_ACTION` | **New 1.15** · "list stream sessions", "live websocket sessions", "active ws sessions" — your live ws-streaming/dex-stream sessions (PRO+) |
| `MADEONSOL_STREAM_SESSION_KILL_ACTION` | **New 1.15** · "kill stream session", "evict session", "free a connection slot" — evict a live streaming session by id (PRO+) |

## Additional methods (v1.0+)

These are exposed via `agent.methods.*` (no LLM action wrappers — call directly):

### Alpha Wallet Intelligence

Scored from 1M+ early-buyer records (wallets seen in the first 20 buyers of Pump.fun tokens).

```ts
await agent.methods.alphaLeaderboard(agent, { limit: 100 });            // Free/Pro=100, ULTRA=500 + bot signals
await agent.methods.alphaWallet(agent, { wallet: "WALLET" });           // ULTRA only — full breakdown + bot signals
await agent.methods.alphaLinked(agent, { wallet: "WALLET" });           // ULTRA only — co-bought 3+ tokens within 2s
```

### Token Quality

```ts
await agent.methods.tokenCapTable(agent, { mint: "MINT" });             // PRO=10, ULTRA=20 first non-deployer buyers
await agent.methods.tokenBuyerQuality(agent, { mint: "MINT" });         // 0–100 buyer-quality score (5-min cached)
await agent.methods.tokenRisk(agent, { mint: "MINT" });                 // PRO+ 0–100 rug-risk/safety score + band + factors
await agent.methods.tokenRiskBatch(agent, { mints: ["MINT_A", "MINT_B"] }); // PRO+ bulk rug-risk for 1–50 mints → { tokens, count }; one request
await agent.methods.tokenBundle(agent, { mint: "MINT" });               // PRO+ bundle-cohort holdings: held_pct_of_supply signal; ULTRA=+wallet identity
await agent.methods.tokenCandles(agent, { mint: "MINT", tf: "1h" });    // PRO+ OHLCV candles (1m–1d); ULTRA=+net flow, liquidity, full history
await agent.methods.tokenFlow(agent, { mint: "MINT", window: "24h" });  // PRO+ net buy/sell flow (1h/24h): unique wallets, buy/sell/net SOL, trades-per-wallet
await agent.methods.almostBonded(agent, { min_progress: 90, sort: "eta_asc" }); // PRO+ pre-bond pump.fun tokens by velocity: progress, ETA, stalled, deployer tier
```

> Deployer alerts (`MADEONSOL_DEPLOYER_ALERTS_ACTION` / `agent.methods.deployerAlerts()`) now include `deployer_sol_balance` — the deployer wallet's SOL balance at alert time (`null` for historical rows).

### Copy-Trade Rules (PRO/ULTRA)

Server-side rules that fire signals when a watched source wallet trades. Delivered via webhook (HMAC-signed) and/or WebSocket.

```ts
await agent.methods.copyTradeList(agent);
await agent.methods.copyTradeCreate(agent, {
  name: "Track Whales",
  source_wallets: ["WALLET_A", "WALLET_B"],  // 1-50 wallets
  sizing_mode: "fixed",
  sizing_amount: 0.5,                          // required
  only_action: "buy",
  delivery_mode: "webhook",
  webhook_url: "https://you.com/hook",
});
await agent.methods.copyTradeSignals(agent, { limit: 50 });             // up to 7 days
```

### Streaming Sessions *(new in 1.15)*

List and kill your live WebSocket streaming sessions (ws-streaming + dex-stream). Handy when a ghost socket is holding a connection slot. PRO/ULTRA only.

```ts
const { sessions, count } = await agent.methods.streamSessions(agent);   // id, service, tier, channels[], connected_at, remote_ip, messages_sent
await agent.methods.streamSessionKill(agent, { id: "123" });             // → { evicted: true, id }
```

Also exposed as `MADEONSOL_STREAM_SESSIONS_ACTION` and `MADEONSOL_STREAM_SESSION_KILL_ACTION`.

### KOL Coordination Alerts (PRO/ULTRA — v1.1 push signals)

Real-time push alerts when a KOL cluster co-buys the same token. Fires within ~1s of the triggering trade (pg_notify push, not polling). Delivered via WebSocket (`kol:coordination` channel, user-scoped) and/or HMAC-signed webhook. PRO=5 rules, ULTRA=20.

```ts
const res = await agent.methods.coordinationAlertsCreate(agent, {
  name: "fresh pump cluster",
  min_kols: 4,
  window_minutes: 15,     // peak-density window (1-60)
  min_score: 70,          // 0-100 composite score cutoff
  include_majors: false,  // filter WIF/BONK/POPCAT
  cooldown_min: 60,
  score_jump_break: 10,
  delivery_mode: "both",
  webhook_url: "https://you.com/hooks/coord",
});
// store res.webhook_secret — shown ONCE

await agent.methods.coordinationAlertsList(agent);
await agent.methods.coordinationAlertsGet(agent, { rule_id: "uuid..." });
await agent.methods.coordinationAlertsUpdate(agent, { rule_id: "uuid...", updates: { is_active: false } });
await agent.methods.coordinationAlertsDelete(agent, { rule_id: "uuid..." });
```

The v1.1 `kolCoordination()` response also includes `peak_kols`, `peak_buys`, `exited_count`, and `coordination_score` (0-100). Pass `{ min_score, window_minutes, include_majors }` to filter.

### KOL First-Touch Signal *(new in 1.3)*

Every "first KOL buy on a token mint" event — when a tracked KOL is the first of the cohort to touch a token. Filterable by **scout tier** (S/A/B/C from `mv_kol_scout_score`), KOL winrate, token age, mint suffix.

**Backtest:** S-tier scouts attract ≥3 follow-on KOLs within 4h ~50% of the time vs ~14% baseline (38d / 491k buys / 72,549 events). Public leaderboard at [madeonsol.com/kol/scouts](https://madeonsol.com/kol/scouts).

```ts
// REST query — also exposed as MADEONSOL_KOL_FIRST_TOUCHES_ACTION for the agent
const { events } = await agent.methods.kolFirstTouches(agent, {
  preset: "scout",
  min_scout_tier: "S",
  limit: 20,
});

// Webhook subscription (Ultra only) — push delivery, HMAC-signed
const res = await agent.methods.firstTouchSubscriptionsCreate(agent, {
  name: "S-tier scouts on pump tokens",
  filters: { min_scout_tier: "S", mint_suffix: "pump" },
  delivery_mode: "webhook",
  webhook_url: "https://you.com/hooks/scout",
});
// store res.webhook_secret — shown ONCE

await agent.methods.firstTouchSubscriptionsList(agent);
await agent.methods.firstTouchSubscriptionsGet(agent, { subscription_id: "uuid..." });
await agent.methods.firstTouchSubscriptionsUpdate(agent, { subscription_id: "uuid...", updates: { is_active: false } });
await agent.methods.firstTouchSubscriptionsDelete(agent, { subscription_id: "uuid..." });
```

ULTRA only for subscriptions — up to 10 active per user.

> **Don't poll — push.** Median lead time before the second KOL is 12 seconds. WebSocket channel: `kol:first_touches` (PRO+).

### Price Alerts *(new in 1.9)*

CRUD for token dip/recovery price alerts. Fires when a token's market cap crosses your threshold. PRO=5 rules, ULTRA=25.

```ts
const { alert, webhook_secret } = await agent.methods.priceAlertsCreate(agent, {
  name: "SOL dip buy",
  token_mint: "So11111111111111111111111111111111111111112",
  condition: "below",
  threshold_mc_usd: 5_000_000_000,
  cooldown_min: 120,
  delivery_mode: "both",
  webhook_url: "https://you.com/hooks/price",
});
// store webhook_secret — shown ONCE

await agent.methods.priceAlertsList(agent);
await agent.methods.priceAlertsGet(agent, { alert_id: "uuid..." });
await agent.methods.priceAlertsUpdate(agent, { alert_id: "uuid...", updates: { is_active: false } });
await agent.methods.priceAlertsDelete(agent, { alert_id: "uuid..." });
```

Also exposed as `MADEONSOL_PRICE_ALERTS_LIST_ACTION` ("my price alerts") and `MADEONSOL_PRICE_ALERTS_CREATE_ACTION` ("alert me when token dips below").

### Scout Leaderboard & KOL Consensus *(new in 1.9)*

| Method / Action | Description |
|---|---|
| `agent.methods.scoutLeaderboard(agent, params)` | Top scout-tier KOLs ranked by first-touch follow-on rate, win rate, and ROI (PRO+) |
| `agent.methods.kolConsensus(agent, params)` | Tokens with the strongest KOL agreement signal (PRO+) |
| `agent.methods.peakHistory(agent, { mint })` | Historical peak-density windows for a token (PRO+) |
| `agent.methods.coordinationHistory(agent, params)` | Global coordination event log (PRO+) |

```ts
const { leaderboard } = await agent.methods.scoutLeaderboard(agent, { period: "30d", limit: 25 });
const { tokens } = await agent.methods.kolConsensus(agent, { min_kols: 5, period: "24h" });
```

Also exposed as `MADEONSOL_SCOUT_LEADERBOARD_ACTION` and `MADEONSOL_KOL_CONSENSUS_ACTION`.

### Wallet Derived Stats *(new in 1.9)*

`walletStats` now returns a `stats` object with derived fields: `win_rate` (0-1), `roi`, `verdict` ("strong" | "profitable" | "neutral" | "losing"), and `biggest_miss` (token with the highest post-exit gain the wallet missed).

```ts
const { stats } = await agent.methods.walletStats(agent, { address: "WALLET_ADDRESS" });
// stats.win_rate, stats.roi, stats.verdict, stats.biggest_miss
```

### Rate-limit headers

Every successful request populates a module-level `lastRateLimit` (limit / remaining / reset / requestId):

```ts
import { lastRateLimit } from "solana-agent-kit-plugin-madeonsol";
await agent.methods.kolFeed(agent, { limit: 10 });
console.log(lastRateLimit); // { limit: "10000", remaining: "9999", reset: "...", requestId: "..." }
```

## Tiers

| Tier | Price | Wallets tracked | Requests/day |
|------|-------|-----------------|--------------|
| BASIC (free) | $0 | 10 | 200 |
| PRO | €43/mo (€430/yr) ≈ $49 | 50 | 10,000 |
| ULTRA | €131/mo (€1310/yr) ≈ $149 | 100 + WS events | 100,000 |

Free tier returns the full REST response shape on every endpoint — real wallets, TX signatures, full precision. Paid tiers unlock webhooks, WebSockets, rule engines, and ULTRA-only data depth. Get a key at [madeonsol.com/pricing](https://madeonsol.com/pricing).

## Also Available

| Platform | Package |
|---|---|
| TypeScript SDK | [`madeonsol`](https://www.npmjs.com/package/madeonsol) on npm |
| Rust SDK | [`madeonsol`](https://crates.io/crates/madeonsol) on crates.io |
| Python (LangChain, CrewAI) | [`madeonsol-x402`](https://pypi.org/project/madeonsol-x402/) on PyPI |
| MCP Server (Claude, Cursor) | [`mcp-server-madeonsol`](https://www.npmjs.com/package/mcp-server-madeonsol) · [Smithery](https://smithery.ai/servers/madeonsol/solana-kol-intelligence) · [Glama](https://glama.ai/mcp/servers/madeonsol/mcp-server-madeonsol) |
| ElizaOS | [`@madeonsol/plugin-madeonsol`](https://www.npmjs.com/package/@madeonsol/plugin-madeonsol) |

## License

MIT
