import { z } from "zod";
export declare const kolTokenEntryOrderAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        limit: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        mint: string;
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
