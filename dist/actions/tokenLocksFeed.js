import { z } from "zod";
import { tokenLocksFeed } from "../tools/index.js";
export const tokenLocksFeedAction = {
    name: "MADEONSOL_TOKEN_LOCKS_FEED_ACTION",
    similes: ["new token locks", "latest locks", "recent vesting contracts", "who just locked tokens", "lock feed", "newest locks", "biggest new locks"],
    description: "Get the cross-token feed of NEW token lock / vesting contracts — who just locked tokens, of what mint, how much, until when — newest first, across ALL mints, from Streamflow, Jupiter Lock and Bonfida vesting. Each row has the same shape as a MADEONSOL_TOKEN_LOCKS_ACTION contract (`program`, `kind`, `status`, `sender`, `recipient`, `amount_*` / `locked_*` / `claimable_*`, schedule, terms incl. `cancelable_by_sender`, `next_unlock`, `created_at`, `tx_signature`) plus `token` {symbol, name, decimals, price_usd, market_cap_usd}. Poll with `since` (cursor `pagination.next_since`), page back with `before` (`pagination.next_before`), or subscribe to WebSocket channel `token:locks` (event `token:lock`) for a push the moment the contract lands on-chain. Filters: `mint`, `sender`, `recipient`, `program`, `kind`, `status`, `min_usd`, `min_pct_of_supply` (the last three post-filter with a ×4 over-fetch, so a page may come back short), `include_estimated`='1' to include backfilled Jupiter Lock rows that have no on-chain creation time (`created_at_estimated`, excluded by default). Base-unit amounts are digit STRINGS; ui/usd/pct null when unknown. LP locks NOT included. PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
    examples: [
        [{ input: { min_usd: 10000, limit: 50 }, output: { status: "success" }, explanation: "Show the newest lock / vesting contracts worth at least $10k across all tokens." }],
        [{ input: { program: "streamflow", kind: "vesting", since: "2026-08-17T00:00:00Z" }, output: { status: "success" }, explanation: "Poll for new Streamflow vesting contracts since a cursor." }],
    ],
    schema: z.object({
        since: z.string().optional().describe("ISO 8601 — only contracts created after this instant (use pagination.next_since to poll)"),
        before: z.string().optional().describe("ISO 8601 — page back: only contracts created before this instant (pagination.next_before)"),
        mint: z.string().optional().describe("Filter by token mint"),
        sender: z.string().optional().describe("Filter by locker / creator wallet"),
        recipient: z.string().optional().describe("Filter by recipient wallet"),
        program: z.enum(["streamflow", "jupiter_lock", "bonfida_vesting"]).optional().describe("Filter by locker program"),
        kind: z.enum(["lock", "vesting"]).optional().describe("lock = whole amount at one date; vesting = cliff and/or periodic release"),
        status: z.enum(["active", "completed", "cancelled", "closed"]).optional().describe("Filter by derived status"),
        min_usd: z.number().min(0).optional().describe("Deposited amount ≥ this USD value (needs a known price; post-filter)"),
        min_pct_of_supply: z.number().min(0).max(100).optional().describe("Deposited amount ≥ this % of supply (post-filter)"),
        include_estimated: z.enum(["1", "0", "true", "false"]).optional().describe("'1' to include backfilled Jupiter Lock rows with an estimated created_at (excluded by default)"),
        limit: z.number().int().min(1).max(100).optional().describe("Rows per page (1-100, default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenLocksFeed(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
