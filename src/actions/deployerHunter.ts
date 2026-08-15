import { z } from "zod";
import {
  deployerStats,
  deployerLeaderboard,
  deployerProfile,
  deployerTokens,
  deployerAlertStats,
  deployerBestTokens,
  deployerRecentBonds,
} from "../tools/index.js";

const TIERS = ["elite", "good", "rising", "neutral", "spammer", "unranked"] as const;

export const deployerStatsAction = {
  name: "MADEONSOL_DEPLOYER_STATS_ACTION",
  similes: ["deployer ecosystem stats", "how many deployers are tracked", "chain-wide bond rate", "deployer tier counts", "pump.fun deployer overview"],
  description:
    "Chain-wide Pump.fun deployer stats — tracked_count (how many deployers are graded), signals_today, bonds_detected, the ecosystem bond_rate, and a per-tier count (elite/good/rising). Read this first to calibrate: a chain-wide bond rate of ~2% is what makes an elite deployer's 30% meaningful. Requires an msk_ key.",
  examples: [
    [{ input: {}, output: { status: "success" }, explanation: "Chain-wide deployer baseline" }],
  ],
  schema: z.object({}),
  handler: async (agent: unknown) => {
    try {
      return { status: "success", result: await deployerStats(agent) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerLeaderboardAction = {
  name: "MADEONSOL_DEPLOYER_LEADERBOARD_ACTION",
  similes: ["deployer leaderboard", "best pump.fun deployers", "top deployers", "elite deployers", "deployer ranking"],
  description:
    "Pump.fun deployer reputation leaderboard, ranked by bonding rate, recent form, total bonded, or last deploy. Unranked deployers are excluded. IMPORTANT: compare bonding_rate (LIFETIME) against recent_bond_rate (ROLLING) — the gap between them is the signal, not either number alone; a deployer at 0.40 lifetime and 0.05 recent is cooling off. runner_rate (share of labeled tokens that ran rather than dumped) is only meaningful once labeled_tokens >= 3. Requires an msk_ key.",
  examples: [
    [{ input: { tier: "elite", sort: "recent", limit: 20 }, output: { status: "success" }, explanation: "Elite deployers in current form" }],
  ],
  schema: z.object({
    tier: z.enum(TIERS).optional().describe("Restrict to one reputation grade"),
    sort: z.enum(["bonding_rate", "recent", "total_bonded", "last_deploy"]).default("bonding_rate").describe("Ranking axis"),
    limit: z.number().min(1).max(100).default(20).describe("Page size (1–100, default 20)"),
    offset: z.number().min(0).default(0).describe("Pagination offset"),
  }),
  handler: async (
    agent: unknown,
    input: { tier?: string; sort?: string; limit?: number; offset?: number },
  ) => {
    try {
      return { status: "success", result: await deployerLeaderboard(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerProfileAction = {
  name: "MADEONSOL_DEPLOYER_PROFILE_ACTION",
  similes: ["deployer profile", "is this deployer good", "deployer reputation", "check this deployer", "deployer tier"],
  description:
    "One Pump.fun deployer's profile — tier, lifetime bonding_rate, recent_bond_rate, totals deployed/bonded, first seen, last deploy, average time-to-bond, and runner_rate. IMPORTANT: an untracked wallet returns a profile with ZEROED counters, not a 404 — check total_deployed before concluding anything, or you will report '0% bond rate' for a wallet that simply has no deploys. Gate runner_rate on labeled_tokens >= 3. Requires an msk_ key.",
  examples: [
    [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" }, output: { status: "success" }, explanation: "Reputation for one deployer" }],
  ],
  schema: z.object({
    wallet: z.string().describe("Deployer wallet address (base58)"),
  }),
  handler: async (agent: unknown, input: { wallet: string }) => {
    try {
      return { status: "success", result: await deployerProfile(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerTokensAction = {
  name: "MADEONSOL_DEPLOYER_TOKENS_ACTION",
  similes: ["tokens by this deployer", "what has this deployer launched", "deployer launch history", "deployer token list", "coins from this deployer"],
  description:
    "Every token deployed by one Pump.fun wallet, paginated — each row with deployed_at, bonded_at, time-to-bond and peak market cap. Use only_bonded to see just the graduations. Pair with the profile action to check whether a deployer's record comes from a couple of outliers or a consistent rate. Requires an msk_ key.",
  examples: [
    [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", only_bonded: true }, output: { status: "success" }, explanation: "Only this deployer's graduations" }],
  ],
  schema: z.object({
    wallet: z.string().describe("Deployer wallet address (base58)"),
    limit: z.number().min(1).max(100).default(50).describe("Page size (1–100, default 50)"),
    offset: z.number().min(0).default(0).describe("Pagination offset"),
    only_bonded: z.boolean().default(false).describe("Return only tokens that graduated"),
  }),
  handler: async (
    agent: unknown,
    input: { wallet: string; limit?: number; offset?: number; only_bonded?: boolean },
  ) => {
    try {
      return { status: "success", result: await deployerTokens(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerAlertStatsAction = {
  name: "MADEONSOL_DEPLOYER_ALERT_STATS_ACTION",
  similes: ["deployer alert stats", "how often do deployer alerts hit", "deployer alert volume", "deployer multiplier distribution", "elite alert hit rate"],
  description:
    "Deployer alert volume over a lookback window, with bond-rate and market-cap-multiplier distributions (pct_2x / pct_5x / pct_10x / pct_50x, average and best) broken out per tier. This is the action for sizing your deployer-hunter usage and for answering 'how often does an elite-tier alert actually 10x?' with a measured number rather than a guess. Requires an msk_ key.",
  examples: [
    [{ input: { period: "30d" }, output: { status: "success" }, explanation: "30-day alert hit-rate distribution" }],
  ],
  schema: z.object({
    period: z.string().optional().describe("Lookback window, e.g. '24h', '7d', '30d'"),
  }),
  handler: async (agent: unknown, input: { period?: string }) => {
    try {
      return { status: "success", result: await deployerAlertStats(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerBestTokensAction = {
  name: "MADEONSOL_DEPLOYER_BEST_TOKENS_ACTION",
  similes: ["best tokens from good deployers", "top performing deployer tokens", "biggest deployer wins", "best recent launches", "highest multiple tokens"],
  description:
    "Best-performing recent tokens launched by RANKED (non-unranked) Pump.fun deployers, by peak market cap multiple over the alert price. Each row carries the deployer wallet and tier alongside mc_at_bond, peak_market_cap and mc_multiplier. Requires an msk_ key.",
  examples: [
    [{ input: { period: "7d", limit: 10 }, output: { status: "success" }, explanation: "Best launches this week from graded deployers" }],
  ],
  schema: z.object({
    period: z.string().default("7d").describe("Lookback window, e.g. '24h', '7d', '30d' (default '7d')"),
    limit: z.number().min(1).max(100).default(5).describe("Rows to return (default 5)"),
  }),
  handler: async (agent: unknown, input: { period?: string; limit?: number }) => {
    try {
      return { status: "success", result: await deployerBestTokens(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};

export const deployerRecentBondsAction = {
  name: "MADEONSOL_DEPLOYER_RECENT_BONDS_ACTION",
  similes: ["recently bonded tokens", "fresh graduations", "what just bonded", "new pump.fun graduations", "recent bonds"],
  description:
    "Tokens from tracked Pump.fun deployers that just graduated to Raydium, newest first, each with time_to_bond_minutes, mc_at_bond, peak market cap and the full deployer reputation block. POLL INCREMENTALLY: pass the previous response's next_since back as `since` to fetch only what bonded after it — do not re-request the whole window each time. Requires an msk_ key.",
  examples: [
    [{ input: { limit: 20, tier: "elite" }, output: { status: "success" }, explanation: "Fresh graduations from elite deployers" }],
  ],
  schema: z.object({
    limit: z.number().min(1).max(100).default(20).describe("Page size (1–100, default 20)"),
    since: z.string().optional().describe("Incremental cursor — the previous response's next_since"),
    tier: z.enum(TIERS).optional().describe("Restrict to one deployer grade"),
    peak_mc_min: z.number().min(0).optional().describe("Floor on peak market cap (USD)"),
  }),
  handler: async (
    agent: unknown,
    input: { limit?: number; since?: string; tier?: string; peak_mc_min?: number },
  ) => {
    try {
      return { status: "success", result: await deployerRecentBonds(agent, input) };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
