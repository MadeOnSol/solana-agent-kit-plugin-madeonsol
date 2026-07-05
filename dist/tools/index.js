/**
 * Tool functions — pure logic that calls MadeOnSol API.
 * Auth priority: MADEONSOL_API_KEY > SVM_PRIVATE_KEY (x402).
 *
 * v1.0 breaking change: RAPIDAPI_KEY support has been removed
 * (MadeOnSol RapidAPI marketplace was retired 2026-04-19).
 * Get a free `msk_` key at https://madeonsol.com/pricing.
 */
import { VERSION } from "../version.js";
const BASE_URL = "https://madeonsol.com";
let _authMode = null;
let _authHeaders = {};
let _paidFetch = null;
/** Most recent rate-limit headers, populated by every successful API request. */
export let lastRateLimit = {};
function captureRateLimit(res) {
    lastRateLimit = {
        limit: res.headers.get("X-RateLimit-Limit") ?? undefined,
        remaining: res.headers.get("X-RateLimit-Remaining") ?? undefined,
        reset: res.headers.get("X-RateLimit-Reset") ?? undefined,
        requestId: res.headers.get("X-Request-Id") ?? undefined,
    };
}
function getConfig(agent, key) {
    return agent.config?.[key] || agent.config?.OTHER_API_KEYS?.[key];
}
export async function initAuth(agent) {
    if (_authMode)
        return;
    const apiKey = getConfig(agent, "MADEONSOL_API_KEY");
    const privateKey = getConfig(agent, "SVM_PRIVATE_KEY");
    if (apiKey) {
        _authMode = "madeonsol";
        _authHeaders = { Authorization: `Bearer ${apiKey}`, "User-Agent": `solana-agent-kit-plugin-madeonsol/${VERSION}` };
        _paidFetch = fetch;
        console.log("[madeonsol] Using MadeOnSol API key (Bearer auth)");
    }
    else if (privateKey) {
        const { wrapFetchWithPayment } = await import("@x402/fetch");
        const { x402Client } = await import("@x402/core/client");
        const { ExactSvmScheme } = await import("@x402/svm/exact/client");
        const { createKeyPairSignerFromBytes } = await import("@solana/kit");
        const { base58 } = await import("@scure/base");
        const signer = await createKeyPairSignerFromBytes(base58.decode(privateKey));
        const client = new x402Client();
        client.register("solana:*", new ExactSvmScheme(signer));
        _paidFetch = wrapFetchWithPayment(fetch, client);
        _authMode = "x402";
        console.log(`[madeonsol] x402 payments enabled, wallet: ${signer.address}`);
    }
    else {
        _authMode = "none";
        _paidFetch = fetch;
        console.warn("\n[madeonsol] No auth configured — every API call will fail.\n" +
            "  → Get a free MADEONSOL_API_KEY (200 req/day, no card) at https://madeonsol.com/pricing\n" +
            "  → Or set SVM_PRIVATE_KEY for x402 micropayments.\n");
    }
}
/** @deprecated Use initAuth instead */
export async function initPaidFetch(agent) {
    await initAuth(agent);
    return _paidFetch;
}
async function query(path, params) {
    const apiPath = _authMode === "x402" || _authMode === "none"
        ? path
        : path.replace("/api/x402/", "/api/v1/");
    const url = new URL(apiPath, BASE_URL);
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v !== undefined)
                url.searchParams.set(k, String(v));
        }
    }
    const res = _authMode === "x402"
        ? await _paidFetch(url.toString())
        : await fetch(url.toString(), { headers: _authHeaders });
    captureRateLimit(res);
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`MadeOnSol API error ${res.status}: ${body}`);
    }
    return res.json();
}
export async function kolFeed(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/kol/feed", params);
}
export async function kolCoordination(agent, params = {}) {
    await initAuth(agent);
    const { include_majors, ...rest } = params;
    const flat = { ...rest };
    if (include_majors !== undefined)
        flat.include_majors = include_majors ? "true" : "false";
    return query("/api/x402/kol/coordination", flat);
}
export async function kolLeaderboard(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/kol/leaderboard", params);
}
/**
 * Get Pump.fun deployer alerts with KOL buy enrichment.
 * The `tier` filter (elite/good/moderate/rising/cold) is PRO/ULTRA only —
 * BASIC callers passing it receive HTTP 403.
 */
