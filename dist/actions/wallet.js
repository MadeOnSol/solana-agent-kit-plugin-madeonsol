import { z } from "zod";
import { walletStats, walletPnl, walletPositions, walletTrades } from "../tools/index.js";
export const walletStatsAction = {
    name: "MADEONSOL_WALLET_STATS_ACTION",
    similes: [
        "wallet stats",
        "wallet info",
        "wallet profile",
        "check wallet",
        "wallet cross-product flags",
        "is wallet a kol or deployer",
    ],
    description: "Get aggregate stats for any Solana wallet over the last 90 days (trade count, buys/sells split, SOL in/out, unique tokens) plus cross-product flags from kol_wallets, mv_alpha_wallets (incl. bot_confidence), and deployers. Works on any wallet — not just curated KOLs. PRO+.",
    examples: [
        [
            {
                input: { address: "ASVzakePP6GNg9r95d4LPZHJDMXun6L6E4um4pu5ybJk" },
                output: { status: "success" },
                explanation: "Get stats + flags for a wallet",
            },
        ],
    ],
    schema: z.object({
        address: z.string().describe("Solana wallet address (base58, 32-44 chars)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletStats(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletPnlAction = {
    name: "MADEONSOL_WALLET_PNL_ACTION",
    similes: [
        "wallet pnl",
        "wallet profit and loss",
        "is wallet profitable",
        "wallet performance",
        "wallet win rate",
        "wallet equity curve",
        "wallet best trades",
    ],
    description: "Get full FIFO cost-basis PnL for any Solana wallet: realized + unrealized SOL, profit factor, max drawdown, avg + median hold minutes, daily UTC PnL curve, closed positions sorted by pnl desc (with ROI %, hold time, win/loss/breakeven), and open positions hydrated with current prices from the market-cap tracker. Cached in wallet_analyses with dynamic TTL (5min/1h/24h based on activity). Cache hits don't count against your daily quota. Cost basis only observable in the 90-day data window — overflow sells are silently discarded rather than fabricated. PRO+.",
    examples: [
        [
            {
                input: { address: "ASVzakePP6GNg9r95d4LPZHJDMXun6L6E4um4pu5ybJk" },
                output: { status: "success" },
                explanation: "Full PnL breakdown for the wallet",
            },
        ],
    ],
    schema: z.object({
        address: z.string().describe("Solana wallet address"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletPnl(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletPositionsAction = {
    name: "MADEONSOL_WALLET_POSITIONS_ACTION",
    similes: [
        "wallet positions",
        "wallet holdings",
        "wallet open bags",
        "what does wallet hold",
        "wallet active positions",
        "wallet unrealized pnl",
    ],
    description: "Open positions only for any Solana wallet — lighter slice of MADEONSOL_WALLET_PNL_ACTION for use cases that don't need the full PnL summary or curve. Each position carries token_mint, token_amount, cost_basis_sol, avg_entry_price_sol, current_price_sol (live from mc-tracker; null if delisted), current_value_sol, unrealized_sol, unrealized_pct, first_buy_at. Shares the /pnl cache. PRO+.",
    examples: [
        [
            {
                input: { address: "ASVzakePP6GNg9r95d4LPZHJDMXun6L6E4um4pu5ybJk" },
                output: { status: "success" },
                explanation: "List the wallet's open positions",
            },
        ],
    ],
    schema: z.object({
        address: z.string().describe("Solana wallet address"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletPositions(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const walletTradesAction = {
    name: "MADEONSOL_WALLET_TRADES_ACTION",
    similes: [
        "wallet trades",
        "wallet trade history",
        "wallet activity",
        "recent trades of wallet",
        "paginated wallet trades",
    ],
    description: "Cursor-paginated raw trades for any Solana wallet. Filter by action (buy/sell), token_mint, and time window (since/until Unix seconds; default last 90 days). Cursor encodes (block_time, id) for stable DESC pagination — pass next_cursor from the previous response to fetch older trades. Limit 1-500 (default 100). PRO+.",
    examples: [
        [
            {
                input: { address: "ASVzakePP6GNg9r95d4LPZHJDMXun6L6E4um4pu5ybJk", limit: 50, action: "buy" },
                output: { status: "success" },
                explanation: "Get 50 recent buys for the wallet",
            },
        ],
    ],
    schema: z.object({
        address: z.string().describe("Solana wallet address"),
        limit: z.number().min(1).max(500).optional().describe("Trades per page (1-500, default 100)"),
        cursor: z.string().optional().describe("Cursor from previous response's next_cursor field"),
        action: z.enum(["buy", "sell"]).optional().describe("Filter to buys or sells only"),
        token_mint: z.string().optional().describe("Filter to a single token mint"),
        since: z.number().optional().describe("Unix epoch seconds — default now-90d"),
        until: z.number().optional().describe("Unix epoch seconds — default now"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await walletTrades(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
