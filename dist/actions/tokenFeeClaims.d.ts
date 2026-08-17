import { z } from "zod";
import type { TokenFeeClaimsParams } from "../tools/index.js";
export declare const tokenFeeClaimsAction: {
    name: string;
    similes: string[];
    description: string;
    examples: ({
        input: {
            type: string;
            min_sol: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[] | {
        input: {
            type: string;
            social_platform: number;
        };
        output: {
            status: string;
        };
        explanation: string;
    }[])[];
    schema: z.ZodObject<{
        type: z.ZodOptional<z.ZodString>;
        mint: z.ZodOptional<z.ZodString>;
        recipient: z.ZodOptional<z.ZodString>;
        actor: z.ZodOptional<z.ZodString>;
        social_platform: z.ZodOptional<z.ZodNumber>;
        social_user_id: z.ZodOptional<z.ZodString>;
        min_sol: z.ZodOptional<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
        before: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        mint?: string | undefined;
        since?: string | undefined;
        before?: string | undefined;
        type?: string | undefined;
        recipient?: string | undefined;
        social_platform?: number | undefined;
        min_sol?: number | undefined;
        actor?: string | undefined;
        social_user_id?: string | undefined;
    }, {
        limit?: number | undefined;
        mint?: string | undefined;
        since?: string | undefined;
        before?: string | undefined;
        type?: string | undefined;
        recipient?: string | undefined;
        social_platform?: number | undefined;
        min_sol?: number | undefined;
        actor?: string | undefined;
        social_user_id?: string | undefined;
    }>;
    handler: (agent: unknown, input: TokenFeeClaimsParams) => Promise<{
        status: string;
        result: any;
        message?: undefined;
    } | {
        status: string;
        message: string;
        result?: undefined;
    }>;
};
