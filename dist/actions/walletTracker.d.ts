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
export declare const walletTrackerRelabelAction: {
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
        label: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        wallet_address: string;
        label: string | null;
    }, {
        wallet_address: string;
        label: string | null;
    }>;
    handler: (agent: unknown, input: {
        wallet_address: string;
        label: string | null;
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
    }, "strip", z.ZodTypeAny, {
        wallet_address: string;
        label?: string | undefined;
    }, {
        wallet_address: string;
        label?: string | undefined;
    }>;
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
    }, "strip", z.ZodTypeAny, {
        wallet_address: string;
    }, {
        wallet_address: string;
    }>;
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
        action: z.ZodOptional<z.ZodEnum<["buy", "sell"]>>;
        event_type: z.ZodOptional<z.ZodEnum<["swap", "transfer"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
        order: z.ZodOptional<z.ZodEnum<["slot", "block_time"]>>;
        before_slot: z.ZodOptional<z.ZodNumber>;
        before: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        wallet?: string | undefined;
        action?: "buy" | "sell" | undefined;
        event_type?: "swap" | "transfer" | undefined;
        order?: "slot" | "block_time" | undefined;
        before_slot?: number | undefined;
        before?: number | undefined;
    }, {
        limit?: number | undefined;
        wallet?: string | undefined;
        action?: "buy" | "sell" | undefined;
        event_type?: "swap" | "transfer" | undefined;
        order?: "slot" | "block_time" | undefined;
        before_slot?: number | undefined;
        before?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet?: string;
        action?: "buy" | "sell";
        event_type?: "swap" | "transfer";
        limit?: number;
        order?: "slot" | "block_time";
        before_slot?: number;
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
        period: z.ZodDefault<z.ZodEnum<["24h", "7d", "30d"]>>;
        wallet: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        period: "24h" | "7d" | "30d";
        wallet?: string | undefined;
    }, {
        period?: "24h" | "7d" | "30d" | undefined;
        wallet?: string | undefined;
    }>;
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
