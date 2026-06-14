import { z } from "zod";
export declare const kolCompareAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallets: string[];
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallets: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        wallets: string[];
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
