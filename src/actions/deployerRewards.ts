import { z } from "zod";
import { deployerRewards } from "../tools/index.js";

export const deployerRewardsAction = {
  name: "MADEONSOL_DEPLOYER_REWARDS_ACTION",
  similes: ["deployer creator fees", "how much did this deployer earn", "deployer fee rewards", "creator fee income", "who got the creator fees", "redirected fees"],
  description:
    "pump.fun creator-fee rewards for a wallet, answered two ways that are never merged: `collected` (what actually reached the wallet — direct vault claims kept 90 days, social-handle claims, shareholder payouts on any token) and `attributed` (every payout on the tokens it deployed, split `to_self`/`to_others` + `redirected_pct`). Every money field is `{sol, usdc, usd}`; `usd` is `null` (never a silent 0) when a SOL amount exists and no SOL price was available. `top_tokens`/`top_recipients` (up to 10, USD-sorted) show where attributed fees went. Works for non-deployers too (`is_deployer: false`, `attributed` empty). PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" }, output: { status: "success" }, explanation: "How much has this deployer earned in creator fees, and where did the redirected share go?" }],
  ],
  schema: z.object({
    wallet: z.string().describe("Wallet address (base58)"),
  }),
  handler: async (agent: unknown, input: { wallet: string }) => {
    try {
      const data = await deployerRewards(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
