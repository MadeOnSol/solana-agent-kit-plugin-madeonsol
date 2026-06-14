import { z } from "zod";
export declare const walletTrackerWatchlistAction: {
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
    schema: z.ZodObject<{}, z.core.$strip>;
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
export declare const walletTrackerAddAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet_address: string;
            label: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet_address: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        wallet_address: string;
        label?: string;
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
export declare const walletTrackerRemoveAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet_address: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet_address: z.ZodString;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        wallet_address: string;
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
export declare const walletTrackerTradesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodEnum<{
            buy: "buy";
            sell: "sell";
            transfer_in: "transfer_in";
            transfer_out: "transfer_out";
        }>>;
        event_type: z.ZodOptional<z.ZodEnum<{
            swap: "swap";
            transfer: "transfer";
        }>>;
        limit: z.ZodDefault<z.ZodNumber>;
        before: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        wallet?: string;
        action?: string;
        event_type?: string;
        limit?: number;
        before?: number;
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
export declare const walletTrackerSummaryAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            period: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        period: z.ZodDefault<z.ZodEnum<{
            "24h": "24h";
            "7d": "7d";
            "30d": "30d";
        }>>;
        wallet: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        period?: string;
        wallet?: string;
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