export async function deployerAlerts(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/deployer-hunter/alerts", params);
}
export async function kolPairs(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/kol/pairs", params);
}
export async function kolHotTokens(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/kol/tokens/hot", params);
}
export async function kolTrendingTokens(agent, params = {}) {
    await initAuth(agent);
    return query("/api/x402/kol/tokens/trending", params);
}
export async function kolTokenEntryOrder(agent, params) {
    await initAuth(agent);
    const { mint, ...rest } = params;
    return query(`/api/x402/kol/tokens/${encodeURIComponent(mint)}/entry-order`, rest);
}
export async function kolCompare(agent, params) {
    await initAuth(agent);
    return query("/api/x402/kol/compare", { wallets: params.wallets.join(",") });
}
export async function kolAlertsRecent(agent, params = {}) {
    await initAuth(agent);
    const { types, ...rest } = params;
    const flat = { ...rest };
    if (types && types.length > 0)
        flat.types = types.join(",");
    return query("/api/x402/kol/alerts/recent", flat);
}
export async function kolPnl(agent, params) {
    const qs = params.period ? `?period=${params.period}` : "";
    return restQuery(agent, "GET", `/kol/${params.wallet}/pnl${qs}`);
}
export async function kolTiming(agent, params) {
    const qs = params.period ? `?period=${params.period}` : "";
    return restQuery(agent, "GET", `/kol/${params.wallet}/timing${qs}`);
}
export async function deployerTrajectory(agent, params) {
    return restQuery(agent, "GET", `/deployer-hunter/${params.wallet}/trajectory`);
}
/**
 * A deployer's daily reputation time-series — backtest "was this deployer elite when it launched token X?"
 * without look-ahead bias. Returns `{ is_deployer, wallet, snapshots[] }` where each snapshot has
 * `date`, `tier`, `is_tracked`, `total_deployed`, `total_bonded`, `bonding_rate`, `recent_bond_rate`,
 * `avg_peak_mc`, `best_token_peak_mc`. `limit` is days of history (1..365, default 90). PRO/ULTRA only.
 */
