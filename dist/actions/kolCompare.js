import { z } from "zod";
import { kolCompare } from "../tools/index.js";
export const kolCompareAction = {
    name: "MADEONSOL_KOL_COMPARE_ACTION",
    similes: ["compare kols", "compare wallets", "kol comparison", "side by side kols"],
    description: "Side-by-side comparison of 2-5 Solana KOL wallets on MadeOnSol — strategy, winrates, ROI, PnL percentiles. PRO+ adds overlap tokens (bought by 2+ in last 30d). BASIC=2, PRO=4, ULTRA=5.",
    examples: [
        [
            { input: { wallets: ["WalletA", "WalletB"] }, output: { status: "success" }, explanation: "Compare two KOL wallets side-by-side" },
        ],
    ],
    schema: z.object({
        wallets: z.array(z.string()).min(2).max(5).describe("2-5 wallet addresses"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolCompare(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
