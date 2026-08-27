/**
 * Tool functions — pure logic that calls MadeOnSol API.
 * Auth priority: MADEONSOL_API_KEY > SVM_PRIVATE_KEY (x402).
 *
 * v1.0 breaking change: RAPIDAPI_KEY support has been removed
 * (MadeOnSol RapidAPI marketplace was retired 2026-04-19).
 * Get a free `msk_` key at https://madeonsol.com/pricing.
 */
type Agent = any;
export interface RateLimitInfo {
    limit?: string;
    remaining?: string;
    reset?: string;
    requestId?: string;
}
/** Most recent rate-limit headers, populated by every successful API request. */
export declare let lastRateLimit: RateLimitInfo;
export declare function initAuth(agent: Agent): Promise<void>;
/** @deprecated Use initAuth instead */
export declare function initPaidFetch(agent: Agent): Promise<typeof fetch>;
export declare function kolFeed(agent: Agent, params?: {
    limit?: number;
    before?: string;
    action?: string;
    kol?: string;
    min_sol?: number;
    token_age_max_min?: number;
    exclude_sells?: boolean;
    min_kol_winrate?: number;
    strategy?: string;
}): Promise<any>;
export declare function kolCoordination(agent: Agent, params?: {
    period?: string;
    min_kols?: number;
    limit?: number;
    min_avg_winrate?: number;
    unique_strategies?: number;
    /** v1.1 — include WIF/BONK/POPCAT etc. Default false. */
    include_majors?: boolean;
    /** v1.1 — peak-density window in minutes (1-60, default 15). */
    window_minutes?: number;
    /** v1.1 — minimum composite coordination_score (0-100). */
    min_score?: number;
}): Promise<any>;
export declare function kolLeaderboard(agent: Agent, params?: {
    period?: string;
    limit?: number;
}): Promise<any>;
/**
 * Get Pump.fun deployer alerts with KOL buy enrichment.
 * The `tier` filter (elite/good/moderate/rising/cold) is PRO/ULTRA only —
 * BASIC callers passing it receive HTTP 403.
 */
export declare function deployerAlerts(agent: Agent, params?: {
    limit?: number;
    since?: string;
    before?: string;
    offset?: number;
    tier?: "elite" | "good" | "moderate" | "rising" | "cold";
    alert_type?: string;
    priority?: "high" | "medium" | "low";
    min_kol_buys?: number;
}): Promise<any>;
export declare function kolPairs(agent: Agent, params?: {
    period?: string;
    min_shared?: number;
    limit?: number;
}): Promise<any>;
export declare function kolHotTokens(agent: Agent, params?: {
    period?: string;
    min_kols?: number;
    limit?: number;
}): Promise<any>;
export declare function kolTrendingTokens(agent: Agent, params?: {
    period?: string;
    min_kols?: number;
    limit?: number;
}): Promise<any>;
export declare function kolTokenEntryOrder(agent: Agent, params: {
    mint: string;
    limit?: number;
}): Promise<any>;
export declare function kolCompare(agent: Agent, params: {
    wallets: string[];
}): Promise<any>;
export declare function kolAlertsRecent(agent: Agent, params?: {
    window?: string;
    types?: string[];
    min_severity?: string;
    limit?: number;
}): Promise<any>;
export declare function kolPnl(agent: Agent, params: {
    wallet: string;
    period?: string;
}): Promise<any>;
export declare function kolTiming(agent: Agent, params: {
    wallet: string;
    period?: string;
}): Promise<any>;
export declare function deployerTrajectory(agent: Agent, params: {
    wallet: string;
}): Promise<any>;
/**
 * A deployer's daily reputation time-series — backtest "was this deployer elite when it launched token X?"
 * without look-ahead bias. Returns `{ is_deployer, wallet, snapshots[] }` where each snapshot has
 * `date`, `tier`, `is_tracked`, `total_deployed`, `total_bonded`, `bonding_rate`, `recent_bond_rate`,
 * `avg_peak_mc`, `best_token_peak_mc`. `limit` is days of history (1..365, default 90). PRO/ULTRA only.
 */
