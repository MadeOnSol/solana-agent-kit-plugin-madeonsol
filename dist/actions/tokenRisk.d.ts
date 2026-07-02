import { z } from "zod";
export declare const tokenRiskAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mint: string;
    }, {
        mint: string;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
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
