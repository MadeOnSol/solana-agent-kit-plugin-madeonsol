import { z } from "zod";
import { tokenRiskBatch } from "../tools/index.js";
export const tokenRiskBatchAction = {
    name: "MADEONSOL_TOKEN_RISK_BATCH_ACTION",
    similes: ["batch token risk", "bulk rug risk", "score many tokens", "risk score multiple tokens", "rug check list"],
    description: "Bulk 0–100 rug-risk/safety scoring for 1–50 Solana token mints in one call (higher = riskier). Returns { tokens, count }: each tracked mint has the same shape as the single-mint risk score (band, factors[], inputs) plus an `as_of` ISO timestamp; untracked mints come back as { mint, error: \"not_tracked\" } and do NOT fail the batch. Order follows the de-duplicated input; counts as one request against quota. PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [
            {
                input: { mints: ["7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"] },
                output: { status: "success" },
                explanation: "Score the rug risk of several tokens at once",
            },
        ],
    ],
    schema: z.object({
        mints: z.array(z.string()).min(1).max(50).describe("1-50 token mint addresses (base58)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenRiskBatch(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
