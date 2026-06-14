import { z } from "zod";
import { kolFirstTouches } from "../tools/index.js";
export const kolFirstTouchesAction = {
    name: "MADEONSOL_KOL_FIRST_TOUCHES_ACTION",
    similes: [
        "kol first touch",
        "first kol buyer",
        "scout signal",
        "smart money first buyer",
        "kol scout alert",
        "first buy by kol",
    ],
    description: "Get the most recent first-KOL-touch events on Solana tokens — the moment a tracked KOL was the first to buy a given mint. Filterable by scout tier (S/A/B/C from mv_kol_scout_score), KOL winrate, token age, mint suffix. Backtest: top scouts attract >=3 follow-on KOLs within 4h ~50% of the time vs ~14% baseline.",
    examples: [
        [
            {
                input: { preset: "scout", limit: 10 },
                output: { status: "success" },
                explanation: "Fetch 10 recent first-touch events from B-tier-or-better scouts on tokens younger than 60 minutes",
            },
        ],
    ],
    schema: z.object({
        limit: z.number().min(1).max(100).default(20).describe("Number of events (1-100)"),
        since: z.string().optional().describe("ISO timestamp — events strictly newer than this"),
        before: z.string().optional().describe("ISO timestamp — events strictly older than this (pagination cursor)"),
        kol: z.string().optional().describe("Single KOL wallet address (base58)"),
        min_kol_winrate_7d: z.number().min(0).max(100).optional(),
        min_scout_tier: z.enum(["S", "A", "B", "C"]).optional().describe("Scout tier S/A/B/C (S = highest)"),
        min_n_touches: z.number().min(1).optional(),
        strategy: z.enum(["scalper", "day_trader", "swing_trader", "hodler", "mixed"]).optional(),
        token_age_max_min: z.number().min(1).optional().describe("Only events on tokens younger than N minutes"),
        min_first_buy_sol: z.number().min(0).optional(),
        mint_suffix: z.string().optional().describe("Suffix-filter the token mint (e.g. 'pump')"),
        preset: z.enum(["scout", "fresh_launch"]).optional(),
        include: z.string().optional().describe("Comma-separated includes — currently 'followers_4h'"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolFirstTouches(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
