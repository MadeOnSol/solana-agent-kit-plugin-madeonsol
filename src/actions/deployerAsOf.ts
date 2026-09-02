import { z } from "zod";
import { deployerAsOf } from "../tools/index.js";

export const deployerAsOfAction = {
  name: "MADEONSOL_DEPLOYER_AS_OF_ACTION",
  similes: ["deployer reputation as of a date", "deployer point in time", "what tier was this deployer on", "deployer backtest snapshot", "deployer reputation on that day"],
  description:
    "A pump.fun deployer's reputation exactly as it stood on a given date — the latest write-on-change snapshot at or before it, so a backtest sees only what was knowable then. Returns `{ is_deployer, wallet, requested_date, as_of, snapshot, first_snapshot_date, note }`. `snapshot` is `null` and `as_of` is `false` when nothing existed yet at or before `date` — nothing is ever synthesized. `date` defaults to today (UTC) and must be >= 2026-04-07. PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", date: "2026-08-15" }, output: { status: "success" }, explanation: "What tier was this deployer on 2026-08-15?" }],
  ],
  schema: z.object({
    wallet: z.string().describe("Deployer wallet address (base58)"),
    date: z.string().optional().describe("YYYY-MM-DD (UTC). Default: today. Must be >= 2026-04-07 and not in the future."),
  }),
  handler: async (agent: unknown, input: { wallet: string; date?: string }) => {
    try {
      const data = await deployerAsOf(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
