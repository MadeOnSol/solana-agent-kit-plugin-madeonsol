import { z } from "zod";
import type { TokenUnlocksParams } from "../tools/index.js";
export declare const tokenUnlocksAction: {
    name: string;
    similes: string[];
    description: string;
    examples: ({
        input: {
            within: string;
            sort: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[] | {
        input: {
            mint: string;
            within: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[])[];
    schema: z.ZodObject<{
        within: z.ZodOptional<z.ZodEnum<["1h", "6h", "24h", "3d", "7d", "14d", "30d", "90d"]>>;
        mint: z.ZodOptional<z.ZodString>;
        program: z.ZodOptional<z.ZodEnum<["streamflow", "jupiter_lock", "bonfida_vesting"]>>;
        kind: z.ZodOptional<z.ZodEnum<["lock", "vesting"]>>;
        min_usd: z.ZodOptional<z.ZodNumber>;
        min_pct_of_supply: z.ZodOptional<z.ZodNumber>;
        sort: z.ZodOptional<z.ZodEnum<["soonest", "largest_usd", "largest_pct"]>>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        sort?: "soonest" | "largest_usd" | "largest_pct" | undefined;
        limit?: number | undefined;
        mint?: string | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
        min_usd?: number | undefined;
        kind?: "lock" | "vesting" | undefined;
        min_pct_of_supply?: number | undefined;
        within?: "1h" | "6h" | "24h" | "3d" | "7d" | "14d" | "30d" | "90d" | undefined;
    }, {
        sort?: "soonest" | "largest_usd" | "largest_pct" | undefined;
        limit?: number | undefined;
        mint?: string | undefined;
        program?: "streamflow" | "jupiter_lock" | "bonfida_vesting" | undefined;
        min_usd?: number | undefined;
        kind?: "lock" | "vesting" | undefined;
        min_pct_of_supply?: number | undefined;
        within?: "1h" | "6h" | "24h" | "3d" | "7d" | "14d" | "30d" | "90d" | undefined;
    }>;
    handler: (agent: unknown, input: TokenUnlocksParams) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
