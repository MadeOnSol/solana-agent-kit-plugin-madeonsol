import { z } from "zod";
import { tokenTopTraders } from "../tools/index.js";
export const tokenTopTradersAction = {
    name: "MADEONSOL_TOKEN_TOP_TRADERS_ACTION",
    similes: ["top traders", "biggest winners", "who profited", "who made money", "best traders on this token"],
    description: "Get the wallets that made (or lost) the most on a Solana token, ranked by realized PnL or ROI, enriched with KOL and alpha-wallet reputation. limit PRO≤25/ULTRA≤100 (default 10); sort 'pnl' (default) or 'roi'; window_days 1-180 (default 90); min_bought_sol default 0.1. PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", limit: 10, sort: "pnl" }, output: { status: "success" }, explanation: "Get the top 10 traders on this token by realized PnL." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        limit: z.number().optional().describe("Max traders returned — 1-25 PRO, 1-100 ULTRA (default 10)"),
        sort: z.enum(["pnl", "roi"]).optional().describe("Rank by realized PnL (default) or ROI"),
        window_days: z.number().optional().describe("Lookback window in days (default 90)"),
        min_bought_sol: z.number().optional().describe("Exclude traders below this total SOL bought (default 0.1)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenTopTraders(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
