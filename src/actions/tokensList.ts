import { z } from "zod";
import { tokensList } from "../tools/index.js";

export const tokensListAction = {
  name: "MADEONSOL_TOKENS_LIST_ACTION",
  similes: [
    "token list",
    "filter tokens",
    "token directory",
    "scan tokens",
    "tokens by market cap",
    "tokens by liquidity",
    "tokens by dex",
    "find tokens",
  ],
  description:
    "Filtered, sortable token directory (PRO+). Default `min_liq=2000` skips dust. Supports MC band, liquidity floor, recent-activity window, primary DEX, authority flags, computed 1h volume floor, MEV-share ceiling, MC change deltas.",
  examples: [
    [
      {
        input: { min_mc: 100000, max_mc: 5000000, primary_dex: "pumpswap", sort: "cumulative_volume_desc", limit: 25 },
        output: { status: "success" },
        explanation: "List PumpSwap tokens between $100K and $5M MC sorted by cumulative volume",
      },
    ],
  ],
  schema: z.object({
    min_mc: z.number().min(0).optional().describe("Minimum market cap USD"),
    max_mc: z.number().min(0).optional().describe("Maximum market cap USD"),
    min_liq: z.number().min(0).optional().describe("Minimum liquidity USD (default 2000 — skips dust)"),
    active_h: z.number().min(1).max(168).optional().describe("Only tokens with a trade in the last N hours"),
    primary_dex: z
      .enum(["pumpfun", "pumpswap", "raydium", "meteora", "orca", "letsbonk", "other"])
      .optional()
      .describe("Filter by primary DEX venue"),
    authority_revoked: z.boolean().optional().describe("Only tokens with mint+freeze authorities revoked"),
    exclude_token2022: z.boolean().optional().describe("Skip Token-2022 mints (transfer fees / hooks)"),
    min_lp_burnt_pct: z.number().min(0).max(100).optional().describe("Minimum % of LP tokens burnt"),
    min_volume_1h_usd: z.number().min(0).optional().describe("Minimum computed 1h volume USD"),
    max_mev_share_pct: z.number().min(0).max(100).optional().describe("Maximum MEV-share % of recent buys"),
    mc_change_1h_min_pct: z.number().optional().describe("Minimum 1h MC change %"),
    mc_change_1h_max_pct: z.number().optional().describe("Maximum 1h MC change %"),
    min_liq_mc_ratio: z.number().min(0).optional().describe("Minimum liquidity-to-MC ratio (depth gauge)"),
    max_liq_mc_ratio: z.number().min(0).optional().describe("Maximum liquidity-to-MC ratio"),
    deployer_tier: z.enum(["elite", "good", "moderate", "rising", "cold", "unranked"]).optional().describe("Filter by deployer reputation tier"),
    sort: z
      .enum(["mc_desc", "mc_asc", "last_trade_desc", "liquidity_desc", "cumulative_volume_desc"])
      .optional()
      .describe("Sort order"),
    limit: z.number().min(1).max(100).default(20).describe("Number of tokens (max 100)"),
    offset: z.number().min(0).optional().describe("Pagination offset"),
  }),
  handler: async (
    agent: unknown,
    input: {
      min_mc?: number;
      max_mc?: number;
      min_liq?: number;
      active_h?: number;
      primary_dex?: "pumpfun" | "pumpswap" | "raydium" | "meteora" | "orca" | "letsbonk" | "other";
      authority_revoked?: boolean;
      exclude_token2022?: boolean;
      min_lp_burnt_pct?: number;
      min_volume_1h_usd?: number;
      max_mev_share_pct?: number;
      mc_change_1h_min_pct?: number;
      mc_change_1h_max_pct?: number;
      min_liq_mc_ratio?: number;
      max_liq_mc_ratio?: number;
      deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
      sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc";
      limit?: number;
      offset?: number;
    },
  ) => {
    try {
      const data = await tokensList(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
