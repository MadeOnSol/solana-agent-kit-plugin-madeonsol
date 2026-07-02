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
        primary_dex: z.ZodOptional<z.ZodEnum<["pumpfun", "pumpswap", "raydium", "meteora", "orca", "letsbonk", "other"]>>;
        authority_revoked: z.ZodOptional<z.ZodBoolean>;
        exclude_token2022: z.ZodOptional<z.ZodBoolean>;
        min_lp_burnt_pct: z.ZodOptional<z.ZodNumber>;
        min_volume_1h_usd: z.ZodOptional<z.ZodNumber>;
        max_mev_share_pct: z.ZodOptional<z.ZodNumber>;
        mc_change_1h_min_pct: z.ZodOptional<z.ZodNumber>;
        mc_change_1h_max_pct: z.ZodOptional<z.ZodNumber>;
        min_liq_mc_ratio: z.ZodOptional<z.ZodNumber>;
        max_liq_mc_ratio: z.ZodOptional<z.ZodNumber>;
        deployer_tier: z.ZodOptional<z.ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
        sort: z.ZodOptional<z.ZodEnum<["mc_desc", "mc_asc", "last_trade_desc", "liquidity_desc", "cumulative_volume_desc", "mc_change_5m_desc", "mc_change_1h_desc", "volume_1h_desc", "trending"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc" | "mc_change_5m_desc" | "mc_change_1h_desc" | "volume_1h_desc" | "trending" | undefined;
        min_mc?: number | undefined;
        max_mc?: number | undefined;
        min_liq?: number | undefined;
        active_h?: number | undefined;
        primary_dex?: "pumpfun" | "pumpswap" | "raydium" | "meteora" | "orca" | "letsbonk" | "other" | undefined;
        authority_revoked?: boolean | undefined;
        exclude_token2022?: boolean | undefined;
        min_lp_burnt_pct?: number | undefined;
        min_volume_1h_usd?: number | undefined;
        max_mev_share_pct?: number | undefined;
        mc_change_1h_min_pct?: number | undefined;
        mc_change_1h_max_pct?: number | undefined;
        min_liq_mc_ratio?: number | undefined;
        max_liq_mc_ratio?: number | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        offset?: number | undefined;
    }, {
        sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc" | "mc_change_5m_desc" | "mc_change_1h_desc" | "volume_1h_desc" | "trending" | undefined;
        limit?: number | undefined;
        min_mc?: number | undefined;
        max_mc?: number | undefined;
        min_liq?: number | undefined;
        active_h?: number | undefined;
        primary_dex?: "pumpfun" | "pumpswap" | "raydium" | "meteora" | "orca" | "letsbonk" | "other" | undefined;
        authority_revoked?: boolean | undefined;
        exclude_token2022?: boolean | undefined;
        min_lp_burnt_pct?: number | undefined;
        min_volume_1h_usd?: number | undefined;
        max_mev_share_pct?: number | undefined;
        mc_change_1h_min_pct?: number | undefined;
        mc_change_1h_max_pct?: number | undefined;
        min_liq_mc_ratio?: number | undefined;
        max_liq_mc_ratio?: number | undefined;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
        offset?: number | undefined;
    }>;
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
        min_liq_mc_ratio?: number;
        max_liq_mc_ratio?: number;
        deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
        sort?: "mc_desc" | "mc_asc" | "last_trade_desc" | "liquidity_desc" | "cumulative_volume_desc" | "mc_change_5m_desc" | "mc_change_1h_desc" | "volume_1h_desc" | "trending";
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
