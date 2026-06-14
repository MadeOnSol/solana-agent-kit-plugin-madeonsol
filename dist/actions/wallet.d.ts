import { z } from "zod";
export declare const walletStatsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            address: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        address: z.ZodString;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        address: string;
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
export declare const walletPnlAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            address: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        address: z.ZodString;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        address: string;
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
export declare const walletPositionsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            address: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        address: z.ZodString;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        address: string;
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
export declare const walletTradesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            address: string;
            limit: number;
            action: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        address: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        cursor: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodEnum<{
            buy: "buy";
            sell: "sell";
        }>>;
        token_mint: z.ZodOptional<z.ZodString>;
        since: z.ZodOptional<z.ZodNumber>;
        until: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        address: string;
        limit?: number;
        cursor?: string;
        action?: "buy" | "sell";
        token_mint?: string;
        since?: number;
        until?: number;
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
