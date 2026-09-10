import { z } from "zod";
import { sniperRecent, sniperByDeployer, sniperWatchlist, sniperWatchlistAdd, sniperWatchlistRemove } from "../tools/index.js";
export const sniperRecentAction = {
    name: "MADEONSOL_SNIPER_RECENT_ACTION",
    similes: ["sniper feed", "recent deploys", "new pump.fun launches", "elite deployer launches"],
    description: "Deshred pre-confirm pump.fun deploy feed — new launches surface ~500ms before on-chain confirmation. PRO (elite/good tiers) or ULTRA (every tier). Added 2026-09-10.",
    examples: [
        [{ input: { limit: 10 }, output: { status: "success" }, explanation: "Get the 10 most recent tracked deployer launches" }],
    ],
    schema: z.object({
        deployer_tier: z.enum(["elite", "good", "moderate", "rising", "cold", "unranked"]).optional().describe("Filter by deployer reputation tier (ULTRA)"),
        min_bond_rate: z.number().min(0).max(1).optional().describe("Minimum deployer lifetime bond rate (0-1)"),
        since: z.string().optional().describe("ISO-8601 — only deploys detected after this timestamp"),
        watchlist: z.boolean().optional().describe("ULTRA: narrow to your custom deployer watchlist"),
        limit: z.number().optional().describe("Max results (default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await sniperRecent(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const sniperByDeployerAction = {
    name: "MADEONSOL_SNIPER_BY_DEPLOYER_ACTION",
    similes: ["deploys by this deployer", "audit this deployer's launches"],
    description: "Deshred pre-confirm deploys filtered to one deployer wallet — audit a deployer's recent launches before tracking them. ULTRA only. Added 2026-09-10.",
    examples: [
        [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" }, output: { status: "success" }, explanation: "Get recent deploys from this deployer" }],
    ],
    schema: z.object({
        wallet: z.string().describe("Deployer wallet address (base58)"),
        limit: z.number().optional().describe("Max results (default 50)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await sniperByDeployer(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const sniperWatchlistAction = {
    name: "MADEONSOL_SNIPER_WATCHLIST_ACTION",
    similes: ["sniper watchlist", "tracked deployers", "my deployer watchlist"],
    description: "List your custom sniper watchlist (tracked deployer wallets, any tier). PRO+/ULTRA. Added 2026-09-10.",
    examples: [
        [{ input: {}, output: { status: "success" }, explanation: "List tracked deployer wallets" }],
    ],
    schema: z.object({}),
    handler: async (agent) => {
        try {
            const data = await sniperWatchlist(agent);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const sniperWatchlistAddAction = {
    name: "MADEONSOL_SNIPER_WATCHLIST_ADD_ACTION",
    similes: ["add to sniper watchlist", "track this deployer for snipes"],
    description: "Add one or many deployer wallets to your sniper watchlist. PRO+/ULTRA. Added 2026-09-10.",
    examples: [
        [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" }, output: { status: "success" }, explanation: "Add a deployer wallet to the sniper watchlist" }],
    ],
    schema: z.object({
        wallet: z.string().optional().describe("Single deployer wallet address (base58) — provide this or `wallets`"),
        wallets: z.array(z.string()).optional().describe("Multiple deployer wallet addresses (up to 50) — provide this or `wallet`"),
        label: z.string().optional().describe("Optional human-readable label"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await sniperWatchlistAdd(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const sniperWatchlistRemoveAction = {
    name: "MADEONSOL_SNIPER_WATCHLIST_REMOVE_ACTION",
    similes: ["remove from sniper watchlist", "untrack this deployer"],
    description: "Remove a deployer wallet from your sniper watchlist. PRO+/ULTRA. Added 2026-09-10.",
    examples: [
        [{ input: { wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" }, output: { status: "success" }, explanation: "Remove a deployer wallet from the sniper watchlist" }],
    ],
    schema: z.object({
        wallet: z.string().describe("Deployer wallet address (base58) to remove"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await sniperWatchlistRemove(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
