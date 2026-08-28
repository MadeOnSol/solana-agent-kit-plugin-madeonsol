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
// ── Deployer hunter: reputation, leaderboard, outcomes (msk_ key only) ──
//
// "Bonding" is the pump.fun graduation event. `bonding_rate` is LIFETIME,
// `recent_bond_rate` is the ROLLING recent window — the gap between them is the
// signal, not either alone. `runner_rate` means nothing until
// `labeled_tokens >= 3`.
/** Build a query string, dropping unset params (`?tier=` is a 400, not "unset"). */
function buildQs(params) {
    if (!params)
        return "";
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params))
        if (v !== undefined)
            sp.set(k, String(v));
    const s = sp.toString();
    return s ? `?${s}` : "";
}
/** Chain-wide deployer stats — tracked count, bonds detected, bond rate, tier counts. */
export async function deployerStats(agent) {
    return restQuery(agent, "GET", "/deployer-hunter/stats");
}
/**
 * Deployer reputation leaderboard, excluding unranked deployers. Compare
 * `bonding_rate` (lifetime) against `recent_bond_rate` (rolling): a deployer at
 * 0.40 lifetime and 0.05 recent is cooling off.
 */
export async function deployerLeaderboard(agent, params) {
    const qs = buildQs(params);
    return restQuery(agent, "GET", `/deployer-hunter/leaderboard${qs}`);
}
/**
 * One deployer's profile. An UNTRACKED wallet returns zeroed counters, NOT a
 * 404 — check `total_deployed` before drawing a conclusion about a wallet.
 */
export async function deployerProfile(agent, params) {
    return restQuery(agent, "GET", `/deployer-hunter/${encodeURIComponent(params.wallet)}`);
}
/** Every token one deployer launched, with time-to-bond and peak MC. */
export async function deployerTokens(agent, params) {
    const { wallet, ...rest } = params;
    const qs = buildQs(rest);
    return restQuery(agent, "GET", `/deployer-hunter/${encodeURIComponent(wallet)}/tokens${qs}`);
}
/** Alert volume plus per-tier bond-rate and MC-multiplier distributions. */
export async function deployerAlertStats(agent, params) {
    const qs = buildQs(params);
    return restQuery(agent, "GET", `/deployer-hunter/alert-stats${qs}`);
}
/** Best recent tokens from ranked (non-unranked) deployers, by peak MC multiple. */
export async function deployerBestTokens(agent, params) {
    const qs = buildQs(params);
    return restQuery(agent, "GET", `/deployer-hunter/best-tokens${qs}`);
}
/**
 * Fresh graduations from tracked deployers. Poll incrementally: pass the
 * previous response's `next_since` back as `since`.
 */
