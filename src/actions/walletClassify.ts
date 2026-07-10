import { z } from "zod";
import { walletClassify } from "../tools/index.js";

export const walletClassifyAction = {
  name: "MADEONSOL_WALLET_CLASSIFY_ACTION",
  similes: ["classify wallets", "batch wallet flags", "check wallets for snipers", "are these wallets bots", "wallet reputation batch", "screen wallet list"],
  description:
    "Bulk wallet reputation flags for 1-100 Solana wallet addresses in one call. Per wallet: is_sniper, is_bundler (lifetime flag), is_dumper (rolling 42-day window), is_kol + kol_name, bot_confidence (\"none\"|\"low\"|\"medium\"|\"high\"|null), and dump_cluster cohort stats. Flags are pump.fun-pipeline scoped — false means \"not observed by our pipeline\", NOT verified clean. Returns { wallets, count, as_of }. PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [
      {
        input: { wallets: ["ASVzakePP6GNg9r95d4LPZHJDMXun6L6E4um4pu5ybJk", "7dExkKzy4K3rC4YCVXQrPXtvmBBTnf3AjEHUUE4Kkzy8"] },
        output: { status: "success" },
        explanation: "Screen a list of wallets for sniper/bundler/dumper/KOL/bot reputation flags",
      },
    ],
  ],
  schema: z.object({
    wallets: z.array(z.string()).min(1).max(100).describe("1-100 wallet addresses (base58)"),
  }),
  handler: async (agent: unknown, input: { wallets: string[] }) => {
    try {
      const data = await walletClassify(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
