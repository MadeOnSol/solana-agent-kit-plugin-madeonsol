import { z } from "zod";
import { tokenRisk } from "../tools/index.js";
export const tokenRiskAction = {
    name: "MADEONSOL_TOKEN_RISK_ACTION",
    similes: ["token risk score", "is this a rug", "rug risk", "token safety score", "how safe is this token"],
    description: "Get a transparent 0–100 rug-risk/safety score for a Solana token (higher = riskier). Returns a band (safe/caution/danger), an explainable factors[] array (mint authority, freeze authority, liquidity, transfer fee, token-2022, burn, launch cohort, deployer bond rate, KOL signal, blacklist), and the raw inputs that produced the score. PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }, output: { status: "success" }, explanation: "Is this token a rug? Score its risk." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenRisk(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
