import { z } from "zod";
export declare const deployerStatsAction: {
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
export declare const deployerLeaderboardAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            tier: string;
            sort: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        tier: z.ZodOptional<z.ZodEnum<["elite", "good", "rising", "neutral", "spammer", "unranked"]>>;
        sort: z.ZodDefault<z.ZodEnum<["bonding_rate", "recent", "total_bonded", "last_deploy"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        sort: "recent" | "bonding_rate" | "total_bonded" | "last_deploy";
        limit: number;
        offset: number;
        tier?: "elite" | "good" | "rising" | "unranked" | "neutral" | "spammer" | undefined;
    }, {
        sort?: "recent" | "bonding_rate" | "total_bonded" | "last_deploy" | undefined;
        limit?: number | undefined;
        tier?: "elite" | "good" | "rising" | "unranked" | "neutral" | "spammer" | undefined;
        offset?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        tier?: string;
        sort?: string;
        limit?: number;
        offset?: number;
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
export declare const deployerProfileAction: {
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
export declare const deployerTokensAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            wallet: string;
            only_bonded: boolean;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        wallet: z.ZodString;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        only_bonded: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        offset: number;
        wallet: string;
        only_bonded: boolean;
    }, {
        wallet: string;
        limit?: number | undefined;
        offset?: number | undefined;
        only_bonded?: boolean | undefined;
    }>;
    handler: (agent: unknown, input: {
        wallet: string;
        limit?: number;
        offset?: number;
        only_bonded?: boolean;
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
export declare const deployerAlertStatsAction: {
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
        period: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        period?: string | undefined;
    }, {
        period?: string | undefined;
    }>;
    handler: (agent: unknown, input: {
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
export declare const deployerBestTokensAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            period: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        period: z.ZodDefault<z.ZodString>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        period: string;
        limit: number;
    }, {
        period?: string | undefined;
        limit?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        period?: string;
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
export declare const deployerRecentBondsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            limit: number;
            tier: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        limit: z.ZodDefault<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
        tier: z.ZodOptional<z.ZodEnum<["elite", "good", "rising", "neutral", "spammer", "unranked"]>>;
        peak_mc_min: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        tier?: "elite" | "good" | "rising" | "unranked" | "neutral" | "spammer" | undefined;
        since?: string | undefined;
        peak_mc_min?: number | undefined;
    }, {
        limit?: number | undefined;
        tier?: "elite" | "good" | "rising" | "unranked" | "neutral" | "spammer" | undefined;
        since?: string | undefined;
        peak_mc_min?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        limit?: number;
        since?: string;
        tier?: string;
        peak_mc_min?: number;
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
