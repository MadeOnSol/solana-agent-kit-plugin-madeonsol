import { z } from "zod";
export declare const kolFirstTouchesAction: {
    name: string;
    similes: string[];
    description: string;
    examples: {
        input: {
            preset: string;
            limit: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[][];
    schema: z.ZodObject<{
        limit: z.ZodDefault<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
        before: z.ZodOptional<z.ZodString>;
        kol: z.ZodOptional<z.ZodString>;
        min_kol_winrate_7d: z.ZodOptional<z.ZodNumber>;
        min_scout_tier: z.ZodOptional<z.ZodEnum<{
            S: "S";
            A: "A";
            B: "B";
            C: "C";
        }>>;
        min_n_touches: z.ZodOptional<z.ZodNumber>;
        strategy: z.ZodOptional<z.ZodEnum<{
            scalper: "scalper";
            day_trader: "day_trader";
            swing_trader: "swing_trader";
            hodler: "hodler";
            mixed: "mixed";
        }>>;
        token_age_max_min: z.ZodOptional<z.ZodNumber>;
        min_first_buy_sol: z.ZodOptional<z.ZodNumber>;
        mint_suffix: z.ZodOptional<z.ZodString>;
        preset: z.ZodOptional<z.ZodEnum<{
            scout: "scout";
            fresh_launch: "fresh_launch";
        }>>;
        include: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    handler: (agent: unknown, input: {
        limit?: number;
        since?: string;
        before?: string;
        kol?: string;
        min_kol_winrate_7d?: number;
        min_scout_tier?: "S" | "A" | "B" | "C";
        min_n_touches?: number;
        strategy?: "scalper" | "day_trader" | "swing_trader" | "hodler" | "mixed";
        token_age_max_min?: number;
        min_first_buy_sol?: number;
        mint_suffix?: string;
        preset?: "scout" | "fresh_launch";
        include?: string;
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
