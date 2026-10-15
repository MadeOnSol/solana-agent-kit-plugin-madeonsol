import { z } from "zod";
export declare const kolTokenTradesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            action: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        action: z.ZodOptional<z.ZodEnum<["buy", "sell"]>>;
        kol: z.ZodOptional<z.ZodString>;
        since: z.ZodOptional<z.ZodString>;
        cursor: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        limit?: number | undefined;
        since?: string | undefined;
        action?: "buy" | "sell" | undefined;
        cursor?: string | undefined;
        kol?: string | undefined;
    }, {
        mint: string;
        limit?: number | undefined;
        since?: string | undefined;
        action?: "buy" | "sell" | undefined;
        cursor?: string | undefined;
        kol?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        limit?: number;
        action?: "buy" | "sell";
        kol?: string;
        since?: string;
        cursor?: string;
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
