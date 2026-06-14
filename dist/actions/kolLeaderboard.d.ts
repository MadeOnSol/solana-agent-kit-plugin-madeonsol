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
        period: z.ZodDefault<z.ZodEnum<{
            "7d": "7d";
            today: "today";
            "30d": "30d";
        }>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
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