export declare function deployerHistory(agent: Agent, params: {
    wallet: string;
    limit?: number;
}): Promise<any>;
/** Chain-wide deployer stats — tracked count, bonds detected, bond rate, tier counts. */
export declare function deployerStats(agent: Agent): Promise<any>;
/**
 * Deployer reputation leaderboard, excluding unranked deployers. Compare
 * `bonding_rate` (lifetime) against `recent_bond_rate` (rolling): a deployer at
 * 0.40 lifetime and 0.05 recent is cooling off.
 */
export declare function deployerLeaderboard(agent: Agent, params?: {
    tier?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}): Promise<any>;
/**
 * One deployer's profile. An UNTRACKED wallet returns zeroed counters, NOT a
 * 404 — check `total_deployed` before drawing a conclusion about a wallet.
 */
export declare function deployerProfile(agent: Agent, params: {
    wallet: string;
}): Promise<any>;
/** Every token one deployer launched, with time-to-bond and peak MC. */
export declare function deployerTokens(agent: Agent, params: {
    wallet: string;
    limit?: number;
    offset?: number;
    only_bonded?: boolean;
}): Promise<any>;
/** Alert volume plus per-tier bond-rate and MC-multiplier distributions. */
export declare function deployerAlertStats(agent: Agent, params?: {
    period?: string;
}): Promise<any>;
/** Best recent tokens from ranked (non-unranked) deployers, by peak MC multiple. */
export declare function deployerBestTokens(agent: Agent, params?: {
    period?: string;
    limit?: number;
}): Promise<any>;
/**
 * Fresh graduations from tracked deployers. Poll incrementally: pass the
 * previous response's `next_since` back as `since`.
 */
export declare function deployerRecentBonds(agent: Agent, params?: {
    limit?: number;
    since?: string;
    tier?: string;
    peak_mc_min?: number;
}): Promise<any>;
export declare function createWebhook(agent: Agent, params: {
    url: string;
    events: string[];
    filters?: Record<string, unknown>;
}): Promise<any>;
export declare function listWebhooks(agent: Agent): Promise<any>;
export declare function deleteWebhook(agent: Agent, params: {
    id: number;
}): Promise<any>;
export declare function testWebhook(agent: Agent, params: {
    webhook_id: number;
}): Promise<any>;
/**
 * Issue your WebSocket streaming token. Stream tokens never expire (since
 * 2026-08-27): every call returns the same token until your subscription lapses
 * or you pass `{ rotate: true }`, which replaces it (the previous value keeps
 * working for 60 s). `expires_at` / `next_refresh_at` are always `null`; the
 * response also carries `rotated` (boolean) and `lifetime` (string). A `4001`
 * close means "mint again", never a timer. Authenticate the handshake with
 * `Authorization: Bearer <token>`.
 */
export declare function getStreamToken(agent: Agent, params?: {
    rotate?: boolean;
}): Promise<any>;
/**
 * List your live WebSocket streaming sessions across ws-streaming and dex-stream.
 * Returns `{ sessions, count }`; each session has `id`, `service`, `tier`, `channels[]`,
 * `connected_at`, `remote_ip`, and `messages_sent`. PRO/ULTRA only.
 */
export declare function streamSessions(agent: Agent): Promise<any>;
/**
 * Evict (kill) a live WebSocket streaming session by id. Returns `{ evicted: true, id }`;
 * 404 if no such session, 400 if `id` is not a positive integer. PRO/ULTRA only.
 */
export declare function streamSessionKill(agent: Agent, params: {
    id: string | number;
}): Promise<any>;
export declare function walletTrackerWatchlist(agent: Agent): Promise<any>;
export declare function walletTrackerAdd(agent: Agent, params: {
    wallet_address: string;
    label?: string;
}): Promise<any>;
export declare function walletTrackerRemove(agent: Agent, params: {
    wallet_address: string;
}): Promise<any>;
export declare function walletTrackerTrades(agent: Agent, params?: {
    wallet?: string;
    action?: string;
    event_type?: string;
    limit?: number;
    before?: number;
}): Promise<any>;
export declare function walletTrackerSummary(agent: Agent, params?: {
    period?: string;
    wallet?: string;
}): Promise<any>;
export declare function walletStats(agent: Agent, params: {
    address: string;
}): Promise<any>;
export declare function walletPnl(agent: Agent, params: {
    address: string;
}): Promise<any>;
export declare function walletPositions(agent: Agent, params: {
    address: string;
}): Promise<any>;
/**
 * Verified CURRENT on-chain holdings for any wallet — the wallet's actual SPL + Token-2022 token
 * accounts and SOL balance read straight from chain, enriched with price/MC/name/symbol, plus
 * `transfer_delta` (on-chain amount − trade-derived net position, exposing non-swap flows like
 * airdrops, insider funding, wallet-hopping). Distinct from `walletPositions` (trade-derived FIFO):
 * holdings = what the wallet actually holds right now. `limit` 1–500 (default 200); `min_value_usd`
 * ≥0 (default 0). ULTRA only.
 */
