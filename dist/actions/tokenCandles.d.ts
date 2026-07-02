import { z } from "zod";
export declare const tokenCandlesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            tf: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        tf: z.ZodOptional<z.ZodEnum<["1m", "5m", "15m", "1h", "4h", "1d"]>>;
        limit: z.ZodOptional<z.ZodNumber>;
        from: z.ZodOptional<z.ZodString>;
        to: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        limit?: number | undefined;
        tf?: "1h" | "5m" | "15m" | "4h" | "1m" | "1d" | undefined;
        from?: string | undefined;
        to?: string | undefined;
    }, {
        mint: string;
        limit?: number | undefined;
        tf?: "1h" | "5m" | "15m" | "4h" | "1m" | "1d" | undefined;
        from?: string | undefined;
        to?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        tf?: string;
        limit?: number;
        from?: string;
        to?: string;
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
