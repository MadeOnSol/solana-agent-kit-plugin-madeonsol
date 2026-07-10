import { z } from "zod";
import { tokenTrades } from "../tools/index.js";

export const tokenTradesAction = {
  name: "MADEONSOL_TOKEN_TRADES_ACTION",
  similes: ["token trades", "trade tape", "trade history for token", "who bought this token", "who sold this token", "token transactions"],
  description:
    "Get the raw trade tape for a Solana token — every captured trade, cursor-paginated newest first. Each trade carries tx_signature, wallet_address, action (buy/sell), sol_amount, token_amount, price_sol/price_usd, early_buyer_rank, slot, block_time. Filter by action, wallet, and since/until (unix seconds); the default window is the FULL history. Coverage honesty: the tape starts 2026-04-12 and is pump.fun-pipeline scoped (see the response coverage block) — trades outside that pipeline are not on the tape. PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [
      {
        input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", limit: 100, action: "buy" },
        output: { status: "success" },
        explanation: "Fetch the most recent 100 buys on a token's trade tape",
      },
    ],
  ],
  schema: z.object({
    mint: z.string().describe("Token mint address (base58)"),
    limit: z.number().min(1).max(500).optional().describe("Trades per page (1-500, default 100)"),
    cursor: z.string().optional().describe("Opaque cursor from next_cursor of a previous page"),
    action: z.enum(["buy", "sell"]).optional().describe("Filter by trade direction"),
    wallet: z.string().optional().describe("Filter to a single wallet address"),
    since: z.number().optional().describe("Unix epoch seconds lower bound (default: full history)"),
    until: z.number().optional().describe("Unix epoch seconds upper bound (default: now)"),
  }),
  handler: async (agent: unknown, input: { mint: string; limit?: number; cursor?: string; action?: "buy" | "sell"; wallet?: string; since?: number; until?: number }) => {
    try {
      const data = await tokenTrades(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
