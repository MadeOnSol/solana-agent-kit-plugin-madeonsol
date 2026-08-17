import { z } from "zod";
import type { TokenLocksParams } from "../tools/index.js";
export declare const tokenLocksAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            status: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["active", "completed", "cancelled", "closed"]>>;
        program: z.ZodOptional<z.ZodEnum<["streamflow", "jupiter_lock", "bonfida_vesting"]>>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        limit?: number | undefined;
        status?: "active" | "completed" | "cancelled" | "closed" | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
    }, {
        mint: string;
        limit?: number | undefined;
        status?: "active" | "completed" | "cancelled" | "closed" | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
    }>;
    handler: (agent: unknown, input: TokenLocksParams) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
