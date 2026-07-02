import { z } from "zod";
export declare const deployerAlertsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
        tier: z.ZodOptional<z.ZodEnum<["elite", "good", "moderate", "rising", "cold"]>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        offset: number;
        since?: string | undefined;
        tier?: "elite" | "good" | "moderate" | "rising" | "cold" | undefined;
    }, {
        limit?: number | undefined;
        since?: string | undefined;
        offset?: number | undefined;
        tier?: "elite" | "good" | "moderate" | "rising" | "cold" | undefined;
    }>;
    handler: (agent: unknown, input: {
        limit?: number;
        offset?: number;
        since?: string;
        tier?: "elite" | "good" | "moderate" | "rising" | "cold";
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
