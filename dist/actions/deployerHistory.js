import { z } from "zod";
import { deployerHistory } from "../tools/index.js";
export const deployerHistoryAction = {
    name: "MADEONSOL_DEPLOYER_HISTORY_ACTION",
    similes: ["deployer history", "deployer reputation over time", "was this deployer elite", "deployer tier time-series", "backtest deployer reputation", "deployer daily snapshots"],
    description: "Get a deployer's daily reputation time-series — backtest \"was this deployer elite when it launched token X?\" without look-ahead bias. Returns `{ is_deployer, wallet, snapshots[] }` where each snapshot has `date`, `tier`, `is_tracked`, `total_deployed`, `total_bonded`, `bonding_rate`, `recent_bond_rate`, `avg_peak_mc`, `best_token_peak_mc`. `limit` is the number of days of history (1–365, default 90). PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", limit: 90 }, output: { status: "success" }, explanation: "What was this deployer's reputation tier over the last 90 days?" }],
    ],
    schema: z.object({
        wallet: z.string().describe("Deployer wallet address (base58)"),
        limit: z.number().min(1).max(365).default(90).describe("Days of history to return (1–365)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await deployerHistory(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
