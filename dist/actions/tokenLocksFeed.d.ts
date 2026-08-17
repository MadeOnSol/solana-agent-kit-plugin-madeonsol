import { z } from "zod";
import type { TokenLocksFeedParams } from "../tools/index.js";
export declare const tokenLocksFeedAction: {
    name: string;
    similes: string[];
    description: string;
    examples: ({
        input: {
            min_usd: number;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[] | {
        input: {
            program: string;
            kind: string;
            since: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[])[];
    schema: z.ZodObject<{
        since: z.ZodOptional<z.ZodString>;
        before: z.ZodOptional<z.ZodString>;
        mint: z.ZodOptional<z.ZodString>;
        sender: z.ZodOptional<z.ZodString>;
        recipient: z.ZodOptional<z.ZodString>;
        program: z.ZodOptional<z.ZodEnum<["streamflow", "jupiter_lock", "bonfida_vesting"]>>;
        kind: z.ZodOptional<z.ZodEnum<["lock", "vesting"]>>;
        status: z.ZodOptional<z.ZodEnum<["active", "completed", "cancelled", "closed"]>>;
        min_usd: z.ZodOptional<z.ZodNumber>;
        min_pct_of_supply: z.ZodOptional<z.ZodNumber>;
        include_estimated: z.ZodOptional<z.ZodEnum<["1", "0", "true", "false"]>>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        mint?: string | undefined;
        since?: string | undefined;
        before?: string | undefined;
        status?: "active" | "completed" | "cancelled" | "closed" | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
        min_usd?: number | undefined;
        sender?: string | undefined;
        recipient?: string | undefined;
        kind?: "lock" | "vesting" | undefined;
        min_pct_of_supply?: number | undefined;
        include_estimated?: "true" | "false" | "1" | "0" | undefined;
    }, {
        limit?: number | undefined;
        mint?: string | undefined;
        since?: string | undefined;
        before?: string | undefined;
        status?: "active" | "completed" | "cancelled" | "closed" | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
        min_usd?: number | undefined;
        sender?: string | undefined;
        recipient?: string | undefined;
        kind?: "lock" | "vesting" | undefined;
        min_pct_of_supply?: number | undefined;
        include_estimated?: "true" | "false" | "1" | "0" | undefined;
    }>;
    handler: (agent: unknown, input: TokenLocksFeedParams) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
