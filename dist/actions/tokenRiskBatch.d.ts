import { z } from "zod";
export declare const tokenRiskBatchAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mints: string[];
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mints: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        mints: string[];
    }, {
        mints: string[];
    }>;
    handler: (agent: unknown, input: {
        mints: string[];
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
