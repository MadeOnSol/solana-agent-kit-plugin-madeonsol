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
export declare function getStreamToken(agent: Agent): Promise<any>;
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
 * token_amount, price_sol/price_usd, early_buyer_rank, slot, block_time, traded_at. Filter by
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
