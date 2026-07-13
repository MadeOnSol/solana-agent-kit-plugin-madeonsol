import { z } from "zod";
import { tokenDepth } from "../tools/index.js";

export const tokenDepthAction = {
  name: "MADEONSOL_TOKEN_DEPTH_ACTION",
  similes: ["token depth", "price impact", "slippage", "market depth", "how much sol to move the price", "liquidity depth"],
  description:
    "Get per-pool price-impact / slippage for a Solana token — how much SOL moves the price N% and the impact of each buy size, per pool (NOT router-optimal). Each computable pool returns spot_price_sol, fee_pct, quotes per SOL size (tokens_out, avg_price_sol, price_impact_pct), and to_move_price (SOL to move price 1%/5%/10%). Constant-product AMMs come from stream reserves (source=stream); pump.fun/bonk curves from a live read of virtual reserves (source=live_rpc). Unsupported pools (CLMM/Orca/DLMM, Meteora-DBC, unclassified) are returned in unsupported_pools with a reason instead of a wrong number. PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", sizes: [0.5, 1, 5, 10] }, output: { status: "success" }, explanation: "Get per-pool price impact and the SOL needed to move this token's price 1%/5%/10%." }],
  ],
  schema: z.object({
    mint: z.string().describe("Token mint address (base58)"),
    sizes: z.array(z.number().gt(0).max(10000)).min(1).max(8).optional()
      .describe("SOL buy sizes to quote (max 8, each >0 and ≤10000). Default [0.5, 1, 5, 10]"),
  }),
  handler: async (agent: unknown, input: { mint: string; sizes?: number[] }) => {
    try {
      const data = await tokenDepth(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