export async function deployerHistory(agent, params) {
    const qs = params.limit !== undefined ? `?limit=${params.limit}` : "";
    return restQuery(agent, "GET", `/deployer-hunter/${encodeURIComponent(params.wallet)}/history${qs}`);
}
// ── REST helper (webhooks, streaming, alpha, copy-trade, wallet-tracker) ──
async function restQuery(agent, method, path, body) {
    await initAuth(agent);
    if (_authMode !== "madeonsol") {
        throw new Error("MadeOnSol API key required for this endpoint. Get a free `msk_` key at madeonsol.com/pricing");
    }
    const res = await fetch(`${BASE_URL}/api/v1${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ..._authHeaders,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    captureRateLimit(res);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`MadeOnSol API error ${res.status}: ${text}`);
    }
    return res.json();
}
export async function createWebhook(agent, params) {
    return restQuery(agent, "POST", "/webhooks", params);
}
export async function listWebhooks(agent) {
    return restQuery(agent, "GET", "/webhooks");
}
export async function deleteWebhook(agent, params) {
    return restQuery(agent, "DELETE", `/webhooks/${params.id}`);
}
export async function testWebhook(agent, params) {
    return restQuery(agent, "POST", "/webhooks/test", params);
}
export async function getStreamToken(agent) {
    return restQuery(agent, "POST", "/stream/token");
}
/**
 * List your live WebSocket streaming sessions across ws-streaming and dex-stream.
 * Returns `{ sessions, count }`; each session has `id`, `service`, `tier`, `channels[]`,
 * `connected_at`, `remote_ip`, and `messages_sent`. PRO/ULTRA only.
 */
export async function streamSessions(agent) {
    return restQuery(agent, "GET", "/stream/sessions");
}
/**
 * Evict (kill) a live WebSocket streaming session by id. Returns `{ evicted: true, id }`;
 * 404 if no such session, 400 if `id` is not a positive integer. PRO/ULTRA only.
 */
export async function streamSessionKill(agent, params) {
    return restQuery(agent, "DELETE", `/stream/sessions/${encodeURIComponent(String(params.id))}`);
}
// ── Wallet Tracker ──
export async function walletTrackerWatchlist(agent) {
    return restQuery(agent, "GET", "/wallet-tracker/watchlist");
}
export async function walletTrackerAdd(agent, params) {
    return restQuery(agent, "POST", "/wallet-tracker/watchlist", params);
}
export async function walletTrackerRemove(agent, params) {
    return restQuery(agent, "DELETE", `/wallet-tracker/watchlist/${encodeURIComponent(params.wallet_address)}`);
}
export async function walletTrackerTrades(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/wallet-tracker/trades${query}`);
}
export async function walletTrackerSummary(agent, params = {}) {
    const qs = new URLSearchParams();
    if (params.period)
        qs.set("period", params.period);
    if (params.wallet)
        qs.set("wallet", params.wallet);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/wallet-tracker/summary${query}`);
}
// ── Universal Wallet Endpoints (PRO+, any wallet — not just curated KOLs) ──
export async function walletStats(agent, params) {
    return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}`);
}
export async function walletPnl(agent, params) {
    return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/pnl`);
}
export async function walletPositions(agent, params) {
    return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/positions`);
}
export async function walletTrades(agent, params) {
    const qs = new URLSearchParams();
    if (params.limit !== undefined)
        qs.set("limit", String(params.limit));
    if (params.cursor)
        qs.set("cursor", params.cursor);
    if (params.action)
        qs.set("action", params.action);
    if (params.token_mint)
        qs.set("token_mint", params.token_mint);
    if (params.since !== undefined)
        qs.set("since", String(params.since));
    if (params.until !== undefined)
        qs.set("until", String(params.until));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/trades${query}`);
}
// ── Alpha Wallet Intelligence ──
export async function alphaLeaderboard(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/alpha/leaderboard${query}`);
}
export async function alphaWallet(agent, params) {
    return restQuery(agent, "GET", `/alpha/${encodeURIComponent(params.wallet)}`);
}
export async function alphaLinked(agent, params) {
    return restQuery(agent, "GET", `/alpha/${encodeURIComponent(params.wallet)}/linked`);
}
// ── Token Quality ──
export async function tokenCapTable(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/cap-table`);
}
export async function tokenBuyerQuality(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/buyer-quality`);
}
/** Transparent 0–100 rug-risk/safety score (higher = riskier) with band, explainable factors, and raw inputs. PRO/ULTRA only. */
export async function tokenRisk(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/risk`);
}
/** Bundle-cohort holdings: which same-slot "bundle" wallets bought a token and how much of supply they STILL hold (held_pct_of_supply headline rug/insider signal). BASIC=bundle block only; PRO=top-10 flags; ULTRA=full + identity. PRO/ULTRA only. */
export async function tokenBundle(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/bundle`);
}
/** Per-venue liquidity map: every DEX pool a token trades in (live vs parked), plus fragmentation + top-pool share. Returns `pools[]` ({ pool_address, dex, quote_mint, liquidity_usd, last_price_sol, last_swap_at, amm_id, is_active }) and a `summary` ({ pool_count, active_pool_count, dex_count, dexes, total_liquidity_usd, primary_pool, primary_dex, top_pool_share_pct }). PRO/ULTRA only. */
export async function tokenPools(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/pools`);
}
/** Historical OHLCV candles (1m/5m/15m/1h/4h/1d) aggregated from the trade firehose. PRO=OHLCV 30d; ULTRA=+net flow, liquidity delta, full history. PRO/ULTRA only. */
export async function tokenCandles(agent, params) {
    const qs = new URLSearchParams();
    if (params.tf !== undefined)
        qs.set("tf", params.tf);
    if (params.limit !== undefined)
        qs.set("limit", String(params.limit));
    if (params.from !== undefined)
        qs.set("from", params.from);
    if (params.to !== undefined)
        qs.set("to", params.to);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/candles${query}`);
}
/**
 * Net buy/sell flow for a token over a rolling window (`1h` default, or `24h`). Returns unique
 * wallet/buyer/seller counts, buy/sell trade counts, buy/sell/net SOL, and trades-per-wallet. PRO/ULTRA only.
 */
