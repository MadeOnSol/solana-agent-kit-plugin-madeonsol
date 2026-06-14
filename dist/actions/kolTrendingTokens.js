import { z } from "zod";
import { kolTrendingTokens } from "../tools/index.js";
export const kolTrendingTokensAction = {
    name: "MADEONSOL_KOL_TRENDING_TOKENS_ACTION",
    similes: ["trending tokens", "kol volume", "what are kols buying now", "hot buys", "kol capital flow"],
    description: "Get tokens ranked by KOL buy volume — pure capital-flow signal. Sub-hour periods (5m/15m/30m) require PRO/ULTRA. Costs $0.005 USDC per request.",
    examples: [
        [{ input: { period: "1h", min_kols: 2 }, output: { status: "success" }, explanation: "Get tokens with highest KOL buy volume in the last hour, with at least 2 KOLs buying" }],
    ],
    schema: z.object({
        period: z.enum(["5m", "15m", "30m", "1h", "2h", "4h", "12h"]).default("1h").describe("Time window"),
        min_kols: z.number().min(1).max(20).default(1).describe("Minimum KOL buyers"),
        limit: z.number().min(1).max(50).default(20).describe("Number of tokens"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolTrendingTokens(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
