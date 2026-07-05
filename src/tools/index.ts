/**
 * Tool functions — pure logic that calls MadeOnSol API.
 * Auth priority: MADEONSOL_API_KEY > SVM_PRIVATE_KEY (x402).
 *
 * v1.0 breaking change: RAPIDAPI_KEY support has been removed
 * (MadeOnSol RapidAPI marketplace was retired 2026-04-19).
 * Get a free `msk_` key at https://madeonsol.com/pricing.
 */

const BASE_URL = "https://madeonsol.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Agent = any; // SolanaAgentKit — we use `any` to avoid hard dep

type AuthMode = "madeonsol" | "x402" | "none";

let _authMode: AuthMode | null = null;
let _authHeaders: Record<string, string> = {};
let _paidFetch: typeof fetch | null = null;

export interface RateLimitInfo {
  limit?: string;
  remaining?: string;
  reset?: string;
  requestId?: string;
}

/** Most recent rate-limit headers, populated by every successful API request. */
export let lastRateLimit: RateLimitInfo = {};

function captureRateLimit(res: Response) {
  lastRateLimit = {
    limit: res.headers.get("X-RateLimit-Limit") ?? undefined,
    remaining: res.headers.get("X-RateLimit-Remaining") ?? undefined,
    reset: res.headers.get("X-RateLimit-Reset") ?? undefined,
    requestId: res.headers.get("X-Request-Id") ?? undefined,
  };
}

function getConfig(agent: Agent, key: string): string | undefined {
  return agent.config?.[key] || agent.config?.OTHER_API_KEYS?.[key];
}

export async function initAuth(agent: Agent): Promise<void> {
  if (_authMode) return;

  const apiKey = getConfig(agent, "MADEONSOL_API_KEY");
  const privateKey = getConfig(agent, "SVM_PRIVATE_KEY");

  if (apiKey) {
    _authMode = "madeonsol";
    _authHeaders = { Authorization: `Bearer ${apiKey}`, "User-Agent": "solana-agent-kit-plugin-madeonsol/1.16.1" };
    _paidFetch = fetch;
    console.log("[madeonsol] Using MadeOnSol API key (Bearer auth)");
  } else if (privateKey) {
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
  } else {
    _authMode = "none";
    _paidFetch = fetch;
    console.warn(
      "\n[madeonsol] No auth configured — every API call will fail.\n" +
      "  → Get a free MADEONSOL_API_KEY (200 req/day, no card) at https://madeonsol.com/pricing\n" +
      "  → Or set SVM_PRIVATE_KEY for x402 micropayments.\n",
    );
  }
}

/** @deprecated Use initAuth instead */
export async function initPaidFetch(agent: Agent): Promise<typeof fetch> {
  await initAuth(agent);
  return _paidFetch!;
}

