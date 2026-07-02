import { z } from "zod";
export declare const meAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {};
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    handler: (agent: unknown, _input: Record<string, never>) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
