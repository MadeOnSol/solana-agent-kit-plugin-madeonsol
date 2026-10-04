import { z } from "zod";
import { kolAlertsRecent } from "../tools/index.js";

export const kolAlertsRecentAction = {
  name: "MADEONSOL_KOL_ALERTS_RECENT_ACTION",
  similes: ["kol alerts", "recent kol alerts", "kol signals", "live kol feed", "kol events"],
  description:
    "Live KOL alert feed from MadeOnSol — consensus clusters, fresh-token KOL buys, and heating-up wallets unified into one stream. Sorted by detected_at DESC then severity.",
  examples: [
    [
      { input: { window: "1h", limit: 20 }, output: { status: "success" }, explanation: "Show recent KOL alerts in the last hour" },
    ],
  ],
  schema: z.object({
    window: z.enum(["1h", "6h", "24h"]).default("6h").describe("Lookback window (1h, 6h or 24h; default 6h)"),
    types: z.array(z.enum(["consensus_cluster", "fresh_token_kol_buy", "heating_up"])).optional().describe("Filter to specific alert types"),
    limit: z.number().min(1).max(100).default(30).describe("Max alerts (1-100)"),
  }),
  handler: async (
    agent: unknown,
    input: { window?: "1h" | "6h" | "24h"; types?: string[]; limit?: number },
  ) => {
    try {
      const data = await kolAlertsRecent(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
