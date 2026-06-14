import { z } from "zod";
export declare const kolPnlAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet: string;
            period: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodString;
        period: z.ZodDefault<z.ZodEnum<{
            "7d": "7d";
            "30d": "30d";
            "90d": "90d";
            "180d": "180d";
        }>>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        wallet: string;
        period?: string;
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
