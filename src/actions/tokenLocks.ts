import { z } from "zod";
import { tokenLocks } from "../tools/index.js";
import type { TokenLocksParams } from "../tools/index.js";

export const tokenLocksAction = {
  name: "MADEONSOL_TOKEN_LOCKS_ACTION",
  similes: ["token locks", "token vesting", "locked tokens", "team lock", "vesting schedule", "is the supply locked", "did the team lock", "can the team unlock", "streamflow lock", "jupiter lock"],
  description:
    "Get the token locks & vesting contracts on a Solana mint — every on-chain Streamflow stream, Jupiter Lock vesting escrow and Bonfida token-vesting account, decoded from the locker programs' account state, plus a summary. Answers 'did the team lock, how much, until when, and can they pull it'. Each contract: `program` (streamflow | jupiter_lock | bonfida_vesting), `kind` (lock = whole amount at one date | vesting = cliff / periodic release), `status` (active | completed | cancelled | closed — derived at request time), `sender` / `recipient`, the schedule (`start_at` / `cliff_at` / `end_at`, `period_seconds`, `continuous`, `amount_per_period`, `cliff_amount`, `perpetual`), the terms (`cancelable_by_sender` — the locker can cancel, so funds are locked against the RECIPIENT not the locker; `cancelable_by_recipient`, `transferable`, `can_topup`) and a LIVE-derived view (`locked_*`, `unlocked_*`, `withdrawn_*`, `claimable_*`, `next_unlock` {at, kind cliff|period|final|tranche, amount}). `summary`: `lock_count` (exact), `complete` (false above 5000 contracts — newest 5000 considered), `active_count`, `by_program` / `by_kind`, `distinct_lockers`, locked / deposited totals (raw, ui, usd, % of supply), `unlocking_7d_*` / `unlocking_30d_*` forward schedule, nearest `next_unlock`, `active_cancelable_by_sender`. Every `*_raw` amount is a base-unit digit STRING — never a float; ui/usd/pct are null when decimals or price are unknown (`token.facts_resolved`). `status` / `program` filter the list only — the summary always covers all rows. LP LOCKS ARE NOT INCLUDED (token/vesting locks only). PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
  examples: [
    [{ input: { mint: "NUGye8S6CV82ZNrauf5YfXL2xJxvSvfiMAvy2U1sAVk", status: "active" }, output: { status: "success" }, explanation: "Did the team lock this token, how much is still locked, when does it unlock, and can the locker cancel?" }],
  ],
  schema: z.object({
    mint: z.string().describe("Token mint address (base58)"),
    status: z.enum(["active", "completed", "cancelled", "closed"]).optional().describe("Filter the list by derived status (summary always covers all rows)"),
    program: z.enum(["streamflow", "jupiter_lock", "bonfida_vesting"]).optional().describe("Filter by locker program"),
    limit: z.number().int().min(1).max(500).optional().describe("Max contracts to return (1-500, default 200)"),
  }),
  handler: async (agent: unknown, input: TokenLocksParams) => {
    try {
      const data = await tokenLocks(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
