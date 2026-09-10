import { z } from "zod";
export declare const deployerAsOfAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet: string;
            date: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodString;
        date: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        wallet: string;
        date?: string | undefined;
    }, {
        wallet: string;
        date?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet: string;
        date?: string;
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
