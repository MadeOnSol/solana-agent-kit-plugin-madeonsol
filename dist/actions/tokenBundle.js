import { z } from "zod";
import { tokenBundle } from "../tools/index.js";
export const tokenBundleAction = {
    name: "MADEONSOL_TOKEN_BUNDLE_ACTION",
    similes: ["token bundle holdings", "bundle wallets", "same slot buyers", "insider bundle", "how much do bundlers still hold"],
    description: "Get bundle-cohort holdings for a Solana token — which same-slot 'bundle' wallets (≥3 buying in one slot) bought the token and how much of supply they STILL hold (the held_pct_of_supply rug/insider signal, from confirmed on-chain data). Returns a bundle summary (wallet_count, bundle_kind, held_ratio, held_pct_of_supply headline, fully_exited, buy_volume, tokens_held) and a wallets[] list. BASIC/TRADER get the bundle block only; PRO gets top-10 flags-only; ULTRA gets full holdings + wallet identity (kol_name, win_rate, bot_confidence). PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }, output: { status: "success" }, explanation: "How much of this token do the bundle wallets still hold?" }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenBundle(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