export async function tokenFlow(agent, params) {
    const qs = params.window !== undefined ? `?window=${params.window}` : "";
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/flow${qs}`);
}
/** Bulk buyer-quality scoring for up to 50 mints. Shares the 5-min LRU cache with the single-mint endpoint. */
export async function tokenBuyerQualityBatch(agent, params) {
    return restQuery(agent, "POST", "/tokens/batch/buyer-quality", { mints: params.mints });
}
/**
 * Bulk rug-risk/safety scoring for 1–50 mints — same per-mint shape as tokenRisk() plus an `as_of` ISO string.
 * Returns `{ tokens, count }` where `tokens` preserves de-duplicated input order; untracked mints come back as
 * `{ mint, error: "not_tracked" }` and do NOT fail the batch. Counts as one request against quota. PRO/ULTRA only.
 */
export async function tokenRiskBatch(agent, params) {
    return restQuery(agent, "POST", "/tokens/batch/risk", { mints: params.mints });
}
// ── Token Intelligence (/token/{mint}) ──
/** Comprehensive per-mint snapshot: price, MC, 24h volume, deployer reputation, KOL activity, age, blacklist status. */
export async function tokenGet(agent, params) {
    return restQuery(agent, "GET", `/token/${encodeURIComponent(params.mint)}`);
}
/** Bulk token snapshot for up to 50 mints — same per-mint shape as tokenGet(). 10-20× cheaper than N sequential calls. */
export async function tokenBatch(agent, params) {
    return restQuery(agent, "POST", "/token/batch", { mints: params.mints });
}
// ── Copy-Trade Rules (PRO/ULTRA) ──
export async function copyTradeList(agent) {
    return restQuery(agent, "GET", "/copytrade/subscriptions");
}
export async function copyTradeCreate(agent, params) {
    return restQuery(agent, "POST", "/copytrade/subscriptions", params);
}
export async function copyTradeGet(agent, params) {
    return restQuery(agent, "GET", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`);
}
export async function copyTradeUpdate(agent, params) {
    return restQuery(agent, "PATCH", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`, params.updates);
}
export async function copyTradeDelete(agent, params) {
    return restQuery(agent, "DELETE", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`);
}
// ── Coordination Alerts (PRO/ULTRA, v1.1) ──
export async function coordinationAlertsList(agent) {
    return restQuery(agent, "GET", "/kol/coordination/alerts");
}
export async function coordinationAlertsCreate(agent, params) {
    return restQuery(agent, "POST", "/kol/coordination/alerts", params);
}
export async function coordinationAlertsGet(agent, params) {
    return restQuery(agent, "GET", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`);
}
export async function coordinationAlertsUpdate(agent, params) {
    return restQuery(agent, "PATCH", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`, params.updates);
}
export async function coordinationAlertsDelete(agent, params) {
    return restQuery(agent, "DELETE", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`);
}
// ── First-Touch Signal ──
export async function kolFirstTouches(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/kol/first-touches${query}`);
}
export async function firstTouchSubscriptionsList(agent) {
    return restQuery(agent, "GET", "/kol/first-touches/subscriptions");
}
export async function firstTouchSubscriptionsCreate(agent, params) {
    return restQuery(agent, "POST", "/kol/first-touches/subscriptions", params);
}
export async function firstTouchSubscriptionsGet(agent, params) {
    return restQuery(agent, "GET", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`);
}
export async function firstTouchSubscriptionsUpdate(agent, params) {
    return restQuery(agent, "PATCH", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`, params.updates);
}
export async function firstTouchSubscriptionsDelete(agent, params) {
    return restQuery(agent, "DELETE", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`);
}
// ── Account & Tokens (v1.7) ──
/** Inspect your MadeOnSol API account — tier, daily/burst quota state, remaining requests, and per-feature usage. */
export async function me(agent) {
    return restQuery(agent, "GET", "/me");
}
/**
 * Filtered, sortable token directory (PRO+).
 * Default `min_liq=2000` skips dust. Supports MC band, liquidity floor,
 * recent-activity window, primary DEX, authority flags, computed 1h volume floor,
 * MEV-share ceiling, MC change deltas.
 */
export async function tokensList(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    // Default min_liq=2000 skips dust
    if (params.min_liq === undefined)
        qs.set("min_liq", "2000");
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/tokens${query}`);
}
/**
 * Pre-bond pump.fun tokens approaching graduation, ranked by velocity
 * (Δprogress/min): "95% and accelerating" beats "92% stalled". Each token is
 * enriched with its deployer's reputation tier. `progress_pct` is from on-chain
 * real_token_reserves; `velocity_pct_per_min` is null until a 5m snapshot exists;
 * `eta_minutes` is a linear projection. PRO/ULTRA only.
 */
export async function almostBonded(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/tokens/almost-bonded${query}`);
}
export async function copyTradeSignals(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/copytrade/signals${query}`);
}
// ── Price Alerts (PRO/ULTRA, v1.9) ──
export async function priceAlertsList(agent) {
    return restQuery(agent, "GET", "/price-alerts");
}
export async function priceAlertsCreate(agent, params) {
    return restQuery(agent, "POST", "/price-alerts", params);
}
export async function priceAlertsGet(agent, params) {
    return restQuery(agent, "GET", `/price-alerts/${params.id}`);
}
export async function priceAlertsUpdate(agent, params) {
    return restQuery(agent, "PATCH", `/price-alerts/${params.id}`, params.updates);
}
export async function priceAlertsDelete(agent, params) {
    return restQuery(agent, "DELETE", `/price-alerts/${params.id}`);
}
export async function priceAlertsEvents(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/price-alerts/events${query}`);
}
// ── v1.9 new endpoints ──
export async function scoutLeaderboard(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/kol/scouts/leaderboard${query}`);
}
export async function coordinationHistory(agent, params = {}) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined)
            qs.set(k, String(v));
    }
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/kol/coordination/history${query}`);
}
export async function kolConsensus(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/kol-consensus`);
}
export async function peakHistory(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/peak-history`);
}
