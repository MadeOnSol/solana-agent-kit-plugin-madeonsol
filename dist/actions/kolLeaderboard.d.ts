import { z } from "zod";
export declare const kolLeaderboardAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            period: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        period: z.ZodDefault<z.ZodEnum<["today", "7d", "30d"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        period: "7d" | "today" | "30d";
        limit: number;
    }, {
        period?: "7d" | "today" | "30d" | undefined;
        limit?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        period?: string;
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
