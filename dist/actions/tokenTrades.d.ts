import { z } from "zod";
export declare const tokenTradesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            limit: number;
            action: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        cursor: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodEnum<["buy", "sell"]>>;
        wallet: z.ZodOptional<z.ZodString>;
        since: z.ZodOptional<z.ZodNumber>;
        until: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        limit?: number | undefined;
        wallet?: string | undefined;
        action?: "buy" | "sell" | undefined;
        cursor?: string | undefined;
        since?: number | undefined;
        until?: number | undefined;
    }, {
        mint: string;
        limit?: number | undefined;
        wallet?: string | undefined;
        action?: "buy" | "sell" | undefined;
        cursor?: string | undefined;
        since?: number | undefined;
        until?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        limit?: number;
        cursor?: string;
        action?: "buy" | "sell";
        wallet?: string;
        since?: number;
        until?: number;
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
