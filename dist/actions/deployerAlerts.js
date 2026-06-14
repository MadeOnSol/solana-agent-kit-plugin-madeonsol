import { z } from "zod";
import { deployerAlerts } from "../tools/index.js";
export const deployerAlertsAction = {
    name: "MADEONSOL_DEPLOYER_ALERTS_ACTION",
    similes: ["deployer alerts", "pump fun launches", "new token alerts", "elite deployer tokens"],
    description: "Get real-time alerts from elite Pump.fun deployers with KOL buy enrichment. Costs $0.01 USDC per request.",
    examples: [
        [{ input: { limit: 10 }, output: { status: "success" }, explanation: "Get the 10 most recent deployer alerts" }],
    ],
    schema: z.object({
        limit: z.number().min(1).max(100).default(10).describe("Number of alerts"),
        offset: z.number().min(0).default(0).describe("Pagination offset"),
        since: z.string().optional().describe("ISO8601 timestamp to filter alerts after"),
        tier: z
            .enum(["elite", "good", "moderate", "rising", "cold"])
            .optional()
            .describe("Filter by deployer tier. PRO/ULTRA subscribers only — BASIC callers receive 403."),
    }),
    handler: async (agent, input) => {
        try {
            const data = await deployerAlerts(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
