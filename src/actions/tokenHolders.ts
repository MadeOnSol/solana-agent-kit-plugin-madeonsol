import { z } from "zod";
import { tokenHolders } from "../tools/index.js";

export const tokenHoldersAction = {
  name: "MADEONSOL_TOKEN_HOLDERS_ACTION",
  similes: ["token holders", "holder count", "how many holders", "top holders", "holder concentration", "who holds this token", "whale concentration"],
  description:
    "Get the live holder census + concentration for a Solana token — WHO HOLDS NOW (the cap table = who bought first). Read live from the ledger at confirmed: every token account of the mint (mint-scoped getProgramAccounts) merged per owner, so `concentration.holder_count` is EXACT (distinct non-zero owners minus excluded pools/curves/burns); it is null ONLY when the provider refuses the census for a mega-cap — then a top-20 getTokenLargestAccounts fallback with `source.census_fallback_reason` set — never estimated from trades. Every disclosed owner carries `labels[]` from MadeOnSol wallet intelligence (`deployer` / `kol` / `early_buyer` / `buyer` / `bundle` / `bot` / `dump_cluster`; empty = unknown to us, NOT verified clean). Liquidity pools, bonding curves, vaults and burn addresses are EXCLUDED from the circulating denominator and NAMED in `excluded[]` (`reason`: `pool` + `dex` + `pool_address` | `bonding_curve` | `burn` | `program_account`); `concentration` splits them into `pool_pct` / `burned_pct` / `program_pct` over TOTAL supply, while `top1/10/20/50/100_share` and `deployer/kol/early_buyer/bundle/bot/dump_cluster_pct` are over circulating. `amount_raw` / `supply_raw` / `circulating_raw` are raw u64 STRINGS — never floats. Disclosure PRO ranks 1–10, ULTRA 1–50, BUSINESS 1–100 (maths tier-independent). Large established tokens take 5–30 s to enumerate upstream: the first call may fail with HTTP 503 `holder_scan_in_progress` (`retry_after_seconds: 20`) — the scan continues and is cached, so retry after ~20 s and the answer is instant. PRO/ULTRA only — BASIC receives HTTP 403.",
  examples: [
    [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" }, output: { status: "success" }, explanation: "How many holders does this token have, how concentrated is it, and are the top holders KOLs, bundlers or bots?" }],
  ],
  schema: z.object({
    mint: z.string().describe("Token mint address (base58)"),
  }),
  handler: async (agent: unknown, input: { mint: string }) => {
    try {
      const data = await tokenHolders(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
