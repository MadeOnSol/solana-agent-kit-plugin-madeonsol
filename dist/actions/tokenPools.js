import { z } from "zod";
import { tokenPools } from "../tools/index.js";
export const tokenPoolsAction = {
    name: "MADEONSOL_TOKEN_POOLS_ACTION",
    similes: ["token pools", "liquidity map", "which dex pools", "pool fragmentation", "where does this token trade", "top pool share"],
    description: "Get the per-venue liquidity map for a Solana token — every DEX pool the token trades in (live vs parked), plus how fragmented its liquidity is and what share sits in the top pool. Returns a `pools[]` list (`pool_address`, `dex`, `quote_mint`, `liquidity_usd`, `last_price_sol`, `last_swap_at`, `amm_id`, `is_active`) and a `summary` (`pool_count`, `active_pool_count`, `dex_count`, `dexes`, `total_liquidity_usd`, `primary_pool`, `primary_dex`, `top_pool_share_pct`). PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }, output: { status: "success" }, explanation: "Which DEX pools does this token trade in, and how fragmented is its liquidity?" }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenPools(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
