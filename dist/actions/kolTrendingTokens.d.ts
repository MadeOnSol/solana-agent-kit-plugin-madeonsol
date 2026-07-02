import { z } from "zod";
export declare const kolTrendingTokensAction: {
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
        period: z.ZodDefault<z.ZodEnum<["5m", "15m", "30m", "1h", "2h", "4h", "12h"]>>;
        min_kols: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        period: "1h" | "5m" | "15m" | "30m" | "2h" | "4h" | "12h";
        min_kols: number;
        limit: number;
    }, {
        period?: "1h" | "5m" | "15m" | "30m" | "2h" | "4h" | "12h" | undefined;
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
