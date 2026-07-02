import { z } from "zod";
export declare const kolAlertsRecentAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            window: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        window: z.ZodDefault<z.ZodEnum<["5m", "15m", "1h", "6h", "24h"]>>;
        types: z.ZodOptional<z.ZodArray<z.ZodEnum<["consensus_cluster", "fresh_token_kol_buy", "heating_up"]>, "many">>;
        min_severity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        window: "1h" | "24h" | "6h" | "5m" | "15m";
        types?: ("consensus_cluster" | "fresh_token_kol_buy" | "heating_up")[] | undefined;
        min_severity?: "high" | "medium" | "low" | undefined;
    }, {
        limit?: number | undefined;
        types?: ("consensus_cluster" | "fresh_token_kol_buy" | "heating_up")[] | undefined;
        window?: "1h" | "24h" | "6h" | "5m" | "15m" | undefined;
        min_severity?: "high" | "medium" | "low" | undefined;
    }>;
    handler: (agent: unknown, input: {
        window?: string;
        types?: string[];
        min_severity?: string;
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
