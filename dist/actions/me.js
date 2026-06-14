import { z } from "zod";
import { me } from "../tools/index.js";
export const meAction = {
    name: "MADEONSOL_ME_ACTION",
    similes: [
        "my api account",
        "api quota",
        "api tier",
        "remaining requests",
        "rate limit status",
        "my usage",
    ],
    description: "Inspect your MadeOnSol API account — tier, daily/burst quota state, remaining requests, and per-feature usage.",
    examples: [
        [
            {
                input: {},
                output: { status: "success" },
                explanation: "Check current tier, daily and burst quota remaining, and per-feature usage counters",
            },
        ],
    ],
    schema: z.object({}),
    handler: async (agent, _input) => {
        try {
            const data = await me(agent);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