export declare function walletHoldings(agent: Agent, params: {
    address: string;
    limit?: number;
    min_value_usd?: number;
}): Promise<any>;
export declare function walletTrades(agent: Agent, params: {
    address: string;
    limit?: number;
    cursor?: string;
    action?: "buy" | "sell";
    token_mint?: string;
    since?: number;
    until?: number;
}): Promise<any>;
/**
 * Bulk wallet reputation flags for 1–100 addresses in one request (POST /wallet/batch/classify).
 * Each entry matches the `flags` block of walletStats(): `is_sniper`, `is_bundler` (lifetime flag),
 * `is_dumper` (rolling 42-day window), `is_kol` + `kol_name`, `bot_confidence` (STRING enum
 * "none"/"low"/"medium"/"high" | null — never a number), and `dump_cluster` cohort stats
 * ({ dump_cohorts, runner_cohorts, total_cohorts, as_of } | null). Flags are pump.fun-pipeline
 * scoped — `false` means "not observed", NOT verified clean. PRO/ULTRA only.
 */
export declare function walletClassify(agent: Agent, params: {
    wallets: string[];
}): Promise<any>;
export declare function alphaLeaderboard(agent: Agent, params?: {
    limit?: number;
    min_tokens?: number;
    min_pnl?: number;
}): Promise<any>;
export declare function alphaWallet(agent: Agent, params: {
    wallet: string;
}): Promise<any>;
export declare function alphaLinked(agent: Agent, params: {
    wallet: string;
}): Promise<any>;
export declare function tokenCapTable(agent: Agent, params: {
    mint: string;
}): Promise<any>;
export declare function tokenBuyerQuality(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/**
 * Transparent 0–100 rug-risk/safety score (higher = riskier) with band, explainable factors, and
 * raw inputs. Also returns a top-level `dev` block (deployer self-activity; null when the mint has
 * no deployer-pipeline row): create-tx self-buy snapshot (buy_sol/buy_tokens/buy_supply_pct),
 * post-create rollup (bought_tokens_after — catches the same-second-separate-tx dev buy —
 * sold_tokens, sold_sol, first_sell_at/last_sell_at), LIVE on-chain holdings (holdings_tokens,
 * holdings_supply_pct — pump.fun 1B denominator, null elsewhere — wallet_empty: is the dev wallet
 * empty NOW), and transferred_out (tokens left without a sell; null = unknown, never a guess),
 * plus as_of. PRO/ULTRA only.
 */
export declare function tokenRisk(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/** Bundle-cohort holdings: which same-slot "bundle" wallets bought a token and how much of supply they STILL hold (held_pct_of_supply headline rug/insider signal). BASIC=bundle block only; PRO=top-10 flags; ULTRA=full + identity. PRO/ULTRA only. */
export declare function tokenBundle(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/** Per-venue liquidity map: every DEX pool a token trades in (live vs parked), plus fragmentation + top-pool share. Returns `pools[]` ({ pool_address, dex, quote_mint, liquidity_usd, last_price_sol, last_swap_at, amm_id, is_active }) and a `summary` ({ pool_count, active_pool_count, dex_count, dexes, total_liquidity_usd, primary_pool, primary_dex, top_pool_share_pct }). PRO/ULTRA only. */
export declare function tokenPools(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/**
 * Per-pool price-impact / slippage for a token (GET /tokens/{mint}/depth) — "how much SOL moves
 * this token's price N%" and the impact of each buy size, per pool (NOT router-optimal). Each
 * computable pool carries spot_price_sol, fee_pct, a quotes[] entry per requested SOL size
 * (size_sol, tokens_out, avg_price_sol, price_impact_pct), and to_move_price (SOL to move price
 * 1%/5%/10%). Constant-product pools are served from stream reserves (source="stream", with
 * reserves_age_ms); pump.fun/bonk curves from a LIVE read of the curve's virtual reserves
 * (source="live_rpc"). Pools we can't price honestly (CLMM/Orca/DLMM, Meteora-DBC, unclassified)
 * land in unsupported_pools[] with a `reason` instead of a wrong number; found=false means no
 * pools tracked. `sizes` — up to 8 SOL buy sizes (each >0 and ≤10000; default [0.5, 1, 5, 10]),
 * sent as a CSV query param. PRO/ULTRA only.
 */
export declare function tokenDepth(agent: Agent, params: {
    mint: string;
    sizes?: number[];
}): Promise<any>;
/**
 * Live holder census + concentration for a token (GET /tokens/{mint}/holders) — who holds NOW
 * (tokenCapTable = who bought first). Read live from the ledger at confirmed: every token
 * account of the mint (mint-scoped getProgramAccounts), merged per owner. `concentration.holder_count`
 * is EXACT (distinct non-zero owners minus excluded pools/curves/burns) and null ONLY when the
 * provider refuses the census for a mega-cap (then source.method="getTokenLargestAccounts",
 * source.census_fallback_reason is set, top-20 view only) — never estimated from trades. Each
 * disclosed owner carries labels[] (deployer / kol / early_buyer / buyer / bundle / bot /
 * dump_cluster; empty = unknown, NOT verified clean). Pools, bonding curves, vaults and burns are
 * EXCLUDED from the circulating denominator and NAMED in excluded[] (reason: pool + dex +
 * pool_address | bonding_curve | burn | program_account). amount_raw / supply_raw /
 * circulating_raw are raw u64 STRINGS. Disclosure PRO 1–10, ULTRA 1–50, BUSINESS 1–100; the
 * maths is tier-independent. Big established tokens may first throw HTTP 503
 * `holder_scan_in_progress` (retry_after_seconds 20) — the scan continues and is cached, the
 * retry is instant. PRO/ULTRA only.
 */
export declare function tokenHolders(agent: Agent, params: {
    mint: string;
}): Promise<any>;
export type TokenLockProgram = "streamflow" | "jupiter_lock" | "bonfida_vesting";
export type TokenLockKind = "lock" | "vesting";
export type TokenLockStatus = "active" | "completed" | "cancelled" | "closed";
export interface TokenLocksParams {
    mint: string;
    /** Filter the list (summary always covers all rows). */
    status?: TokenLockStatus;
    program?: TokenLockProgram;
    /** 1–500, default 200. */
    limit?: number;
}
export interface TokenLocksFeedParams {
    /** ISO 8601 — only contracts created after this instant (pagination.next_since). */
    since?: string;
    /** ISO 8601 — page back (pagination.next_before). */
    before?: string;
    mint?: string;
    sender?: string;
    recipient?: string;
    program?: TokenLockProgram;
    kind?: TokenLockKind;
    status?: TokenLockStatus;
    /** Deposited amount ≥ (needs a known price; post-filter). */
    min_usd?: number;
    /** 0–100 (post-filter). */
    min_pct_of_supply?: number;
    /** "1" to include backfilled Jupiter Lock rows (estimated created_at); excluded by default. */
    include_estimated?: "1" | "0" | "true" | "false" | boolean;
    /** 1–100, default 50. */
    limit?: number;
}
export interface TokenUnlocksParams {
    within?: "1h" | "6h" | "24h" | "3d" | "7d" | "14d" | "30d" | "90d";
    mint?: string;
    program?: TokenLockProgram;
    kind?: TokenLockKind;
    /** Next-event amount ≥ (needs a known price). */
    min_usd?: number;
    min_pct_of_supply?: number;
    sort?: "soonest" | "largest_usd" | "largest_pct";
    /** 1–200, default 50. */
    limit?: number;
}
export interface TokenFeeClaimsParams {
    /** Comma list of event types (default: all except creator_claim). */
    type?: string;
    mint?: string;
    /** Payout / claim recipient wallet, or new creator. */
    recipient?: string;
    /** Transaction signer. */
    actor?: string;
    /** Raw platform id (2 = X). */
    social_platform?: number;
    /** Platform-native numeric user id. */
    social_user_id?: string;
    /** Amount floor in SOL. */
    min_sol?: number;
    since?: string;
    before?: string;
    /** 1–100, default 50. */
    limit?: number;
}
/**
 * Token locks & vesting on ONE mint (GET /tokens/{mint}/locks) — every Streamflow / Jupiter Lock /
 * Bonfida vesting contract decoded from the locker programs' account state, with the schedule
 * (start/cliff/end, period, per-period + cliff amounts), the terms (cancelable_by_sender = the
 * locker can pull it — funds are locked against the RECIPIENT, not the locker; cancelable_by_recipient,
 * transferable, can_topup) and a LIVE-derived view (locked_*, unlocked_*, withdrawn_*, claimable_*,
 * status active|completed|cancelled|closed, next_unlock {at, kind cliff|period|final|tranche, amount}),
 * plus a summary (lock_count exact, complete=false above 5000 contracts, active_count, by_program /
 * by_kind, distinct_lockers, locked / deposited totals raw+ui+usd+% of supply, unlocking_7d_* /
 * unlocking_30d_*, nearest next_unlock, active_cancelable_by_sender). Answers "did the team lock,
 * how much, until when, and can they pull it". Base-unit amounts are digit STRINGS; ui/usd/pct
 * null when decimals or price are unknown (token.facts_resolved). status/program filter the list
 * only. LP LOCKS ARE NOT INCLUDED (token/vesting locks only). PRO/ULTRA only, keyed API only.
 */
export declare function tokenLocks(agent: Agent, params: TokenLocksParams): Promise<any>;
/**
 * Cross-token feed of NEW lock / vesting contracts (GET /tokens/locks), newest first — who just
 * locked tokens, of what mint, how much, until when — from Streamflow, Jupiter Lock and Bonfida.
 * Same row shape as tokenLocks + token {symbol, name, decimals, price_usd, market_cap_usd}. Poll with
 * since (cursor pagination.next_since), page back with before, or subscribe to WS channel
 * `token:locks` (event `token:lock`) for a push the moment the contract lands. Filters mint, sender,
 * recipient, program, kind, status, min_usd, min_pct_of_supply (last three post-filter, ×4
 * over-fetch), include_estimated="1" to include backfilled Jupiter Lock rows with an estimated
 * created_at. Base-unit amounts are digit STRINGS. LP locks NOT included. PRO/ULTRA only, keyed API only.
 */
export declare function tokenLocksFeed(agent: Agent, params?: TokenLocksFeedParams): Promise<any>;
/**
 * Upcoming unlock EVENTS (GET /tokens/unlocks) across all active lock / vesting contracts inside
 * `within` (1h|6h|24h|3d|7d|14d|30d|90d, default 7d) — cliffs, periodic releases (hourly or coarser)
 * and final unlocks: which tokens have locked supply hitting the market, how much, from whose lock.
 * One entry per active contract = its NEXT event in the window (unlock_at, in_seconds, event
 * cliff|period|final|tranche, amount_raw/amount/amount_usd/amount_pct_of_supply) plus
 * window_amount_* = that contract's TOTAL release over the whole window, mint, token, and lock (a
 * subset of the tokenLocks row incl. cancelable_by_sender). Continuous per-second streams contribute
 * only cliff/final events. sort soonest (default) | largest_usd | largest_pct; filters mint, program,
 * kind, min_usd, min_pct_of_supply. Response { window {within, from, to}, unlocks[], pagination
 * {limit, count, total_in_window, has_more} }. Base-unit amounts are digit STRINGS; usd null when
 * price unknown or phantom (implied MC > $100B). LP locks NOT included. PRO/ULTRA only, keyed API only.
 */
export declare function tokenUnlocks(agent: Agent, params?: TokenUnlocksParams): Promise<any>;
/**
 * pump.fun creator-fee sharing on ONE coin (GET /tokens/{mint}/fee-shares) — the on-chain
 * SharingConfig (pump_fees PDA ["sharing-config", mint]): admin, status, shareholders[] with
 * share_bps / share_pct, is_admin (normally the coin creator), is_social_pda (fees earmarked for a
 * platform identity — social.platform 2 = X, social.user_id = the platform-native NUMERIC id, not the
 * handle; lifetime_claimed_*), per-recipient received_* / payout_count; redirected_bps (share going
 * to non-admin addresses), social_bps, is_default:true = 100% to the creator (a real answer, not "no
 * data"); source "stream" (our table — only non-default configs are stored) or "chain" (live PDA
 * read; config null + config_error only if every RPC endpoint failed). Plus quote {symbol, decimals,
 * sol_usd}, distributions {count, total_*, last_at, recipients[], past_recipients[] (no longer in the
 * split), payouts_considered, payouts_truncated}, history[] (config created / updated / reset,
 * creator transferred — newest first), recent_distributions[]. Amounts are quote base units (SOL
 * lamports unless a stable-quoted coin) as digit STRINGS. EVENT HISTORY STARTS 2026-08-17.
 * PRO/ULTRA only, keyed API only.
 */
export declare function tokenFeeShares(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/**
 * pump.fun fee-event feed (GET /tokens/fee-claims), newest first, across all coins: type =
 * distribution (creator fees paid pro-rata to the SharingConfig shareholders — fees redirected to
 * others — with payouts[] {address, share_bps, amount_raw, amount, amount_usd}) | social_claim (fees
 * for a platform identity — platform 2 = X — claimed to a recipient wallet; mint NULL) |
 * shares_created / shares_updated / shares_reset (config changes, shareholders[]) |
 * creator_transferred (recipient = new creator) | creator_claim (plain creator vault claim — per
 * creator, NO mint; EXCLUDED unless requested via type). Each event: id, type, at, tx_signature,
 * slot, mint, admin, actor (signer), recipient, amount_raw (quote base units as a digit STRING),
 * amount, amount_usd, quote, social {platform, platform_label, user_id, pda}, shareholders, payouts,
 * payload (full decoded Anchor event). Default 100%-to-creator configs and zero-amount distributions
 * are not stored. Poll with since (cursor pagination.next_since) or subscribe to WS channel
 * `token:fee_claims` (event `token:fee_claim`). Filters type (comma list), mint, recipient, actor,
 * social_platform, social_user_id, min_sol. HISTORY STARTS 2026-08-17. PRO/ULTRA only, keyed API only.
 */
export declare function tokenFeeClaims(agent: Agent, params?: TokenFeeClaimsParams): Promise<any>;
/** Historical OHLCV candles (1m/5m/15m/1h/4h/1d) aggregated from the trade firehose. PRO=OHLCV 30d; ULTRA=+net flow, liquidity delta, full history. PRO/ULTRA only. */
export declare function tokenCandles(agent: Agent, params: {
    mint: string;
    tf?: string;
    limit?: number;
    from?: string;
    to?: string;
}): Promise<any>;
/**
 * Net buy/sell flow for a token over a rolling window (`1h` default, or `24h`). Returns unique
 * wallet/buyer/seller counts, buy/sell trade counts, buy/sell/net SOL, and trades-per-wallet. PRO/ULTRA only.
 */
export declare function tokenFlow(agent: Agent, params: {
    mint: string;
    window?: "1h" | "24h";
}): Promise<any>;
/**
 * Mint-scoped trade tape — every captured trade for a token, cursor-paginated newest first
 * (GET /tokens/{mint}/trades). Each trade: tx_signature, wallet_address, action, sol_amount,
 * token_amount, price_sol/price_usd (THIS trade's executed price = sol_amount / token_amount —
 * the trader's all-in rate incl. swap fee and any account rent, not the pool mid),
 * market_price_sol/market_price_usd (the canonical pool price near that slot, shared by every
 * trade in it), early_buyer_rank, slot, block_time, traded_at. Filter by
 * `action`, `wallet`, `since`/`until` (unix sec); unlike walletTrades (90d default) the default
 * window is the FULL history. Coverage honesty: the tape starts 2026-04-12 and is
 * pump.fun-pipeline scoped — see the response `coverage` block (history_start, scope). PRO/ULTRA only.
 */
export declare function tokenTrades(agent: Agent, params: {
    mint: string;
    limit?: number;
    cursor?: string;
    action?: "buy" | "sell";
    wallet?: string;
    since?: number;
    until?: number;
}): Promise<any>;
/** Bulk buyer-quality scoring for up to 50 mints. Shares the 5-min LRU cache with the single-mint endpoint. */
export declare function tokenBuyerQualityBatch(agent: Agent, params: {
    mints: string[];
}): Promise<any>;
/**
 * Bulk rug-risk/safety scoring for 1–50 mints — same per-mint shape as tokenRisk() plus an `as_of` ISO string.
 * Returns `{ tokens, count }` where `tokens` preserves de-duplicated input order; untracked mints come back as
 * `{ mint, error: "not_tracked" }` and do NOT fail the batch. Counts as one request against quota. PRO/ULTRA only.
 */
export declare function tokenRiskBatch(agent: Agent, params: {
    mints: string[];
}): Promise<any>;
/** Comprehensive per-mint snapshot: price, MC, 24h volume, deployer reputation, KOL activity, age, blacklist status. */
export declare function tokenGet(agent: Agent, params: {
    mint: string;
}): Promise<any>;
/** Bulk token snapshot for up to 50 mints — same per-mint shape as tokenGet(). 10-20× cheaper than N sequential calls. */
export declare function tokenBatch(agent: Agent, params: {
    mints: string[];
}): Promise<any>;
export declare function copyTradeList(agent: Agent): Promise<any>;
export declare function copyTradeCreate(agent: Agent, params: {
    /** 1-50 wallets to copy trades from. */
    source_wallets: string[];
    /** Required. Fixed SOL amount, proportional multiplier, or percent of source — per sizing_mode. */
    sizing_amount: number;
    name?: string;
    min_trade_sol?: number;
    only_action?: "buy" | "sell" | "both";
    sizing_mode?: "fixed" | "proportional" | "percent_source";
    delivery_mode?: "webhook" | "websocket" | "both";
    webhook_url?: string;
    min_mc_usd?: number | null;
    max_mc_usd?: number | null;
}): Promise<any>;
export declare function copyTradeGet(agent: Agent, params: {
    rule_id: string;
}): Promise<any>;
export declare function copyTradeUpdate(agent: Agent, params: {
    rule_id: string;
    updates: Record<string, unknown>;
}): Promise<any>;
export declare function copyTradeDelete(agent: Agent, params: {
    rule_id: string;
}): Promise<any>;
export declare function coordinationAlertsList(agent: Agent): Promise<any>;
export declare function coordinationAlertsCreate(agent: Agent, params: {
    name?: string;
    min_kols?: number;
    window_minutes?: number;
    min_score?: number;
    include_majors?: boolean;
    cooldown_min?: number;
    score_jump_break?: number;
    delivery_mode?: "websocket" | "webhook" | "both";
    webhook_url?: string;
}): Promise<any>;
export declare function coordinationAlertsGet(agent: Agent, params: {
    rule_id: string;
}): Promise<any>;
export declare function coordinationAlertsUpdate(agent: Agent, params: {
    rule_id: string;
    updates: Record<string, unknown>;
}): Promise<any>;
export declare function coordinationAlertsDelete(agent: Agent, params: {
    rule_id: string;
}): Promise<any>;
export declare function kolFirstTouches(agent: Agent, params?: {
    since?: string;
    before?: string;
    limit?: number;
    kol?: string;
    min_kol_winrate_7d?: number;
    min_scout_tier?: "S" | "A" | "B" | "C";
    min_n_touches?: number;
    strategy?: "scalper" | "day_trader" | "swing_trader" | "hodler" | "mixed";
    token_age_max_min?: number;
    min_first_buy_sol?: number;
    mint_suffix?: string;
    preset?: "scout" | "fresh_launch";
    include?: string;
}): Promise<any>;
export declare function firstTouchSubscriptionsList(agent: Agent): Promise<any>;
export declare function firstTouchSubscriptionsCreate(agent: Agent, params: {
    name?: string;
    filters?: {
        kol?: string;
        mint_suffix?: string;
        min_first_buy_sol?: number;
        min_scout_tier?: "S" | "A" | "B" | "C";
        min_n_touches?: number;
    };
    delivery_mode?: "websocket" | "webhook" | "both";
    webhook_url?: string;
}): Promise<any>;
export declare function firstTouchSubscriptionsGet(agent: Agent, params: {
    subscription_id: string;
}): Promise<any>;
export declare function firstTouchSubscriptionsUpdate(agent: Agent, params: {
    subscription_id: string;
    updates: Record<string, unknown>;
}): Promise<any>;
export declare function firstTouchSubscriptionsDelete(agent: Agent, params: {
    subscription_id: string;
}): Promise<any>;
/** Inspect your MadeOnSol API account — tier, daily/burst quota state, remaining requests, and per-feature usage. */
export declare function me(agent: Agent): Promise<any>;
/**
 * Filtered, sortable token directory (PRO+).
 * Default `min_liq=2000` skips dust. Supports MC band, liquidity floor,
 * recent-activity window, primary DEX, authority flags, computed 1h volume floor,
 * MEV-share ceiling, MC change deltas.
 */
export declare function tokensList(agent: Agent, params?: {
    min_mc?: number;
    max_mc?: number;
    min_liq?: number;
    active_h?: number;
    primary_dex?: "pumpfun" | "pumpswap" | "raydium" | "meteora" | "orca" | "letsbonk" | "other";
    authority_revoked?: boolean;
    exclude_token2022?: boolean;
    min_lp_burnt_pct?: number;
    min_volume_1h_usd?: number;
    max_mev_share_pct?: number;
    mc_change_1h_min_pct?: number;
    mc_change_1h_max_pct?: number;
    /** v1.10 — minimum liquidity-to-MC ratio (0-1). */
    min_liq_mc_ratio?: number;
    /** v1.10 — maximum liquidity-to-MC ratio (0-1). */
    max_liq_mc_ratio?: number;
    /** v1.10 — filter by deployer tier. */
    deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
    sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc" | "mc_change_5m_desc" | "mc_change_1h_desc" | "volume_1h_desc" | "trending";
    limit?: number;
    offset?: number;
}): Promise<any>;
/**
 * Pre-bond pump.fun tokens approaching graduation, ranked by velocity
 * (Δprogress/min): "95% and accelerating" beats "92% stalled". Each token is
 * enriched with its deployer's reputation tier. `progress_pct` is from on-chain
 * real_token_reserves; `velocity_pct_per_min` is null until a 5m snapshot exists;
 * `eta_minutes` is a linear projection. PRO/ULTRA only.
 */
export declare function almostBonded(agent: Agent, params?: {
    min_progress?: number;
    max_progress?: number;
    min_velocity_pct_per_min?: number;
    max_age_minutes?: number;
    deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
    authority_revoked?: boolean;
    min_liq?: number;
    sort?: "velocity_desc" | "progress_desc" | "eta_asc";
    limit?: number;
}): Promise<any>;
export declare function copyTradeSignals(agent: Agent, params?: {
    rule_id?: string;
    limit?: number;
    since?: string;
}): Promise<any>;
export declare function priceAlertsList(agent: Agent): Promise<any>;
export declare function priceAlertsCreate(agent: Agent, params: {
    token_mint: string;
    drop_pct: number;
    recovery_pct?: number;
    name?: string;
    delivery_mode?: "webhook" | "websocket" | "both";
    webhook_url?: string;
}): Promise<any>;
export declare function priceAlertsGet(agent: Agent, params: {
    id: number;
}): Promise<any>;
export declare function priceAlertsUpdate(agent: Agent, params: {
    id: number;
    updates: Record<string, unknown>;
}): Promise<any>;
export declare function priceAlertsDelete(agent: Agent, params: {
    id: number;
}): Promise<any>;
export declare function priceAlertsEvents(agent: Agent, params?: {
    alert_id?: number;
    event_type?: "dip" | "recovery";
    since?: string;
    limit?: number;
}): Promise<any>;
export declare function scoutLeaderboard(agent: Agent, params?: {
    limit?: number;
    scout_tier?: "S" | "A" | "B" | "C";
    sort?: string;
}): Promise<any>;
export declare function coordinationHistory(agent: Agent, params?: {
    limit?: number;
    since?: string;
    min_score?: number;
}): Promise<any>;
export declare function kolConsensus(agent: Agent, params: {
    mint: string;
}): Promise<any>;
export declare function peakHistory(agent: Agent, params: {
    mint: string;
}): Promise<any>;
export {};