async function query(path: string, params?: Record<string, string | number>) {
  const apiPath = _authMode === "x402" || _authMode === "none"
    ? path
    : path.replace("/api/x402/", "/api/v1/");
  const url = new URL(apiPath, BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = _authMode === "x402"
    ? await _paidFetch!(url.toString())
    : await fetch(url.toString(), { headers: _authHeaders });
  captureRateLimit(res);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MadeOnSol API error ${res.status}: ${body}`);
  }
  return res.json();
}

export async function kolFeed(
  agent: Agent,
  params: { limit?: number; before?: string; action?: string; kol?: string; min_sol?: number; token_age_max_min?: number; exclude_sells?: boolean; min_kol_winrate?: number; strategy?: string } = {},
) {
  await initAuth(agent);
  return query("/api/x402/kol/feed", params as Record<string, string | number>);
}

export async function kolCoordination(
  agent: Agent,
  params: {
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
  } = {},
) {
  await initAuth(agent);
  const { include_majors, ...rest } = params;
  const flat: Record<string, string | number> = { ...(rest as Record<string, string | number>) };
  if (include_majors !== undefined) flat.include_majors = include_majors ? "true" : "false";
  return query("/api/x402/kol/coordination", flat);
}

export async function kolLeaderboard(agent: Agent, params: { period?: string; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/leaderboard", params as Record<string, string | number>);
}

/**
 * Get Pump.fun deployer alerts with KOL buy enrichment.
 * The `tier` filter (elite/good/moderate/rising/cold) is PRO/ULTRA only —
 * BASIC callers passing it receive HTTP 403.
 */
export async function deployerAlerts(
  agent: Agent,
  params: {
    limit?: number;
    since?: string;
    before?: string;
    offset?: number;
    tier?: "elite" | "good" | "moderate" | "rising" | "cold";
    alert_type?: string;
    priority?: "high" | "medium" | "low";
    min_kol_buys?: number;
  } = {},
) {
  await initAuth(agent);
  return query("/api/x402/deployer-hunter/alerts", params as Record<string, string | number>);
}

export async function kolPairs(agent: Agent, params: { period?: string; min_shared?: number; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/pairs", params as Record<string, string | number>);
}

export async function kolHotTokens(agent: Agent, params: { period?: string; min_kols?: number; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/tokens/hot", params as Record<string, string | number>);
}

export async function kolTrendingTokens(agent: Agent, params: { period?: string; min_kols?: number; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/tokens/trending", params as Record<string, string | number>);
}

export async function kolTokenEntryOrder(agent: Agent, params: { mint: string; limit?: number }) {
  await initAuth(agent);
  const { mint, ...rest } = params;
  return query(`/api/x402/kol/tokens/${encodeURIComponent(mint)}/entry-order`, rest as Record<string, string | number>);
}

export async function kolCompare(agent: Agent, params: { wallets: string[] }) {
  await initAuth(agent);
  return query("/api/x402/kol/compare", { wallets: params.wallets.join(",") });
}

export async function kolAlertsRecent(
  agent: Agent,
  params: { window?: string; types?: string[]; min_severity?: string; limit?: number } = {},
) {
  await initAuth(agent);
  const { types, ...rest } = params;
  const flat: Record<string, string | number> = { ...(rest as Record<string, string | number>) };
  if (types && types.length > 0) flat.types = types.join(",");
  return query("/api/x402/kol/alerts/recent", flat);
}

export async function kolPnl(agent: Agent, params: { wallet: string; period?: string }) {
  const qs = params.period ? `?period=${params.period}` : "";
  return restQuery(agent, "GET", `/kol/${params.wallet}/pnl${qs}`);
}

export async function kolTiming(agent: Agent, params: { wallet: string; period?: string }) {
  const qs = params.period ? `?period=${params.period}` : "";
  return restQuery(agent, "GET", `/kol/${params.wallet}/timing${qs}`);
}

export async function deployerTrajectory(agent: Agent, params: { wallet: string }) {
  return restQuery(agent, "GET", `/deployer-hunter/${params.wallet}/trajectory`);
}

// ── REST helper (webhooks, streaming, alpha, copy-trade, wallet-tracker) ──

async function restQuery(agent: Agent, method: string, path: string, body?: unknown) {
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

export async function createWebhook(agent: Agent, params: { url: string; events: string[]; filters?: Record<string, unknown> }) {
  return restQuery(agent, "POST", "/webhooks", params);
}

export async function listWebhooks(agent: Agent) {
  return restQuery(agent, "GET", "/webhooks");
}

export async function deleteWebhook(agent: Agent, params: { id: number }) {
  return restQuery(agent, "DELETE", `/webhooks/${params.id}`);
}

export async function testWebhook(agent: Agent, params: { webhook_id: number }) {
  return restQuery(agent, "POST", "/webhooks/test", params);
}

export async function getStreamToken(agent: Agent) {
  return restQuery(agent, "POST", "/stream/token");
}

/**
 * List your live WebSocket streaming sessions across ws-streaming and dex-stream.
 * Returns `{ sessions, count }`; each session has `id`, `service`, `tier`, `channels[]`,
 * `connected_at`, `remote_ip`, and `messages_sent`. PRO/ULTRA only.
 */
export async function streamSessions(agent: Agent) {
  return restQuery(agent, "GET", "/stream/sessions");
}

/**
 * Evict (kill) a live WebSocket streaming session by id. Returns `{ evicted: true, id }`;
 * 404 if no such session, 400 if `id` is not a positive integer. PRO/ULTRA only.
 */
export async function streamSessionKill(agent: Agent, params: { id: string | number }) {
  return restQuery(agent, "DELETE", `/stream/sessions/${encodeURIComponent(String(params.id))}`);
}

// ── Wallet Tracker ──

export async function walletTrackerWatchlist(agent: Agent) {
  return restQuery(agent, "GET", "/wallet-tracker/watchlist");
}

export async function walletTrackerAdd(agent: Agent, params: { wallet_address: string; label?: string }) {
  return restQuery(agent, "POST", "/wallet-tracker/watchlist", params);
}

export async function walletTrackerRemove(agent: Agent, params: { wallet_address: string }) {
  return restQuery(agent, "DELETE", `/wallet-tracker/watchlist/${encodeURIComponent(params.wallet_address)}`);
}

export async function walletTrackerTrades(
  agent: Agent,
  params: { wallet?: string; action?: string; event_type?: string; limit?: number; before?: number } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/wallet-tracker/trades${query}`);
}

