import { z } from "zod";
import { walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary } from "../tools/index.js";
export const walletTrackerWatchlistAction = {
    name: "MADEONSOL_WALLET_TRACKER_WATCHLIST_ACTION",
    similes: ["wallet watchlist", "tracked wallets", "my watchlist", "wallet tracker list"],
    description: "List wallets in your MadeOnSol watchlist with labels and remaining capacity.",
    examples: [
        [{ input: {}, output: { status: "success" }, explanation: "Get your tracked wallet list" }],
    ],
    schema: z.object({}),
    handler: async (agent) => {
        try {
            const data = await walletTrackerWatchlist(agent);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletTrackerAddAction = {
    name: "MADEONSOL_WALLET_TRACKER_ADD_ACTION",
    similes: ["track wallet", "add wallet to watchlist", "watch wallet", "monitor wallet"],
    description: "Add a Solana wallet to your MadeOnSol watchlist for swap/transfer tracking.",
    examples: [
        [{ input: { wallet_address: "ABC...xyz", label: "whale #1" }, output: { status: "success" }, explanation: "Add a wallet to watchlist" }],
    ],
    schema: z.object({
        wallet_address: z.string().describe("Solana wallet address (base58) to track"),
        label: z.string().optional().describe("Optional human-readable label"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletTrackerAdd(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletTrackerRemoveAction = {
    name: "MADEONSOL_WALLET_TRACKER_REMOVE_ACTION",
    similes: ["untrack wallet", "remove wallet from watchlist", "stop watching wallet"],
    description: "Remove a Solana wallet from your MadeOnSol watchlist.",
    examples: [
        [{ input: { wallet_address: "ABC...xyz" }, output: { status: "success" }, explanation: "Remove a wallet from watchlist" }],
    ],
    schema: z.object({
        wallet_address: z.string().describe("Solana wallet address (base58) to remove"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletTrackerRemove(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletTrackerTradesAction = {
    name: "MADEONSOL_WALLET_TRACKER_TRADES_ACTION",
    similes: ["wallet tracker trades", "tracked wallet trades", "watchlist activity", "wallet swaps", "wallet transfers"],
    description: "Get recent swap and transfer events from wallets in your MadeOnSol watchlist.",
    examples: [
        [{ input: { limit: 20 }, output: { status: "success" }, explanation: "Get recent trades from tracked wallets" }],
    ],
    schema: z.object({
        wallet: z.string().optional().describe("Filter to a specific wallet address"),
        action: z.enum(["buy", "sell", "transfer_in", "transfer_out"]).optional().describe("Filter by action type"),
        event_type: z.enum(["swap", "transfer"]).optional().describe("Filter by event type"),
        limit: z.number().min(1).max(200).default(50).describe("Max results (1-200)"),
        before: z.number().optional().describe("Pagination cursor: block_time of last event"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletTrackerTrades(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletTrackerSummaryAction = {
    name: "MADEONSOL_WALLET_TRACKER_SUMMARY_ACTION",
    similes: ["wallet tracker summary", "tracked wallet stats", "watchlist summary", "wallet activity stats"],
    description: "Get per-wallet stats (swap counts, SOL bought/sold, last activity) for your MadeOnSol watchlist.",
    examples: [
        [{ input: { period: "7d" }, output: { status: "success" }, explanation: "Get 7d stats for all tracked wallets" }],
    ],
    schema: z.object({
        period: z.enum(["24h", "7d", "30d"]).default("7d").describe("Time window for stats"),
        wallet: z.string().optional().describe("Filter to a specific wallet address"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletTrackerSummary(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
