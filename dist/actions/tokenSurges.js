import { z } from "zod";
import { tokenSurges } from "../tools/index.js";
export const tokenSurgesAction = {
    name: "MADEONSOL_TOKEN_SURGES_ACTION",
    similes: ["token surges", "surging tokens", "what is pumping right now", "breakout tokens", "tokens running hard", "revived tokens", "dormant tokens waking up", "momentum alerts", "surge hit rate"],
    description: "Get token surges & revivals — token momentum fires, newest first, across ALL mints. `kind=surge`: a token < 30 min old whose market cap runs hard vs its LAUNCH MC — `tier` early (≤10 min, ≥$12k, ≥3× launch) | strong (≤30 min, ≥$30k, ≥6× launch and ≥2× the 3-min low — climbing now) | breakout (≤2 min, ≥$45k, ≥8×); each tier fires once per mint and must be SUSTAINED ≥10 s (a one-tick bundle mark is a spike, not a surge). `kind=revival`: no 1-minute trade candle for ≥24 h, then confirmed ONLY by the tape (≥5 buys, ≥$500 buy volume, MC ≥1.5× the pre-dormancy close) — never by a price mark; `tier` null. Both need liquidity ≥$1.5k and ≥2% of MC, and the MC gained must be paid for by buy volume. Each row: `tape` (buys/sells/volume; `unique_buyers` null outside trade coverage — never an inferred zero), `kol` buyers, `early_buyers` (bundled / sold / sniper wallets), `deployer` reputation, `risk_flags[]` (bundled_launch, few_buyers, wash_pattern, thin_liquidity, cold_deployer, sniper_heavy, early_buyers_exiting, sell_pressure, no_tape_trades, no_prior_price, mint_authority_active, transfer_fee — EMPTY = no flag raised, NOT verified clean) and `outcome` (+1 h MC / peak / low multiples) once ≥65 min old. `stats`='1' adds per-(kind, tier) hit-rates over `days` (`up_1h_pct`, `median_peak_multiple`, `doubled_1h_pct`) — out-of-sample by construction; judge the tiers on these numbers, not their names. Filters `kind`, `tier`, `mint`, `launchpad`, `deployer_tier`, `min_mc_usd` / `max_mc_usd`, `min_buys`, `exclude_flags` (comma list; rows carrying ANY are dropped), `only_clean`='1'; cursors `since` (pagination.next_since) / `before`. The same rows are pushed live on WebSocket channel `token:surges` (events `token:surge` / `token:revival`). Retention 60 d. PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
    examples: [
        [{ input: { kind: "surge", tier: "strong", only_clean: "1", limit: 20 }, output: { status: "success" }, explanation: "Newest sustained strong surges (≥ 6× launch MC, still climbing) that carry no risk flags." }],
        [{ input: { kind: "revival", exclude_flags: "bundled_launch,sniper_heavy", min_mc_usd: 20000 }, output: { status: "success" }, explanation: "Dormant tokens that woke up with confirmed buys, dropping bundled or sniper-heavy ones." }],
        [{ input: { stats: "1", days: 7, limit: 1 }, output: { status: "success" }, explanation: "Per-tier out-of-sample hit-rates for the last 7 days." }],
    ],
    schema: z.object({
        kind: z.enum(["surge", "revival"]).optional().describe("surge = token < 30 min old running vs its launch MC; revival = dormant ≥ 24 h then confirmed buys"),
        tier: z.enum(["early", "strong", "breakout"]).optional().describe("Surge tier (surge only — 400 with kind=revival)"),
        mint: z.string().optional().describe("Filter by token mint"),
        since: z.string().optional().describe("ISO 8601 — only fires after this instant (use pagination.next_since to poll)"),
        before: z.string().optional().describe("ISO 8601 — page back: only fires before this instant (pagination.next_before)"),
        min_mc_usd: z.number().min(0).optional().describe("Market cap at fire time ≥ this USD value"),
        max_mc_usd: z.number().min(0).optional().describe("Market cap at fire time ≤ this USD value"),
        min_buys: z.number().int().min(0).optional().describe("Tape buys at fire time ≥"),
        launchpad: z.string().optional().describe("Venue at birth: pumpfun | launchlab | bags | moonshot | meteora_dbc | boop | …"),
        deployer_tier: z.enum(["elite", "good", "moderate", "rising", "cold", "unranked"]).optional().describe("Deployer reputation tier"),
        exclude_flags: z.string().optional().describe("Comma list of risk flags — rows carrying ANY are dropped (bundled_launch, few_buyers, wash_pattern, thin_liquidity, cold_deployer, sniper_heavy, early_buyers_exiting, sell_pressure, no_tape_trades, no_prior_price, mint_authority_active, transfer_fee)"),
        only_clean: z.enum(["1", "0", "true", "false"]).optional().describe("'1' = only rows with no risk flags at all"),
        stats: z.enum(["1", "0", "true", "false"]).optional().describe("'1' = include per-(kind, tier) hit-rates over `days`"),
        days: z.number().int().min(1).max(30).optional().describe("Stats window in days (1-30, default 7)"),
        limit: z.number().int().min(1).max(200).optional().describe("Rows per page (1-200, default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenSurges(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
