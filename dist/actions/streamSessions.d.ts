import { z } from "zod";
export declare const streamSessionsAction: {
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
    handler: (agent: unknown) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
export declare const streamSessionKillAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            id: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        id: string | number;
    }, {
        id: string | number;
    }>;
    handler: (agent: unknown, input: {
        id: string | number;
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
