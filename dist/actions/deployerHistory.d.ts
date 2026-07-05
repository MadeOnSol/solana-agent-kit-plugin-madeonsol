import { z } from "zod";
export declare const deployerHistoryAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodString;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        wallet: string;
    }, {
        wallet: string;
        limit?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet: string;
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
