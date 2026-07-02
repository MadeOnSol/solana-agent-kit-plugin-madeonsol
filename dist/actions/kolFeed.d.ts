import { z } from "zod";
export declare const kolFeedAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            limit: number;
            action: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        limit: z.ZodDefault<z.ZodNumber>;
        action: z.ZodOptional<z.ZodEnum<["buy", "sell"]>>;
        kol: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        action?: "buy" | "sell" | undefined;
        kol?: string | undefined;
    }, {
        limit?: number | undefined;
        action?: "buy" | "sell" | undefined;
        kol?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
        limit?: number;
        action?: string;
        kol?: string;
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
