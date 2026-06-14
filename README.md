# solana-agent-kit-plugin-madeonsol

[![npm version](https://img.shields.io/npm/v/solana-agent-kit-plugin-madeonsol?style=flat-square)](https://www.npmjs.com/package/solana-agent-kit-plugin-madeonsol)
[![npm downloads](https://img.shields.io/npm/dm/solana-agent-kit-plugin-madeonsol?style=flat-square)](https://www.npmjs.com/package/solana-agent-kit-plugin-madeonsol)
[![SAK](https://img.shields.io/badge/Solana%20Agent%20Kit-plugin-blueviolet?style=flat-square)](https://github.com/sendaifun/solana-agent-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

> 📚 **[API docs](https://madeonsol.com/api-docs)** · 💰 **[Free API key](https://madeonsol.com/pricing)** · 🤖 **[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit)**

[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit) plugin for [MadeOnSol](https://madeonsol.com) — Solana KOL intelligence, deployer analytics, and wallet tracking.

> Real-time Solana trading intelligence: track 1,069 KOL wallets with <3s latency, score 23,000+ Pump.fun deployers, surface deshred deploy signals ~500ms before on-chain confirmation, detect multi-KOL coordination, and stream every DEX trade. Free tier: 200 requests/day at [madeonsol.com/pricing](https://madeonsol.com/pricing) — no credit card required.

> **New in 1.10.0** — `tokensList()` gains three new filter params: `min_liq_mc_ratio`, `max_liq_mc_ratio`, and `deployer_tier`. Response items now include `liquidity_to_mc_ratio` and `deployer_tier`. KOL leaderboard entries now include `median_hold_minutes_30d` and `percentile_early_entry_30d`. Token endpoints now return `liquidity_to_mc_ratio`, `launch_cohort_sol`, and `launch_cohort_size`.

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
| `MADEONSOL_TOKENS_LIST_ACTION` | "filter tokens", "tokens by market cap", "scan tokens" — filtered/sortable token directory, PRO+ (new in 1.7) |
| `MADEONSOL_WALLET_STATS_ACTION` | **New 1.8** · "wallet stats", "wallet info", "check wallet" — aggregate 90d stats + cross-product flags (KOL/alpha/deployer) for any Solana wallet (PRO+) |
| `MADEONSOL_WALLET_PNL_ACTION` | **New 1.8** · "wallet pnl", "wallet profit", "wallet performance" — FIFO cost-basis PnL with profit factor, drawdown, daily curve, closed + open positions (PRO+) |
| `MADEONSOL_WALLET_POSITIONS_ACTION` | **New 1.8** · "wallet positions", "wallet bags", "open positions" — open lots with live unrealized SOL (PRO+) |
| `MADEONSOL_WALLET_TRADES_ACTION` | **New 1.8** · "wallet trades", "wallet history" — cursor-paginated raw trades with filters (PRO+) |

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
```

### Copy-Trade Rules (PRO/ULTRA)

Server-side rules that fire signals when a watched source wallet trades. Delivered via webhook (HMAC-signed) and/or WebSocket.

```ts
await agent.methods.copyTradeList(agent);
await agent.methods.copyTradeCreate(agent, {
  name: "Track Whale",
  source_wallet: "WALLET",
  delivery: "webhook",
  webhook_url: "https://you.com/hook",
});
await agent.methods.copyTradeSignals(agent, { limit: 50 });             // up to 7 days
```

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
| PRO | $49/mo ($490/yr) | 50 | 10,000 |
| ULTRA | $149/mo ($1,490/yr) | 100 + WS events | 100,000 |

Free tier returns the full REST response shape on every endpoint — real wallets, TX signatures, full precision. Paid tiers unlock webhooks, WebSockets, rule engines, and ULTRA-only data depth. Get a key at [madeonsol.com/pricing](https://madeonsol.com/pricing).

## Also Available

| Platform | Package |
|---|---|
| TypeScript SDK | [`madeonsol`](https://www.npmjs.com/package/madeonsol) on npm |
| Rust SDK | [`madeonsol`](https://crates.io/crates/madeonsol) on crates.io |
| Python (LangChain, CrewAI) | [`madeonsol-x402`](https://pypi.org/project/madeonsol-x402/) on PyPI |
| MCP Server (Claude, Cursor) | [`mcp-server-madeonsol`](https://www.npmjs.com/package/mcp-server-madeonsol) · [Smithery](https://smithery.ai/servers/madeonsol/solana-kol-intelligence) · [Glama](https://glama.ai/mcp/servers/LamboPoewert/mcp-server-madeonsol) |
| ElizaOS | [`@madeonsol/plugin-madeonsol`](https://www.npmjs.com/package/@madeonsol/plugin-madeonsol) |

## License

MIT
