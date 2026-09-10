import { z } from "zod";
export declare const tokenTopTradersAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            mint: string;
            limit: number;
            sort: string;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        mint: z.ZodString;
        limit: z.ZodOptional<z.ZodNumber>;
        sort: z.ZodOptional<z.ZodEnum<["pnl", "roi"]>>;
        window_days: z.ZodOptional<z.ZodNumber>;
        min_bought_sol: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        mint: string;
        sort?: "pnl" | "roi" | undefined;
        limit?: number | undefined;
        window_days?: number | undefined;
        min_bought_sol?: number | undefined;
    }, {
        mint: string;
        sort?: "pnl" | "roi" | undefined;
        limit?: number | undefined;
        window_days?: number | undefined;
        min_bought_sol?: number | undefined;
    }>;
    handler: (agent: unknown, input: {
        mint: string;
        limit?: number;
        sort?: "pnl" | "roi";
        window_days?: number;
        min_bought_sol?: number;
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
