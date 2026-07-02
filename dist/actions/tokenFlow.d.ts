import { z } from "zod";
export declare const tokenFlowAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            window: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        window: z.ZodOptional<z.ZodEnum<["1h", "24h"]>>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        window?: "1h" | "24h" | undefined;
    }, {
        mint: string;
        window?: "1h" | "24h" | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        window?: "1h" | "24h";
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
