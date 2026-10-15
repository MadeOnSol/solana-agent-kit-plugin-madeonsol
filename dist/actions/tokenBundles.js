import { z } from "zod";
import { tokenBundles, tokenBundleShare } from "../tools/index.js";
export const tokenBundlesAction = {
    name: "MADEONSOL_TOKEN_BUNDLES_ACTION",
    similes: ["bundle clusters", "coordinated buys", "later bundles", "buy clusters", "same slot clusters"],
    description: "List every coordinated buy cluster on a Solana token: slots in a 1h/6h/24h window (default 24h) where at least min_wallets (3-20, default 3) distinct wallets bought, the launch bundle and clusters that enter later. Per cluster: slot, at, phase (launch/later), wallet_count, new_wallets, atomic_txs, sol_volume, wallets, exit. Only stored buys count (0.05 SOL / $3.50 stable-leg floor); summary.baseline shows buys per active slot, so a cluster is evidence, not a verdict. include_balances adds held_now to the 3 most recent clusters. PRO+, API key only (no x402 route).",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", window: "6h" }, output: { status: "success" }, explanation: "List the buy clusters on this token in the last 6 hours." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        window: z.enum(["1h", "6h", "24h"]).optional().describe("Lookback window (default 24h)"),
        min_wallets: z.number().int().min(3).max(20).optional().describe("Minimum distinct buyers in one slot (default 3)"),
        limit: z.number().int().min(1).max(100).optional().describe("Max clusters (1-100, default 50)"),
        include_balances: z.boolean().optional().describe("Add held_now (current chain balances) to the 3 most recent clusters"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenBundles(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const tokenBundleShareAction = {
    name: "MADEONSOL_TOKEN_BUNDLE_SHARE_ACTION",
    similes: ["bundle share", "bundled supply now", "how much supply do bundles hold now", "bundled percent of supply"],
    description: "Get one figure for a Solana token: bundled_pct_of_supply_now (0-1), the share of supply held right now by every bundle wallet (launch bundle plus the window's buy clusters, each wallet once), read from chain balances. It is null with a reason (held_now.incomplete_reason) unless every wallet was read, never a partial sum. scope launch_cohort_only = only the launch bundle was counted. Cached 30 s per token. PRO+, API key only (no x402 route).",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }, output: { status: "success" }, explanation: "How much of supply all bundle wallets hold now." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        window: z.enum(["1h", "6h", "24h"]).optional().describe("Which later clusters to include (default 24h; the launch bundle is always included)"),
        min_wallets: z.number().int().min(3).max(20).optional().describe("Minimum distinct buyers in one slot (default 3)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenBundleShare(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
