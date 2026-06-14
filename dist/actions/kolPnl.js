import { z } from "zod";
import { kolPnl } from "../tools/index.js";
export const kolPnlAction = {
    name: "MADEONSOL_KOL_PNL_ACTION",
    similes: ["kol pnl", "kol profit", "kol performance", "wallet pnl", "kol win rate", "kol drawdown"],
    description: "Get deep per-wallet PnL breakdown — realized PnL, win rate, profit factor, max drawdown, daily equity curve, and per-token positions via MadeOnSol API.",
    examples: [
        [{ input: { wallet: "ABC...xyz", period: "30d" }, output: { status: "success" }, explanation: "Get 30-day PnL breakdown for a KOL wallet" }],
    ],
    schema: z.object({
        wallet: z.string().describe("KOL wallet address (base58)"),
        period: z.enum(["7d", "30d", "90d", "180d"]).default("30d").describe("Time period"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolPnl(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
