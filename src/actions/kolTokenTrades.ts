import { z } from "zod";
import { kolTokenTrades } from "../tools/index.js";

export const kolTokenTradesAction = {
  name: "MADEONSOL_KOL_TOKEN_TRADES_ACTION",
  similes: ["kol trades on token", "which kols traded this token", "kol buys and sells on token", "kol activity on token"],
  description:
    "List every stored KOL trade on one Solana token, newest first: kol_name, wallet, action, sol_amount, token_amount, price and market cap at the trade, tx_signature, traded_at. Keyset paged with next_cursor / has_more. Filter by action, kol (wallet) and since (ISO time). BASIC gets a 5-minute delay and 20 rows. KOL trades below the persistence floor (0.05 SOL / $3.50 stable leg) are not stored. API key only (no x402 route).",
  examples: [
    [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", action: "buy", limit: 50 }, output: { status: "success" }, explanation: "The 50 most recent KOL buys on this token." }],
  ],
  schema: z.object({
    mint: z.string().describe("Token mint address (base58)"),
    limit: z.number().int().min(1).max(200).optional().describe("Trades per page (1-200, default 100; BASIC is clamped to 20)"),
    action: z.enum(["buy", "sell"]).optional().describe("Filter by trade direction"),
    kol: z.string().optional().describe("Only this KOL wallet"),
    since: z.string().optional().describe("Only trades strictly after this ISO 8601 time"),
    cursor: z.string().optional().describe("next_cursor from the previous page"),
  }),
  handler: async (agent: unknown, input: { mint: string; limit?: number; action?: "buy" | "sell"; kol?: string; since?: string; cursor?: string }) => {
    try {
      const data = await kolTokenTrades(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
