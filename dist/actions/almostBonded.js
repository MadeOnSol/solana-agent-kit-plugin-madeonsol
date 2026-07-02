import { z } from "zod";
import { almostBonded } from "../tools/index.js";
export const almostBondedAction = {
    name: "MADEONSOL_ALMOST_BONDED_ACTION",
    similes: [
        "almost bonded",
        "about to graduate",
        "near graduation",
        "tokens about to bond",
        "pre-bond tokens",
        "almost graduated pumpfun",
    ],
    description: "Pre-bond pump.fun tokens approaching graduation (PRO+), ranked by velocity (Δprogress/min). Returns mint, symbol, progress_pct, velocity_pct_per_min, eta_minutes, stalled, deployer_tier. '95% and accelerating' beats '92% stalled'.",
    examples: [
        [
            {
                input: { min_progress: 90, min_velocity_pct_per_min: 0.5, deployer_tier: "elite", sort: "eta_asc", limit: 25 },
                output: { status: "success" },
                explanation: "Tokens >90% bonded, accelerating, from an elite deployer, soonest-to-bond first",
            },
        ],
    ],
    schema: z.object({
        min_progress: z.number().min(0).max(100).optional().describe("Lower bound on bonding progress % (default 80)"),
        max_progress: z.number().min(0).max(100).optional().describe("Upper bound on bonding progress % (default 99.99 — already-bonded excluded)"),
        min_velocity_pct_per_min: z.number().optional().describe("Minimum Δprogress/min; drops tokens without a 5m snapshot"),
        max_age_minutes: z.number().min(1).optional().describe("Max minutes since deploy (post-filter)"),
        deployer_tier: z.enum(["elite", "good", "moderate", "rising", "cold", "unranked"]).optional().describe("Filter by deployer reputation tier"),
        authority_revoked: z.boolean().optional().describe("Only tokens with mint+freeze authorities revoked"),
        min_liq: z.number().min(0).optional().describe("Minimum liquidity USD"),
        sort: z.enum(["velocity_desc", "progress_desc", "eta_asc"]).optional().describe("Sort axis (default velocity_desc)"),
        limit: z.number().min(1).max(100).default(20).describe("Number of tokens (max 100)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await almostBonded(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
