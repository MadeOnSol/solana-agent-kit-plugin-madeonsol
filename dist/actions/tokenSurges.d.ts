import { z } from "zod";
import type { TokenSurgesParams } from "../tools/index.js";
export declare const tokenSurgesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: ({
        input: {
            kind: string;
            tier: string;
            only_clean: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[] | {
        input: {
            kind: string;
            exclude_flags: string;
            min_mc_usd: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[] | {
        input: {
            stats: string;
            days: number;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[])[];
    schema: z.ZodObject<{
        kind: z.ZodOptional<z.ZodEnum<["surge", "revival"]>>;
        tier: z.ZodOptional<z.ZodEnum<["early", "strong", "breakout"]>>;
        mint: z.ZodOptional<z.ZodString>;
        since: z.ZodOptional<z.ZodString>;
        before: z.ZodOptional<z.ZodString>;
        min_mc_usd: z.ZodOptional<z.ZodNumber>;
        max_mc_usd: z.ZodOptional<z.ZodNumber>;
        min_buys: z.ZodOptional<z.ZodNumber>;
        launchpad: z.ZodOptional<z.ZodString>;
        deployer_tier: z.ZodOptional<z.ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
        exclude_flags: z.ZodOptional<z.ZodString>;
        only_clean: z.ZodOptional<z.ZodEnum<["1", "0", "true", "false"]>>;
        stats: z.ZodOptional<z.ZodEnum<["1", "0", "true", "false"]>>;
        days: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        mint?: string | undefined;
        tier?: "early" | "strong" | "breakout" | undefined;
        since?: string | undefined;
        before?: string | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        kind?: "surge" | "revival" | undefined;
        stats?: "true" | "false" | "1" | "0" | undefined;
        exclude_flags?: string | undefined;
        min_mc_usd?: number | undefined;
        max_mc_usd?: number | undefined;
        min_buys?: number | undefined;
        launchpad?: string | undefined;
        only_clean?: "true" | "false" | "1" | "0" | undefined;
        days?: number | undefined;
    }, {
        limit?: number | undefined;
        mint?: string | undefined;
        tier?: "early" | "strong" | "breakout" | undefined;
        since?: string | undefined;
        before?: string | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        kind?: "surge" | "revival" | undefined;
        stats?: "true" | "false" | "1" | "0" | undefined;
        exclude_flags?: string | undefined;
        min_mc_usd?: number | undefined;
        max_mc_usd?: number | undefined;
        min_buys?: number | undefined;
        launchpad?: string | undefined;
        only_clean?: "true" | "false" | "1" | "0" | undefined;
        days?: number | undefined;
    }>;
    handler: (agent: unknown, input: TokenSurgesParams) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
