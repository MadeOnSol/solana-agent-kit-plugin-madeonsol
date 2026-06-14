import { z } from "zod";
export declare const tokensListAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            min_mc: number;
            max_mc: number;
            primary_dex: string;
            sort: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        min_mc: z.ZodOptional<z.ZodNumber>;
        max_mc: z.ZodOptional<z.ZodNumber>;
        min_liq: z.ZodOptional<z.ZodNumber>;
        active_h: z.ZodOptional<z.ZodNumber>;
        primary_dex: z.ZodOptional<z.ZodEnum<{
            pumpfun: "pumpfun";
            pumpswap: "pumpswap";
            raydium: "raydium";
            meteora: "meteora";
            orca: "orca";
            letsbonk: "letsbonk";
            other: "other";
        }>>;
        authority_revoked: z.ZodOptional<z.ZodBoolean>;
        exclude_token2022: z.ZodOptional<z.ZodBoolean>;
        min_lp_burnt_pct: z.ZodOptional<z.ZodNumber>;
        min_volume_1h_usd: z.ZodOptional<z.ZodNumber>;
        max_mev_share_pct: z.ZodOptional<z.ZodNumber>;
        mc_change_1h_min_pct: z.ZodOptional<z.ZodNumber>;
        mc_change_1h_max_pct: z.ZodOptional<z.ZodNumber>;
        sort: z.ZodOptional<z.ZodEnum<{
            mc_desc: "mc_desc";
            mc_asc: "mc_asc";
            last_trade_desc: "last_trade_desc";
            liquidity_desc: "liquidity_desc";
            cumulative_volume_desc: "cumulative_volume_desc";
        }>>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        min_mc?: number;
        max_mc?: number;
        min_liq?: number;
        active_h?: number;
        primary_dex?: "pumpfun" | "pumpswap" | "raydium" | "meteora" | "orca" | "letsbonk" | "other";
        authority_revoked?: boolean;
        exclude_token2022?: boolean;
        min_lp_burnt_pct?: number;
        min_volume_1h_usd?: number;
        max_mev_share_pct?: number;
        mc_change_1h_min_pct?: number;
        mc_change_1h_max_pct?: number;
        sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc";
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
