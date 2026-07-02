import { z } from "zod";
import { tokenFlow } from "../tools/index.js";
export const tokenFlowAction = {
    name: "MADEONSOL_TOKEN_FLOW_ACTION",
    similes: ["token flow", "net flow", "buy sell flow", "buy pressure", "sell pressure", "net sol flow"],
    description: "Get net buy/sell flow for a Solana token over a rolling window (1h or 24h). Returns unique wallet/buyer/seller counts, buy/sell trade counts, buy/sell/net SOL, and trades-per-wallet. Default window is 1h. PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", window: "24h" }, output: { status: "success" }, explanation: "Get the 24h net buy/sell flow for this token." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        window: z.enum(["1h", "24h"]).optional().describe("Rolling window (default 1h)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenFlow(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
