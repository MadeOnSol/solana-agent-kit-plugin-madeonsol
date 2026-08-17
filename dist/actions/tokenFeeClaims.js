import { z } from "zod";
import { tokenFeeClaims } from "../tools/index.js";
export const tokenFeeClaimsAction = {
    name: "MADEONSOL_TOKEN_FEE_CLAIMS_ACTION",
    similes: ["fee claims", "fee events", "creator fee distributions", "social fee claims", "x account fee claims", "who claimed pump fees", "fee payouts", "pump fun fee feed"],
    description: "Get the pump.fun FEE-EVENT feed, newest first, across all coins: `type` = distribution (creator fees paid out pro-rata to the SharingConfig shareholders — fees redirected to others — with `payouts[]` {address, share_bps, amount_raw, amount, amount_usd} per address) | social_claim (fees earmarked for a platform identity — `social.platform` 2 = X, `social.user_id` = the platform-native numeric id — claimed to a `recipient` wallet; `mint` is NULL) | shares_created / shares_updated / shares_reset (SharingConfig changes, with `shareholders[]` {address, share_bps}) | creator_transferred (creator role moved; `recipient` = new creator) | creator_claim (the plain creator vault claim — per CREATOR, carries NO mint; EXCLUDED unless requested via `type`). Each event: `id`, `type`, `at`, `tx_signature`, `slot`, `mint`, `admin`, `actor` (transaction signer), `recipient`, `amount_raw` (quote base units — SOL lamports unless a stable-quoted coin — as a digit STRING), `amount`, `amount_usd`, `quote`, `social` {platform, platform_label, user_id, pda}, `shareholders`, `payouts`, `payload` (full decoded Anchor event). Default 100%-to-creator configs and zero-amount distributions are NOT stored. Poll with `since` (cursor `pagination.next_since`), page back with `before` (`pagination.next_before`), or subscribe to WebSocket channel `token:fee_claims` (event `token:fee_claim`) for a push the moment the tx confirms. Filters: `type` (comma list), `mint`, `recipient` (payout / claim recipient wallet, or new creator), `actor`, `social_platform` (raw platform id, 2 = X), `social_user_id`, `min_sol` (amount floor in SOL). HISTORY STARTS 2026-08-17. Use MADEONSOL_TOKEN_FEE_SHARES_ACTION for one coin's current split. PRO/ULTRA only — BASIC receives HTTP 403; keyed API only (no x402 route).",
    examples: [
        [{ input: { type: "distribution", min_sol: 1 }, output: { status: "success" }, explanation: "Latest pump.fun creator-fee distributions to shareholders of at least 1 SOL." }],
        [{ input: { type: "social_claim", social_platform: 2 }, output: { status: "success" }, explanation: "Fees earmarked for X accounts that were just claimed to a wallet." }],
    ],
    schema: z.object({
        type: z.string().optional().describe("Comma list of event types: distribution, social_claim, shares_created, shares_updated, shares_reset, creator_transferred, creator_claim (default: all except creator_claim)"),
        mint: z.string().optional().describe("Filter by coin mint"),
        recipient: z.string().optional().describe("Payout / claim recipient wallet, or the new creator for creator_transferred"),
        actor: z.string().optional().describe("Transaction signer"),
        social_platform: z.number().int().optional().describe("Raw social platform id (2 = X)"),
        social_user_id: z.string().optional().describe("Platform-native numeric user id (not the handle)"),
        min_sol: z.number().min(0).optional().describe("Amount floor in SOL"),
        since: z.string().optional().describe("ISO 8601 — only events after this instant (use pagination.next_since to poll)"),
        before: z.string().optional().describe("ISO 8601 — page back: only events before this instant (pagination.next_before)"),
        limit: z.number().int().min(1).max(100).optional().describe("Rows per page (1-100, default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenFeeClaims(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
