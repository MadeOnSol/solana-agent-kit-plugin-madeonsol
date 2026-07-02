import { z } from "zod";
export declare const almostBondedAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            min_progress: number;
            min_velocity_pct_per_min: number;
            deployer_tier: string;
            sort: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        min_progress: z.ZodOptional<z.ZodNumber>;
        max_progress: z.ZodOptional<z.ZodNumber>;
        min_velocity_pct_per_min: z.ZodOptional<z.ZodNumber>;
        max_age_minutes: z.ZodOptional<z.ZodNumber>;
        deployer_tier: z.ZodOptional<z.ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
        authority_revoked: z.ZodOptional<z.ZodBoolean>;
        min_liq: z.ZodOptional<z.ZodNumber>;
        sort: z.ZodOptional<z.ZodEnum<["velocity_desc", "progress_desc", "eta_asc"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        sort?: "velocity_desc" | "progress_desc" | "eta_asc" | undefined;
        min_liq?: number | undefined;
        authority_revoked?: boolean | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        min_progress?: number | undefined;
        max_progress?: number | undefined;
        min_velocity_pct_per_min?: number | undefined;
        max_age_minutes?: number | undefined;
    }, {
        sort?: "velocity_desc" | "progress_desc" | "eta_asc" | undefined;
        limit?: number | undefined;
        min_liq?: number | undefined;
        authority_revoked?: boolean | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        min_progress?: number | undefined;
        max_progress?: number | undefined;
        min_velocity_pct_per_min?: number | undefined;
        max_age_minutes?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        min_progress?: number;
        max_progress?: number;
        min_velocity_pct_per_min?: number;
        max_age_minutes?: number;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
        authority_revoked?: boolean;
        min_liq?: number;
        sort?: "velocity_desc" | "progress_desc" | "eta_asc";
        limit?: number;
    }) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
