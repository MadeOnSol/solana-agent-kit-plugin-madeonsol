import { z } from "zod";
export declare const deployerRewardsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        wallet: string;
    }, {
        wallet: string;
    }>;
    handler: (agent: unknown, input: {
        wallet: string;
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