export async function walletTrackerSummary(
  agent: Agent,
  params: { period?: string; wallet?: string } = {},
) {
  const qs = new URLSearchParams();
  if (params.period) qs.set("period", params.period);
  if (params.wallet) qs.set("wallet", params.wallet);
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/wallet-tracker/summary${query}`);
}

// ── Universal Wallet Endpoints (PRO+, any wallet — not just curated KOLs) ──

export async function walletStats(agent: Agent, params: { address: string }) {
  return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}`);
}

export async function walletPnl(agent: Agent, params: { address: string }) {
  return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/pnl`);
}

export async function walletPositions(agent: Agent, params: { address: string }) {
  return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/positions`);
}

export async function walletTrades(
  agent: Agent,
  params: {
    address: string;
    limit?: number;
    cursor?: string;
    action?: "buy" | "sell";
    token_mint?: string;
    since?: number;
    until?: number;
  },
) {
  const qs = new URLSearchParams();
  if (params.limit !== undefined) qs.set("limit", String(params.limit));
  if (params.cursor) qs.set("cursor", params.cursor);
  if (params.action) qs.set("action", params.action);
  if (params.token_mint) qs.set("token_mint", params.token_mint);
  if (params.since !== undefined) qs.set("since", String(params.since));
  if (params.until !== undefined) qs.set("until", String(params.until));
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/wallet/${encodeURIComponent(params.address)}/trades${query}`);
}

// ── Alpha Wallet Intelligence ──

export async function alphaLeaderboard(
  agent: Agent,
  params: { limit?: number; min_tokens?: number; min_pnl?: number } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/alpha/leaderboard${query}`);
}

export async function alphaWallet(agent: Agent, params: { wallet: string }) {
  return restQuery(agent, "GET", `/alpha/${encodeURIComponent(params.wallet)}`);
}

export async function alphaLinked(agent: Agent, params: { wallet: string }) {
  return restQuery(agent, "GET", `/alpha/${encodeURIComponent(params.wallet)}/linked`);
}

// ── Token Quality ──

export async function tokenCapTable(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/cap-table`);
}

export async function tokenBuyerQuality(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/buyer-quality`);
}

/** Transparent 0–100 rug-risk/safety score (higher = riskier) with band, explainable factors, and raw inputs. PRO/ULTRA only. */
export async function tokenRisk(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/risk`);
}

/** Bundle-cohort holdings: which same-slot "bundle" wallets bought a token and how much of supply they STILL hold (held_pct_of_supply headline rug/insider signal). BASIC=bundle block only; PRO=top-10 flags; ULTRA=full + identity. PRO/ULTRA only. */
export async function tokenBundle(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/bundle`);
}

/** Historical OHLCV candles (1m/5m/15m/1h/4h/1d) aggregated from the trade firehose. PRO=OHLCV 30d; ULTRA=+net flow, liquidity delta, full history. PRO/ULTRA only. */
export async function tokenCandles(agent: Agent, params: { mint: string; tf?: string; limit?: number; from?: string; to?: string }) {
  const qs = new URLSearchParams();
  if (params.tf !== undefined) qs.set("tf", params.tf);
  if (params.limit !== undefined) qs.set("limit", String(params.limit));
  if (params.from !== undefined) qs.set("from", params.from);
  if (params.to !== undefined) qs.set("to", params.to);
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/candles${query}`);
}

/**
 * Net buy/sell flow for a token over a rolling window (`1h` default, or `24h`). Returns unique
 * wallet/buyer/seller counts, buy/sell trade counts, buy/sell/net SOL, and trades-per-wallet. PRO/ULTRA only.
 */
export async function tokenFlow(agent: Agent, params: { mint: string; window?: "1h" | "24h" }) {
  const qs = params.window !== undefined ? `?window=${params.window}` : "";
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/flow${qs}`);
}

