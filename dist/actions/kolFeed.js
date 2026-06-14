import { z } from "zod";
import { kolFeed } from "../tools/index.js";
export const kolFeedAction = {
    name: "MADEONSOL_KOL_FEED_ACTION",
    similes: ["kol trades", "what are kols buying", "kol feed", "smart money trades", "kol activity"],
    description: "Get real-time Solana KOL trades from 1,000+ tracked wallets via MadeOnSol x402 API. Costs $0.005 USDC per request.",
    examples: [
        [{ input: { limit: 10, action: "buy" }, output: { status: "success" }, explanation: "Fetch the 10 most recent KOL buy trades" }],
    ],
    schema: z.object({
        limit: z.number().min(1).max(100).default(10).describe("Number of trades"),
        action: z.enum(["buy", "sell"]).optional().describe("Filter by trade type"),
        kol: z.string().optional().describe("Filter by KOL wallet address"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolFeed(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
