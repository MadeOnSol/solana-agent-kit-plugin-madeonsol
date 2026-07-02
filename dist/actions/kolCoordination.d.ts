import { z } from "zod";
export declare const kolCoordinationAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            period: string;
            min_kols: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        period: z.ZodDefault<z.ZodEnum<["1h", "6h", "24h", "7d"]>>;
        min_kols: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        period: "1h" | "24h" | "6h" | "7d";
        min_kols: number;
        limit: number;
    }, {
        period?: "1h" | "24h" | "6h" | "7d" | undefined;
        min_kols?: number | undefined;
        limit?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        period?: string;
        min_kols?: number;
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
