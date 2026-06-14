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
        window: z.ZodDefault<z.ZodEnum<{
            "24h": "24h";
            "1h": "1h";
            "6h": "6h";
            "5m": "5m";
            "15m": "15m";
        }>>;
        types: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            consensus_cluster: "consensus_cluster";
            fresh_token_kol_buy: "fresh_token_kol_buy";
            heating_up: "heating_up";
        }>>>;
        min_severity: z.ZodOptional<z.ZodEnum<{
            high: "high";
            medium: "medium";
            low: "low";
        }>>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
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
