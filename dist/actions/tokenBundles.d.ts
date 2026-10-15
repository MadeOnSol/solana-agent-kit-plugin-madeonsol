import { z } from "zod";
export declare const tokenBundlesAction: {
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
        window: z.ZodOptional<z.ZodEnum<["1h", "6h", "24h"]>>;
        min_wallets: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
        include_balances: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        limit?: number | undefined;
        window?: "1h" | "6h" | "24h" | undefined;
        min_wallets?: number | undefined;
        include_balances?: boolean | undefined;
    }, {
        mint: string;
        limit?: number | undefined;
        window?: "1h" | "6h" | "24h" | undefined;
        min_wallets?: number | undefined;
        include_balances?: boolean | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        window?: "1h" | "6h" | "24h";
        min_wallets?: number;
        limit?: number;
        include_balances?: boolean;
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
export declare const tokenBundleShareAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        window: z.ZodOptional<z.ZodEnum<["1h", "6h", "24h"]>>;
        min_wallets: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        window?: "1h" | "6h" | "24h" | undefined;
        min_wallets?: number | undefined;
    }, {
        mint: string;
        window?: "1h" | "6h" | "24h" | undefined;
        min_wallets?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        window?: "1h" | "6h" | "24h";
        min_wallets?: number;
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
