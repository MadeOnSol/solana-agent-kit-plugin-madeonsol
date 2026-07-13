import { z } from "zod";
export declare const tokenDepthAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            sizes: number[];
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        sizes: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        sizes?: number[] | undefined;
    }, {
        mint: string;
        sizes?: number[] | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        sizes?: number[];
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
