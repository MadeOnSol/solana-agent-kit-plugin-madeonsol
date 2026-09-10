import { z } from "zod";
import { sniperRecent } from "../tools/index.js";
export declare const sniperRecentAction: {
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
        deployer_tier: z.ZodOptional<z.ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
        min_bond_rate: z.ZodOptional<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
        watchlist: z.ZodOptional<z.ZodBoolean>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        since?: string | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        min_bond_rate?: number | undefined;
        watchlist?: boolean | undefined;
    }, {
        limit?: number | undefined;
        since?: string | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        min_bond_rate?: number | undefined;
        watchlist?: boolean | undefined;
    }>;
    handler: (agent: unknown, input: Parameters<typeof sniperRecent>[1]) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
export declare const sniperByDeployerAction: {
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
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        wallet: string;
        limit?: number | undefined;
    }, {
        wallet: string;
        limit?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet: string;
        limit?: number;
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
export declare const sniperWatchlistAction: {
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
export declare const sniperWatchlistAddAction: {
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
        wallet: z.ZodOptional<z.ZodString>;
        wallets: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        label: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        wallets?: string[] | undefined;
        wallet?: string | undefined;
        label?: string | undefined;
    }, {
        wallets?: string[] | undefined;
        wallet?: string | undefined;
        label?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet?: string;
        wallets?: string[];
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
export declare const sniperWatchlistRemoveAction: {
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