/** Bulk buyer-quality scoring for up to 50 mints. Shares the 5-min LRU cache with the single-mint endpoint. */
export async function tokenBuyerQualityBatch(agent: Agent, params: { mints: string[] }) {
  return restQuery(agent, "POST", "/tokens/batch/buyer-quality", { mints: params.mints });
}

/**
 * Bulk rug-risk/safety scoring for 1–50 mints — same per-mint shape as tokenRisk() plus an `as_of` ISO string.
 * Returns `{ tokens, count }` where `tokens` preserves de-duplicated input order; untracked mints come back as
 * `{ mint, error: "not_tracked" }` and do NOT fail the batch. Counts as one request against quota. PRO/ULTRA only.
 */
export async function tokenRiskBatch(agent: Agent, params: { mints: string[] }) {
  return restQuery(agent, "POST", "/tokens/batch/risk", { mints: params.mints });
}

// ── Token Intelligence (/token/{mint}) ──

/** Comprehensive per-mint snapshot: price, MC, 24h volume, deployer reputation, KOL activity, age, blacklist status. */
export async function tokenGet(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/token/${encodeURIComponent(params.mint)}`);
}

/** Bulk token snapshot for up to 50 mints — same per-mint shape as tokenGet(). 10-20× cheaper than N sequential calls. */
export async function tokenBatch(agent: Agent, params: { mints: string[] }) {
  return restQuery(agent, "POST", "/token/batch", { mints: params.mints });
}

// ── Copy-Trade Rules (PRO/ULTRA) ──

export async function copyTradeList(agent: Agent) {
  return restQuery(agent, "GET", "/copytrade/subscriptions");
}

export async function copyTradeCreate(
  agent: Agent,
  params: {
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
  },
) {
  return restQuery(agent, "POST", "/copytrade/subscriptions", params);
}

export async function copyTradeGet(agent: Agent, params: { rule_id: string }) {
  return restQuery(agent, "GET", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`);
}

export async function copyTradeUpdate(
  agent: Agent,
  params: { rule_id: string; updates: Record<string, unknown> },
) {
  return restQuery(agent, "PATCH", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`, params.updates);
}

export async function copyTradeDelete(agent: Agent, params: { rule_id: string }) {
  return restQuery(agent, "DELETE", `/copytrade/subscriptions/${encodeURIComponent(params.rule_id)}`);
}

// ── Coordination Alerts (PRO/ULTRA, v1.1) ──

export async function coordinationAlertsList(agent: Agent) {
  return restQuery(agent, "GET", "/kol/coordination/alerts");
}

export async function coordinationAlertsCreate(
  agent: Agent,
  params: {
    name?: string;
    min_kols?: number;
    window_minutes?: number;
    min_score?: number;
    include_majors?: boolean;
    cooldown_min?: number;
    score_jump_break?: number;
    delivery_mode?: "websocket" | "webhook" | "both";
    webhook_url?: string;
  },
) {
  return restQuery(agent, "POST", "/kol/coordination/alerts", params);
}

export async function coordinationAlertsGet(agent: Agent, params: { rule_id: string }) {
  return restQuery(agent, "GET", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`);
}

export async function coordinationAlertsUpdate(
  agent: Agent,
  params: { rule_id: string; updates: Record<string, unknown> },
) {
  return restQuery(agent, "PATCH", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`, params.updates);
}

export async function coordinationAlertsDelete(agent: Agent, params: { rule_id: string }) {
  return restQuery(agent, "DELETE", `/kol/coordination/alerts/${encodeURIComponent(params.rule_id)}`);
}

// ── First-Touch Signal ──

export async function kolFirstTouches(
  agent: Agent,
  params: {
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
  } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/kol/first-touches${query}`);
}

