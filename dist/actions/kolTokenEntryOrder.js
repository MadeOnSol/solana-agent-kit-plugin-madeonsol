import { z } from "zod";
import { kolTokenEntryOrder } from "../tools/index.js";
export const kolTokenEntryOrderAction = {
    name: "MADEONSOL_KOL_TOKEN_ENTRY_ORDER_ACTION",
    similes: ["who bought first", "first kol buyers", "kol entry order", "token entry ranking"],
    description: "Get the ranked order of KOL first-buyers for a specific Solana token. Each entry includes seconds_after_first relative to the first KOL entry. PRO+ adds percentile_pnl_7d per entry.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", limit: 20 }, output: { status: "success" }, explanation: "Who were the first 20 KOLs to buy this token?" }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        limit: z.number().min(1).max(200).default(50).describe("Max ranked entries"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolTokenEntryOrder(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
