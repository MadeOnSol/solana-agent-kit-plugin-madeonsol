import { z } from "zod";
import { kolAlertsRecent } from "../tools/index.js";
export const kolAlertsRecentAction = {
    name: "MADEONSOL_KOL_ALERTS_RECENT_ACTION",
    similes: ["kol alerts", "recent kol alerts", "kol signals", "live kol feed", "kol events"],
    description: "Live KOL alert feed from MadeOnSol — consensus clusters, fresh-token KOL buys, and heating-up wallets unified into one stream. Sorted by detected_at DESC then severity.",
    examples: [
        [
            { input: { window: "15m", limit: 20 }, output: { status: "success" }, explanation: "Show recent KOL alerts in the last 15 minutes" },
        ],
    ],
    schema: z.object({
        window: z.enum(["5m", "15m", "1h", "6h", "24h"]).default("15m").describe("Lookback window"),
        types: z.array(z.enum(["consensus_cluster", "fresh_token_kol_buy", "heating_up"])).optional().describe("Filter to specific alert types"),
        min_severity: z.enum(["low", "medium", "high"]).optional().describe("Minimum severity to include"),
        limit: z.number().min(1).max(200).default(50).describe("Max alerts"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await kolAlertsRecent(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
