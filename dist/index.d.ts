import { kolFeedAction } from "./actions/kolFeed.js";
import { kolCoordinationAction } from "./actions/kolCoordination.js";
import { kolLeaderboardAction } from "./actions/kolLeaderboard.js";
import { deployerAlertsAction } from "./actions/deployerAlerts.js";
import { kolPnlAction } from "./actions/kolPnl.js";
import { kolTrendingTokensAction } from "./actions/kolTrendingTokens.js";
import { walletTrackerWatchlistAction, walletTrackerAddAction, walletTrackerRemoveAction, walletTrackerTradesAction, walletTrackerSummaryAction } from "./actions/walletTracker.js";
import { kolTokenEntryOrderAction } from "./actions/kolTokenEntryOrder.js";
import { kolCompareAction } from "./actions/kolCompare.js";
import { kolAlertsRecentAction } from "./actions/kolAlertsRecent.js";
import { kolFirstTouchesAction } from "./actions/kolFirstTouches.js";
import { meAction } from "./actions/me.js";
import { tokensListAction } from "./actions/tokensList.js";
import { almostBondedAction } from "./actions/almostBonded.js";
import { tokenRiskAction } from "./actions/tokenRisk.js";
import { tokenBundleAction } from "./actions/tokenBundle.js";
import { tokenPoolsAction } from "./actions/tokenPools.js";
import { tokenDepthAction } from "./actions/tokenDepth.js";
import { deployerHistoryAction } from "./actions/deployerHistory.js";
import { tokenCandlesAction } from "./actions/tokenCandles.js";
import { tokenFlowAction } from "./actions/tokenFlow.js";
import { tokenRiskBatchAction } from "./actions/tokenRiskBatch.js";
import { tokenTradesAction } from "./actions/tokenTrades.js";
import { walletClassifyAction } from "./actions/walletClassify.js";
import { streamSessionsAction, streamSessionKillAction } from "./actions/streamSessions.js";
import { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent, createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, streamSessions, streamSessionKill, walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary, alphaLeaderboard, alphaWallet, alphaLinked, tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenBundle, tokenPools, tokenDepth, tokenCandles, tokenFlow, tokenTrades, deployerHistory, copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals, coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete, kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete, priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents, scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory, walletStats, walletPnl, walletPositions, walletHoldings, walletTrades, walletClassify, me, tokensList, almostBonded } from "./tools/index.js";
import { walletStatsAction, walletPnlAction, walletPositionsAction, walletHoldingsAction, walletTradesAction } from "./actions/wallet.js";
declare const MadeOnSolPlugin: {
    name: string;
    methods: {
        kolFeed: typeof kolFeed;
        kolCoordination: typeof kolCoordination;
        kolLeaderboard: typeof kolLeaderboard;
        deployerAlerts: typeof deployerAlerts;
        kolPnl: typeof kolPnl;
        kolTrendingTokens: typeof kolTrendingTokens;
        kolTokenEntryOrder: typeof kolTokenEntryOrder;
        kolCompare: typeof kolCompare;
        kolAlertsRecent: typeof kolAlertsRecent;
        createWebhook: typeof createWebhook;
        listWebhooks: typeof listWebhooks;
        deleteWebhook: typeof deleteWebhook;
        testWebhook: typeof testWebhook;
        getStreamToken: typeof getStreamToken;
        streamSessions: typeof streamSessions;
        streamSessionKill: typeof streamSessionKill;
        walletTrackerWatchlist: typeof walletTrackerWatchlist;
        walletTrackerAdd: typeof walletTrackerAdd;
        walletTrackerRemove: typeof walletTrackerRemove;
        walletTrackerTrades: typeof walletTrackerTrades;
        walletTrackerSummary: typeof walletTrackerSummary;
        alphaLeaderboard: typeof alphaLeaderboard;
        alphaWallet: typeof alphaWallet;
        alphaLinked: typeof alphaLinked;
        tokenCapTable: typeof tokenCapTable;
        tokenBuyerQuality: typeof tokenBuyerQuality;
        tokenRisk: typeof tokenRisk;
        tokenRiskBatch: typeof tokenRiskBatch;
        tokenBundle: typeof tokenBundle;
        tokenPools: typeof tokenPools;
        tokenDepth: typeof tokenDepth;
        tokenCandles: typeof tokenCandles;
        tokenFlow: typeof tokenFlow;
        tokenTrades: typeof tokenTrades;
        deployerHistory: typeof deployerHistory;
        copyTradeList: typeof copyTradeList;
        copyTradeCreate: typeof copyTradeCreate;
        copyTradeGet: typeof copyTradeGet;
        copyTradeUpdate: typeof copyTradeUpdate;
        copyTradeDelete: typeof copyTradeDelete;
        copyTradeSignals: typeof copyTradeSignals;
        coordinationAlertsList: typeof coordinationAlertsList;
        coordinationAlertsCreate: typeof coordinationAlertsCreate;
        coordinationAlertsGet: typeof coordinationAlertsGet;
        coordinationAlertsUpdate: typeof coordinationAlertsUpdate;
        coordinationAlertsDelete: typeof coordinationAlertsDelete;
        kolFirstTouches: typeof kolFirstTouches;
        firstTouchSubscriptionsList: typeof firstTouchSubscriptionsList;
        firstTouchSubscriptionsCreate: typeof firstTouchSubscriptionsCreate;
        firstTouchSubscriptionsGet: typeof firstTouchSubscriptionsGet;
        firstTouchSubscriptionsUpdate: typeof firstTouchSubscriptionsUpdate;
        firstTouchSubscriptionsDelete: typeof firstTouchSubscriptionsDelete;
        priceAlertsList: typeof priceAlertsList;
        priceAlertsCreate: typeof priceAlertsCreate;
        priceAlertsGet: typeof priceAlertsGet;
        priceAlertsUpdate: typeof priceAlertsUpdate;
        priceAlertsDelete: typeof priceAlertsDelete;
        priceAlertsEvents: typeof priceAlertsEvents;
        scoutLeaderboard: typeof scoutLeaderboard;
        coordinationHistory: typeof coordinationHistory;
        kolConsensus: typeof kolConsensus;
        peakHistory: typeof peakHistory;
        me: typeof me;
        tokensList: typeof tokensList;
        almostBonded: typeof almostBonded;
        walletStats: typeof walletStats;
        walletPnl: typeof walletPnl;
        walletPositions: typeof walletPositions;
        walletHoldings: typeof walletHoldings;
        walletTrades: typeof walletTrades;
        walletClassify: typeof walletClassify;
    };
    actions: ({
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                limit: number;
                action: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            action: import("zod").ZodOptional<import("zod").ZodEnum<["buy", "sell"]>>;
            kol: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            action?: "buy" | "sell" | undefined;
            kol?: string | undefined;
        }, {
            limit?: number | undefined;
            action?: "buy" | "sell" | undefined;
            kol?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            limit?: number;
            action?: string;
            kol?: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                period: string;
                min_kols: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["1h", "6h", "24h", "7d"]>>;
            min_kols: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            period: "1h" | "24h" | "6h" | "7d";
            min_kols: number;
            limit: number;
        }, {
            period?: "1h" | "24h" | "6h" | "7d" | undefined;
            min_kols?: number | undefined;
            limit?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            period?: string;
            min_kols?: number;
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
    } | {
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
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["today", "7d", "30d"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            period: "7d" | "today" | "30d";
            limit: number;
        }, {
            period?: "7d" | "today" | "30d" | undefined;
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
    } | {
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
        schema: import("zod").ZodObject<{
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            offset: import("zod").ZodDefault<import("zod").ZodNumber>;
            since: import("zod").ZodOptional<import("zod").ZodString>;
            tier: import("zod").ZodOptional<import("zod").ZodEnum<["elite", "good", "moderate", "rising", "cold"]>>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            offset: number;
            since?: string | undefined;
            tier?: "elite" | "good" | "moderate" | "rising" | "cold" | undefined;
        }, {
            limit?: number | undefined;
            since?: string | undefined;
            offset?: number | undefined;
            tier?: "elite" | "good" | "moderate" | "rising" | "cold" | undefined;
        }>;
        handler: (agent: unknown, input: {
            limit?: number;
            offset?: number;
            since?: string;
            tier?: "elite" | "good" | "moderate" | "rising" | "cold";
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                wallet: string;
                period: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            wallet: import("zod").ZodString;
            period: import("zod").ZodDefault<import("zod").ZodEnum<["7d", "30d", "90d", "180d"]>>;
        }, "strip", import("zod").ZodTypeAny, {
            period: "7d" | "30d" | "90d" | "180d";
            wallet: string;
        }, {
            wallet: string;
            period?: "7d" | "30d" | "90d" | "180d" | undefined;
        }>;
        handler: (agent: unknown, input: {
            wallet: string;
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                period: string;
                min_kols: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["5m", "15m", "30m", "1h", "2h", "4h", "12h"]>>;
            min_kols: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            period: "1h" | "5m" | "15m" | "30m" | "2h" | "4h" | "12h";
            min_kols: number;
            limit: number;
        }, {
            period?: "1h" | "5m" | "15m" | "30m" | "2h" | "4h" | "12h" | undefined;
            min_kols?: number | undefined;
            limit?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            period?: string;
            min_kols?: number;
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                wallet_address: string;
                label: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            wallet_address: import("zod").ZodString;
            label: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            wallet_address: string;
            label?: string | undefined;
        }, {
            wallet_address: string;
            label?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            wallet_address: string;
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                wallet_address: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            wallet_address: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            wallet_address: string;
        }, {
            wallet_address: string;
        }>;
        handler: (agent: unknown, input: {
            wallet_address: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
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
        schema: import("zod").ZodObject<{
            wallet: import("zod").ZodOptional<import("zod").ZodString>;
            action: import("zod").ZodOptional<import("zod").ZodEnum<["buy", "sell", "transfer_in", "transfer_out"]>>;
            event_type: import("zod").ZodOptional<import("zod").ZodEnum<["swap", "transfer"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            before: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            wallet?: string | undefined;
            action?: "buy" | "sell" | "transfer_in" | "transfer_out" | undefined;
            event_type?: "swap" | "transfer" | undefined;
            before?: number | undefined;
        }, {
            limit?: number | undefined;
            wallet?: string | undefined;
            action?: "buy" | "sell" | "transfer_in" | "transfer_out" | undefined;
            event_type?: "swap" | "transfer" | undefined;
            before?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            wallet?: string;
            action?: string;
            event_type?: string;
            limit?: number;
            before?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
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
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["24h", "7d", "30d"]>>;
            wallet: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            period: "24h" | "7d" | "30d";
            wallet?: string | undefined;
        }, {
            period?: "24h" | "7d" | "30d" | undefined;
            wallet?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            period?: string;
            wallet?: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                mint: string;
                limit: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            mint: string;
        }, {
            mint: string;
            limit?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                wallets: string[];
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            wallets: import("zod").ZodArray<import("zod").ZodString, "many">;
        }, "strip", import("zod").ZodTypeAny, {
            wallets: string[];
        }, {
            wallets: string[];
        }>;
        handler: (agent: unknown, input: {
            wallets: string[];
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
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
        schema: import("zod").ZodObject<{
            window: import("zod").ZodDefault<import("zod").ZodEnum<["5m", "15m", "1h", "6h", "24h"]>>;
            types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<["consensus_cluster", "fresh_token_kol_buy", "heating_up"]>, "many">>;
            min_severity: import("zod").ZodOptional<import("zod").ZodEnum<["low", "medium", "high"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
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
    } | {
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
        schema: import("zod").ZodObject<{
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            since: import("zod").ZodOptional<import("zod").ZodString>;
            before: import("zod").ZodOptional<import("zod").ZodString>;
            kol: import("zod").ZodOptional<import("zod").ZodString>;
            min_kol_winrate_7d: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_scout_tier: import("zod").ZodOptional<import("zod").ZodEnum<["S", "A", "B", "C"]>>;
            min_n_touches: import("zod").ZodOptional<import("zod").ZodNumber>;
            strategy: import("zod").ZodOptional<import("zod").ZodEnum<["scalper", "day_trader", "swing_trader", "hodler", "mixed"]>>;
            token_age_max_min: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_first_buy_sol: import("zod").ZodOptional<import("zod").ZodNumber>;
            mint_suffix: import("zod").ZodOptional<import("zod").ZodString>;
            preset: import("zod").ZodOptional<import("zod").ZodEnum<["scout", "fresh_launch"]>>;
            include: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            before?: string | undefined;
            since?: string | undefined;
            kol?: string | undefined;
            min_kol_winrate_7d?: number | undefined;
            min_scout_tier?: "S" | "A" | "B" | "C" | undefined;
            min_n_touches?: number | undefined;
            strategy?: "scalper" | "day_trader" | "swing_trader" | "hodler" | "mixed" | undefined;
            token_age_max_min?: number | undefined;
            min_first_buy_sol?: number | undefined;
            mint_suffix?: string | undefined;
            preset?: "scout" | "fresh_launch" | undefined;
            include?: string | undefined;
        }, {
            limit?: number | undefined;
            before?: string | undefined;
            since?: string | undefined;
            kol?: string | undefined;
            min_kol_winrate_7d?: number | undefined;
            min_scout_tier?: "S" | "A" | "B" | "C" | undefined;
            min_n_touches?: number | undefined;
            strategy?: "scalper" | "day_trader" | "swing_trader" | "hodler" | "mixed" | undefined;
            token_age_max_min?: number | undefined;
            min_first_buy_sol?: number | undefined;
            mint_suffix?: string | undefined;
            preset?: "scout" | "fresh_launch" | undefined;
            include?: string | undefined;
        }>;
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
    } | {
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
        schema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
        handler: (agent: unknown, _input: Record<string, never>) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
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
        schema: import("zod").ZodObject<{
            min_mc: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_mc: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_liq: import("zod").ZodOptional<import("zod").ZodNumber>;
            active_h: import("zod").ZodOptional<import("zod").ZodNumber>;
            primary_dex: import("zod").ZodOptional<import("zod").ZodEnum<["pumpfun", "pumpswap", "raydium", "meteora", "orca", "letsbonk", "other"]>>;
            authority_revoked: import("zod").ZodOptional<import("zod").ZodBoolean>;
            exclude_token2022: import("zod").ZodOptional<import("zod").ZodBoolean>;
            min_lp_burnt_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_volume_1h_usd: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_mev_share_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            mc_change_1h_min_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            mc_change_1h_max_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_liq_mc_ratio: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_liq_mc_ratio: import("zod").ZodOptional<import("zod").ZodNumber>;
            deployer_tier: import("zod").ZodOptional<import("zod").ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
            sort: import("zod").ZodOptional<import("zod").ZodEnum<["mc_desc", "mc_asc", "last_trade_desc", "liquidity_desc", "cumulative_volume_desc", "mc_change_5m_desc", "mc_change_1h_desc", "volume_1h_desc", "trending"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            offset: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                min_progress: number;
                min_velocity_pct_per_min: number;
                deployer_tier: string;
                sort: string;
                limit: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            min_progress: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_progress: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_velocity_pct_per_min: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_age_minutes: import("zod").ZodOptional<import("zod").ZodNumber>;
            deployer_tier: import("zod").ZodOptional<import("zod").ZodEnum<["elite", "good", "moderate", "rising", "cold", "unranked"]>>;
            authority_revoked: import("zod").ZodOptional<import("zod").ZodBoolean>;
            min_liq: import("zod").ZodOptional<import("zod").ZodNumber>;
            sort: import("zod").ZodOptional<import("zod").ZodEnum<["velocity_desc", "progress_desc", "eta_asc"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            sort?: "velocity_desc" | "progress_desc" | "eta_asc" | undefined;
            min_liq?: number | undefined;
            authority_revoked?: boolean | undefined;
            deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
            min_progress?: number | undefined;
            max_progress?: number | undefined;
            min_velocity_pct_per_min?: number | undefined;
            max_age_minutes?: number | undefined;
        }, {
            sort?: "velocity_desc" | "progress_desc" | "eta_asc" | undefined;
            limit?: number | undefined;
            min_liq?: number | undefined;
            authority_revoked?: boolean | undefined;
            deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked" | undefined;
            min_progress?: number | undefined;
            max_progress?: number | undefined;
            min_velocity_pct_per_min?: number | undefined;
            max_age_minutes?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            min_progress?: number;
            max_progress?: number;
            min_velocity_pct_per_min?: number;
            max_age_minutes?: number;
            deployer_tier?: "elite" | "good" | "moderate" | "rising" | "cold" | "unranked";
            authority_revoked?: boolean;
            min_liq?: number;
            sort?: "velocity_desc" | "progress_desc" | "eta_asc";
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
    } | {
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
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            mint: string;
        }, {
            mint: string;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                mint: string;
                sizes: number[];
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
            sizes: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
            mint: string;
            sizes?: number[] | undefined;
        }, {
            mint: string;
            sizes?: number[] | undefined;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
            sizes?: number[];
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                wallet: string;
                limit: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            wallet: import("zod").ZodString;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            wallet: string;
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
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                mint: string;
                tf: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
            tf: import("zod").ZodOptional<import("zod").ZodEnum<["1m", "5m", "15m", "1h", "4h", "1d"]>>;
            limit: import("zod").ZodOptional<import("zod").ZodNumber>;
            from: import("zod").ZodOptional<import("zod").ZodString>;
            to: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            mint: string;
            limit?: number | undefined;
            tf?: "1h" | "5m" | "15m" | "4h" | "1m" | "1d" | undefined;
            from?: string | undefined;
            to?: string | undefined;
        }, {
            mint: string;
            limit?: number | undefined;
            tf?: "1h" | "5m" | "15m" | "4h" | "1m" | "1d" | undefined;
            from?: string | undefined;
            to?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
            tf?: string;
            limit?: number;
            from?: string;
            to?: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
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
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
            window: import("zod").ZodOptional<import("zod").ZodEnum<["1h", "24h"]>>;
        }, "strip", import("zod").ZodTypeAny, {
            mint: string;
            window?: "1h" | "24h" | undefined;
        }, {
            mint: string;
            window?: "1h" | "24h" | undefined;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
            window?: "1h" | "24h";
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                mints: string[];
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            mints: import("zod").ZodArray<import("zod").ZodString, "many">;
        }, "strip", import("zod").ZodTypeAny, {
            mints: string[];
        }, {
            mints: string[];
        }>;
        handler: (agent: unknown, input: {
            mints: string[];
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                mint: string;
                limit: number;
                action: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            mint: import("zod").ZodString;
            limit: import("zod").ZodOptional<import("zod").ZodNumber>;
            cursor: import("zod").ZodOptional<import("zod").ZodString>;
            action: import("zod").ZodOptional<import("zod").ZodEnum<["buy", "sell"]>>;
            wallet: import("zod").ZodOptional<import("zod").ZodString>;
            since: import("zod").ZodOptional<import("zod").ZodNumber>;
            until: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            mint: string;
            limit?: number | undefined;
            wallet?: string | undefined;
            action?: "buy" | "sell" | undefined;
            cursor?: string | undefined;
            since?: number | undefined;
            until?: number | undefined;
        }, {
            mint: string;
            limit?: number | undefined;
            wallet?: string | undefined;
            action?: "buy" | "sell" | undefined;
            cursor?: string | undefined;
            since?: number | undefined;
            until?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            mint: string;
            limit?: number;
            cursor?: string;
            action?: "buy" | "sell";
            wallet?: string;
            since?: number;
            until?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                id: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
        }, "strip", import("zod").ZodTypeAny, {
            id: string | number;
        }, {
            id: string | number;
        }>;
        handler: (agent: unknown, input: {
            id: string | number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                address: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            address: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            address: string;
        }, {
            address: string;
        }>;
        handler: (agent: unknown, input: {
            address: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                address: string;
                limit: number;
                min_value_usd: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            address: import("zod").ZodString;
            limit: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_value_usd: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            address: string;
            limit?: number | undefined;
            min_value_usd?: number | undefined;
        }, {
            address: string;
            limit?: number | undefined;
            min_value_usd?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            address: string;
            limit?: number;
            min_value_usd?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                address: string;
                limit: number;
                action: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            address: import("zod").ZodString;
            limit: import("zod").ZodOptional<import("zod").ZodNumber>;
            cursor: import("zod").ZodOptional<import("zod").ZodString>;
            action: import("zod").ZodOptional<import("zod").ZodEnum<["buy", "sell"]>>;
            token_mint: import("zod").ZodOptional<import("zod").ZodString>;
            since: import("zod").ZodOptional<import("zod").ZodNumber>;
            until: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            address: string;
            limit?: number | undefined;
            action?: "buy" | "sell" | undefined;
            cursor?: string | undefined;
            token_mint?: string | undefined;
            since?: number | undefined;
            until?: number | undefined;
        }, {
            address: string;
            limit?: number | undefined;
            action?: "buy" | "sell" | undefined;
            cursor?: string | undefined;
            token_mint?: string | undefined;
            since?: number | undefined;
            until?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            address: string;
            limit?: number;
            cursor?: string;
            action?: "buy" | "sell";
            token_mint?: string;
            since?: number;
            until?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    })[];
    initialize(_agent: unknown): void;
};
export default MadeOnSolPlugin;
export { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent, createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, streamSessions, streamSessionKill, walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary, alphaLeaderboard, alphaWallet, alphaLinked, tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenBundle, tokenPools, tokenDepth, tokenCandles, tokenFlow, tokenTrades, deployerHistory, copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals, coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete, kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete, priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents, scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory, walletStats, walletPnl, walletPositions, walletHoldings, walletTrades, walletClassify, me, tokensList, almostBonded, };
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction, kolPnlAction, kolTrendingTokensAction, kolTokenEntryOrderAction, kolCompareAction, kolAlertsRecentAction, kolFirstTouchesAction };
export { walletTrackerWatchlistAction, walletTrackerAddAction, walletTrackerRemoveAction, walletTrackerTradesAction, walletTrackerSummaryAction };
export { walletStatsAction, walletPnlAction, walletPositionsAction, walletHoldingsAction, walletTradesAction };
export { meAction, tokensListAction, almostBondedAction, tokenRiskAction, tokenRiskBatchAction, tokenBundleAction, tokenPoolsAction, tokenDepthAction, deployerHistoryAction, tokenCandlesAction, tokenFlowAction, tokenTradesAction, walletClassifyAction, streamSessionsAction, streamSessionKillAction };
