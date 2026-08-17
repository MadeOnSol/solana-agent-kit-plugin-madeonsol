import { z } from "zod";
import { tokenFeeShares } from "../tools/index.js";

export const tokenFeeSharesAction = {
  name: "MADEONSOL_TOKEN_FEE_SHARES_ACTION",
  similes: ["fee shares", "creator fee sharing", "who gets the creator fees", "fee split", "sharing config", "creator fee recipients", "fees redirected", "pump fun fee sharing"],
  description:
    "Get the pump.fun creator-fee SHARING config of a coin — who receives what share of its creator fees. Decodes the on-chain SharingConfig of the pump_fees program (PDA ['sharing-config', mint]): `config` {sharing_config, admin, admin_revoked, status, version, `is_default` (true = 100% to the admin/creator — a REAL answer, not 'no data'), `redirected_bps` / `redirected_pct` (share going to non-admin addresses), `social_bps` / `social_pct`, `shareholders[]` {address, share_bps, share_pct, `is_admin` (the config admin, normally the coin creator), `is_social_pda` (the address is a pump_fees SocialFeePda — fees earmarked for a platform identity such as an X account), `social` {platform (2 = X), platform_label, user_id (the platform-native NUMERIC id, not the handle), lifetime_claimed_raw / lifetime_claimed / lifetime_claimed_usd, last_claimed_at}, received_raw / received / received_usd, payout_count, last_payout_at}, `source` ('stream' = our table, which only stores NON-default configs; 'chain' = live PDA read), updated_at}. `config` is null with `config_error` set only when the live read failed on every RPC endpoint. Plus `quote` {symbol, decimals, sol_usd}, `distributions` {count, total_raw / total / total_usd, last_at, recipients[] (per-recipient received totals), past_recipients[] (no longer in the split), payouts_considered, payouts_truncated}, `history[]` (config created / updated / reset, creator transferred — newest first) and `recent_distributions[]` {at, tx_signature, amount_*, shareholders[], actor}. Amounts are quote base units (SOL lamports unless a stable-quoted coin) as digit STRINGS; ui/usd null when unknown. EVENT HISTORY (distributions, history) STARTS 2026-08-17 — the config itself is current on-chain state. Use MADEONSOL_TOKEN_FEE_CLAIMS_ACTION for the cross-token event feed. PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
  examples: [
    [{ input: { mint: "E2rQLGJxb1pq4u4AoXSAmqTbspupMXfgfbJsXU5npump" }, output: { status: "success" }, explanation: "Who receives this coin's pump.fun creator fees — is the split redirected to other wallets or an X account?" }],
  ],
  schema: z.object({
    mint: z.string().describe("pump.fun coin mint address (base58)"),
  }),
  handler: async (agent: unknown, input: { mint: string }) => {
    try {
      const data = await tokenFeeShares(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
