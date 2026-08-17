import { z } from "zod";
import { tokenUnlocks } from "../tools/index.js";
export const tokenUnlocksAction = {
    name: "MADEONSOL_TOKEN_UNLOCKS_ACTION",
    similes: ["upcoming unlocks", "token unlocks", "unlock schedule", "unlocks this week", "vesting cliffs", "what unlocks soon", "biggest unlocks", "supply hitting the market"],
    description: "Get upcoming token UNLOCK EVENTS across all active lock / vesting contracts (Streamflow, Jupiter Lock, Bonfida) inside a window — cliffs, periodic releases (hourly or coarser) and final unlocks — i.e. which tokens have locked supply hitting the market this week, how much, from whose lock. One entry per active contract = its NEXT unlock event in the window: `unlock_at`, `in_seconds`, `event` (cliff | period | final | tranche), `amount_raw` / `amount` / `amount_usd` / `amount_pct_of_supply` for that event, plus `window_amount_*` = that contract's TOTAL release over the whole window, `mint`, `token` {symbol, name, decimals, price_usd, market_cap_usd} and `lock` (subset of the MADEONSOL_TOKEN_LOCKS_ACTION row: lock_account, program, kind, sender, recipient, cancelable_by_sender). Continuous per-second streams (Streamflow payroll) contribute only their cliff / final events. `within` = 1h | 6h | 24h | 3d | 7d | 14d | 30d | 90d (default 7d); `sort` = soonest (default) | largest_usd | largest_pct; filters `mint` / `program` / `kind` / `min_usd` (next-event amount ≥, needs a known price) / `min_pct_of_supply`. Response { window {within, from, to}, unlocks[], pagination {limit, count, total_in_window, has_more} }. Base-unit amounts are digit STRINGS; usd null when price is unknown or phantom (implied MC > $100B). Token/vesting locks only — LP locks not included. PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
    examples: [
        [{ input: { within: "7d", sort: "largest_usd" }, output: { status: "success" }, explanation: "What are the biggest token unlocks in the next 7 days?" }],
        [{ input: { mint: "NUGye8S6CV82ZNrauf5YfXL2xJxvSvfiMAvy2U1sAVk", within: "30d" }, output: { status: "success" }, explanation: "When does locked supply of this token unlock over the next month?" }],
    ],
    schema: z.object({
        within: z.enum(["1h", "6h", "24h", "3d", "7d", "14d", "30d", "90d"]).optional().describe("Look-ahead window (default 7d)"),
        mint: z.string().optional().describe("Filter by token mint"),
        program: z.enum(["streamflow", "jupiter_lock", "bonfida_vesting"]).optional().describe("Filter by locker program"),
        kind: z.enum(["lock", "vesting"]).optional().describe("lock | vesting"),
        min_usd: z.number().min(0).optional().describe("Next-event amount ≥ this USD value (needs a known price)"),
        min_pct_of_supply: z.number().min(0).max(100).optional().describe("Next-event amount ≥ this % of supply"),
        sort: z.enum(["soonest", "largest_usd", "largest_pct"]).optional().describe("Ordering (default soonest)"),
        limit: z.number().int().min(1).max(200).optional().describe("Rows per page (1-200, default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenUnlocks(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
