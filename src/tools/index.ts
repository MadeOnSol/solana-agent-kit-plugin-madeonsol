/**
 * Tool functions — pure logic that calls MadeOnSol API.
 * Auth priority: MADEONSOL_API_KEY > RAPIDAPI_KEY > SVM_PRIVATE_KEY (x402).
 * These are called by Action handlers and can also be used directly via agent.methods.
 */

const BASE_URL = "https://madeonsol.com";
const RAPIDAPI_HOST = "madeonsol-solana-kol-tracker-tools-api.p.rapidapi.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Agent = any; // SolanaAgentKit — we use `any` to avoid hard dep

type AuthMode = "madeonsol" | "rapidapi" | "x402" | "none";

let _authMode: AuthMode | null = null;
let _authHeaders: Record<string, string> = {};
let _paidFetch: typeof fetch | null = null;

function getConfig(agent: Agent, key: string): string | undefined {
  return agent.config?.[key] || agent.config?.OTHER_API_KEYS?.[key];
}

export async function initAuth(agent: Agent): Promise<void> {
  if (_authMode) return;

  const apiKey = getConfig(agent, "MADEONSOL_API_KEY");
  const rapidApiKey = getConfig(agent, "RAPIDAPI_KEY");
  const privateKey = getConfig(agent, "SVM_PRIVATE_KEY");

  if (apiKey) {
    _authMode = "madeonsol";
    _authHeaders = { Authorization: `Bearer ${apiKey}` };
    _paidFetch = fetch;
    console.log("[madeonsol] Using MadeOnSol API key (Bearer auth)");
  } else if (rapidApiKey) {
    _authMode = "rapidapi";
    _authHeaders = { "x-rapidapi-key": rapidApiKey, "x-rapidapi-host": RAPIDAPI_HOST };
    _paidFetch = fetch;
    console.log("[madeonsol] Using RapidAPI key");
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
    console.warn("[madeonsol] No auth configured. Set MADEONSOL_API_KEY (free at madeonsol.com/developer), RAPIDAPI_KEY, or SVM_PRIVATE_KEY.");
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
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MadeOnSol API error ${res.status}: ${body}`);
  }
  return res.json();
}

export async function kolFeed(agent: Agent, params: { limit?: number; action?: string; kol?: string } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/feed", params as Record<string, string | number>);
}

export async function kolCoordination(agent: Agent, params: { period?: string; min_kols?: number; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/coordination", params as Record<string, string | number>);
}

export async function kolLeaderboard(agent: Agent, params: { period?: string; limit?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/kol/leaderboard", params as Record<string, string | number>);
}

export async function deployerAlerts(agent: Agent, params: { limit?: number; since?: string; offset?: number } = {}) {
  await initAuth(agent);
  return query("/api/x402/deployer-hunter/alerts", params as Record<string, string | number>);
}

// ── Webhook & Streaming (requires API key or RapidAPI key) ──

async function restQuery(agent: Agent, method: string, path: string, body?: unknown) {
  await initAuth(agent);
  if (_authMode !== "madeonsol" && _authMode !== "rapidapi") {
    throw new Error("API key or RapidAPI key required for webhook/streaming features. Get a free key at madeonsol.com/developer");
  }
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ..._authHeaders,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
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