export async function deployerRecentBonds(agent, params) {
    const qs = buildQs(params);
    return restQuery(agent, "GET", `/deployer-hunter/recent-bonds${qs}`);
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
/**
 * Issue your WebSocket streaming token. Stream tokens never expire (since
 * 2026-08-27): every call returns the same token until your subscription lapses
 * or you pass `{ rotate: true }`, which replaces it (the previous value keeps
 * working for 60 s). `expires_at` / `next_refresh_at` are always `null`; the
 * response also carries `rotated` (boolean) and `lifetime` (string). A `4001`
 * close means "mint again", never a timer. Authenticate the handshake with
 * `Authorization: Bearer <token>`.
 */
export async function getStreamToken(agent, params) {
    return restQuery(agent, "POST", "/stream/token", params?.rotate ? { rotate: true } : undefined);
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
/**
 * Verified CURRENT on-chain holdings for any wallet — the wallet's actual SPL + Token-2022 token
 * accounts and SOL balance read straight from chain, enriched with price/MC/name/symbol, plus
 * `transfer_delta` (on-chain amount − trade-derived net position, exposing non-swap flows like
 * airdrops, insider funding, wallet-hopping). Distinct from `walletPositions` (trade-derived FIFO):
 * holdings = what the wallet actually holds right now. `limit` 1–500 (default 200); `min_value_usd`
 * ≥0 (default 0). ULTRA only.
 */
export async function walletHoldings(agent, params) {
    const qs = new URLSearchParams();
    if (params.limit !== undefined)
        qs.set("limit", String(params.limit));
    if (params.min_value_usd !== undefined)
        qs.set("min_value_usd", String(params.min_value_usd));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/holdings${query}`);
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
/**
 * Bulk wallet reputation flags for 1–100 addresses in one request (POST /wallet/batch/classify).
 * Each entry matches the `flags` block of walletStats(): `is_sniper`, `is_bundler` (lifetime flag),
 * `is_dumper` (rolling 42-day window), `is_kol` + `kol_name`, `bot_confidence` (STRING enum
 * "none"/"low"/"medium"/"high" | null — never a number), and `dump_cluster` cohort stats
 * ({ dump_cohorts, runner_cohorts, total_cohorts, as_of } | null). Flags are pump.fun-pipeline
 * scoped — `false` means "not observed", NOT verified clean. PRO/ULTRA only.
 */
export async function walletClassify(agent, params) {
    return restQuery(agent, "POST", "/wallet/batch/classify", { wallets: params.wallets });
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
export async function tokenDepth(agent, params) {
    const qs = new URLSearchParams();
    if (params.sizes && params.sizes.length > 0)
        qs.set("sizes", params.sizes.join(","));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/depth${query}`);
}
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
export async function tokenHolders(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/holders`);
}
function toQuery(params, skip = []) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params ?? {})) {
        if (skip.includes(k) || v === undefined || v === null)
            continue;
        qs.set(k, String(v));
    }
    const q = qs.toString();
    return q ? `?${q}` : "";
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
export async function tokenLocks(agent, params) {
    const query = toQuery(params, ["mint"]);
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/locks${query}`);
}
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
export async function tokenLocksFeed(agent, params = {}) {
    const query = toQuery(params);
    return restQuery(agent, "GET", `/tokens/locks${query}`);
}
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
export async function tokenUnlocks(agent, params = {}) {
    const query = toQuery(params);
    return restQuery(agent, "GET", `/tokens/unlocks${query}`);
}
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
export async function tokenFeeShares(agent, params) {
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/fee-shares`);
}
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
export async function tokenFeeClaims(agent, params = {}) {
    const query = toQuery(params);
    return restQuery(agent, "GET", `/tokens/fee-claims${query}`);
}
/**
 * Token surges & revivals (GET /tokens/surges) — token momentum fires, newest first, across all
 * mints. kind=surge: a token < 30 min old whose market cap runs hard vs its LAUNCH MC — tier early
 * (≤10 min, ≥$12k, ≥3× launch) | strong (≤30 min, ≥$30k, ≥6× launch AND ≥2× the 3-min low — climbing
 * NOW) | breakout (≤2 min, ≥$45k, ≥8×); each tier fires once per mint and must be SUSTAINED ≥10 s
 * (nothing fires before 20 s of age — a one-tick bundle mark is a spike, not a surge). kind=revival:
 * no 1-minute trade candle for ≥24 h, then confirmed ONLY by the tape (≥5 buys, ≥$500 buy volume,
 * MC ≥1.5× the pre-dormancy close) — never by a price mark; tier null. Hard gates on both: liquidity
 * ≥$1.5k and ≥2% of MC, MC ≤$100B, and the MC gained must be PAID FOR by buy volume on the tape.
 * Each row: tape {source candles|wallet_trades, available, buys, sells, volume, unique_buyers — null
 * outside token_trades coverage (wallet_data_available), never an inferred zero}, kol {buyers, names},
 * early_buyers {bundled, sold, sniper_wallets}, deployer {tier, bonding_rate, runner_rate…},
 * risk_flags[] (bundled_launch, few_buyers, wash_pattern, thin_liquidity, cold_deployer,
 * sniper_heavy, early_buyers_exiting, sell_pressure, no_tape_trades, no_prior_price,
 * mint_authority_active, transfer_fee — EMPTY = no flag raised, NOT verified clean) and outcome
 * {mc_1h_multiple, peak_1h_multiple, priced_after_1h} once ≥65 min old. stats="1" adds per-(kind,
 * tier) hit-rates over `days` (up_1h_pct, median_peak_multiple, doubled_1h_pct) — out-of-sample by
 * construction. Filters are DB-native: kind, tier, mint, launchpad, deployer_tier, min_mc_usd /
 * max_mc_usd, min_buys, exclude_flags (comma list), only_clean; cursors since / before. The response
 * echoes the live thresholds in `definitions`. Pushed live on WS channel `token:surges` (events
 * `token:surge` / `token:revival`) and accepted by createWebhook as those events. Retention 60 d.
 * PRO/ULTRA only, keyed API only.
 */
export async function tokenSurges(agent, params = {}) {
    const query = toQuery(params);
    return restQuery(agent, "GET", `/tokens/surges${query}`);
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
export async function tokenTrades(agent, params) {
    const qs = new URLSearchParams();
    if (params.limit !== undefined)
        qs.set("limit", String(params.limit));
    if (params.cursor)
        qs.set("cursor", params.cursor);
    if (params.action)
        qs.set("action", params.action);
    if (params.wallet)
        qs.set("wallet", params.wallet);
    if (params.since !== undefined)
        qs.set("since", String(params.since));
    if (params.until !== undefined)
        qs.set("until", String(params.until));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/trades${query}`);
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