export async function firstTouchSubscriptionsList(agent: Agent) {
  return restQuery(agent, "GET", "/kol/first-touches/subscriptions");
}

export async function firstTouchSubscriptionsCreate(
  agent: Agent,
  params: {
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
  },
) {
  return restQuery(agent, "POST", "/kol/first-touches/subscriptions", params);
}

export async function firstTouchSubscriptionsGet(agent: Agent, params: { subscription_id: string }) {
  return restQuery(agent, "GET", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`);
}

export async function firstTouchSubscriptionsUpdate(
  agent: Agent,
  params: { subscription_id: string; updates: Record<string, unknown> },
) {
  return restQuery(agent, "PATCH", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`, params.updates);
}

export async function firstTouchSubscriptionsDelete(agent: Agent, params: { subscription_id: string }) {
  return restQuery(agent, "DELETE", `/kol/first-touches/subscriptions/${encodeURIComponent(params.subscription_id)}`);
}

// ── Account & Tokens (v1.7) ──

/** Inspect your MadeOnSol API account — tier, daily/burst quota state, remaining requests, and per-feature usage. */
export async function me(agent: Agent) {
  return restQuery(agent, "GET", "/me");
}

/**
 * Filtered, sortable token directory (PRO+).
 * Default `min_liq=2000` skips dust. Supports MC band, liquidity floor,
 * recent-activity window, primary DEX, authority flags, computed 1h volume floor,
 * MEV-share ceiling, MC change deltas.
 */
export async function tokensList(
  agent: Agent,
  params: {
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
  } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  // Default min_liq=2000 skips dust
  if (params.min_liq === undefined) qs.set("min_liq", "2000");
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
export async function almostBonded(
  agent: Agent,
  params: {
    min_progress?: number;
    max_progress?: number;
    min_velocity_pct_per_min?: number;
    max_age_minutes?: number;
    deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
    authority_revoked?: boolean;
    min_liq?: number;
    sort?: "velocity_desc" | "progress_desc" | "eta_asc";
    limit?: number;
  } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/tokens/almost-bonded${query}`);
}

export async function copyTradeSignals(
  agent: Agent,
  params: { rule_id?: string; limit?: number; since?: string } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/copytrade/signals${query}`);
}

// ── Price Alerts (PRO/ULTRA, v1.9) ──

export async function priceAlertsList(agent: Agent) {
  return restQuery(agent, "GET", "/price-alerts");
}

export async function priceAlertsCreate(
  agent: Agent,
  params: {
    token_mint: string;
    drop_pct: number;
    recovery_pct?: number;
    name?: string;
    delivery_mode?: "webhook" | "websocket" | "both";
    webhook_url?: string;
  },
) {
  return restQuery(agent, "POST", "/price-alerts", params);
}

export async function priceAlertsGet(agent: Agent, params: { id: number }) {
  return restQuery(agent, "GET", `/price-alerts/${params.id}`);
}

export async function priceAlertsUpdate(
  agent: Agent,
  params: { id: number; updates: Record<string, unknown> },
) {
  return restQuery(agent, "PATCH", `/price-alerts/${params.id}`, params.updates);
}

export async function priceAlertsDelete(agent: Agent, params: { id: number }) {
  return restQuery(agent, "DELETE", `/price-alerts/${params.id}`);
}

export async function priceAlertsEvents(
  agent: Agent,
  params: { alert_id?: number; event_type?: "dip" | "recovery"; since?: string; limit?: number } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/price-alerts/events${query}`);
}

// ── v1.9 new endpoints ──

export async function scoutLeaderboard(
  agent: Agent,
  params: { limit?: number; scout_tier?: "S" | "A" | "B" | "C"; sort?: string } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/kol/scouts/leaderboard${query}`);
}

export async function coordinationHistory(
  agent: Agent,
  params: { limit?: number; since?: string; min_score?: number } = {},
) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString() ? `?${qs.toString()}` : "";
  return restQuery(agent, "GET", `/kol/coordination/history${query}`);
}

export async function kolConsensus(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/kol-consensus`);
}

export async function peakHistory(agent: Agent, params: { mint: string }) {
  return restQuery(agent, "GET", `/tokens/${encodeURIComponent(params.mint)}/peak-history`);
}
