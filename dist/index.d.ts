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
import { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent, createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary, alphaLeaderboard, alphaWallet, alphaLinked, tokenCapTable, tokenBuyerQuality, copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals, coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete, kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete, priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents, scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory, walletStats, walletPnl, walletPositions, walletTrades, me, tokensList } from "./tools/index.js";
import { walletStatsAction, walletPnlAction, walletPositionsAction, walletTradesAction } from "./actions/wallet.js";
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
        walletStats: typeof walletStats;
        walletPnl: typeof walletPnl;
        walletPositions: typeof walletPositions;
        walletTrades: typeof walletTrades;
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
            action: import("zod").ZodOptional<import("zod").ZodEnum<{
                buy: "buy";
                sell: "sell";
            }>>;
            kol: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>;
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
            period: import("zod").ZodDefault<import("zod").ZodEnum<{
                "24h": "24h";
                "1h": "1h";
                "6h": "6h";
                "7d": "7d";
            }>>;
            min_kols: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
            period: import("zod").ZodDefault<import("zod").ZodEnum<{
                "7d": "7d";
                today: "today";
                "30d": "30d";
            }>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
            tier: import("zod").ZodOptional<import("zod").ZodEnum<{
                elite: "elite";
                good: "good";
                moderate: "moderate";
                rising: "rising";
                cold: "cold";
            }>>;
        }, import("zod/v4/core").$strip>;
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
            period: import("zod").ZodDefault<import("zod").ZodEnum<{
                "7d": "7d";
                "30d": "30d";
                "90d": "90d";
                "180d": "180d";
            }>>;
        }, import("zod/v4/core").$strip>;
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
            period: import("zod").ZodDefault<import("zod").ZodEnum<{
                "1h": "1h";
                "5m": "5m";
                "15m": "15m";
                "30m": "30m";
                "2h": "2h";
                "4h": "4h";
                "12h": "12h";
            }>>;
            min_kols: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
        }, import("zod/v4/core").$strip>;
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
        }, import("zod/v4/core").$strip>;
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
            action: import("zod").ZodOptional<import("zod").ZodEnum<{
                buy: "buy";
                sell: "sell";
                transfer_in: "transfer_in";
                transfer_out: "transfer_out";
            }>>;
            event_type: import("zod").ZodOptional<import("zod").ZodEnum<{
                swap: "swap";
                transfer: "transfer";
            }>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            before: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
            period: import("zod").ZodDefault<import("zod").ZodEnum<{
                "24h": "24h";
                "7d": "7d";
                "30d": "30d";
            }>>;
            wallet: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>;
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
        }, import("zod/v4/core").$strip>;
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
            wallets: import("zod").ZodArray<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>;
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
            window: import("zod").ZodDefault<import("zod").ZodEnum<{
                "24h": "24h";
                "1h": "1h";
                "6h": "6h";
                "5m": "5m";
                "15m": "15m";
            }>>;
            types: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<{
                consensus_cluster: "consensus_cluster";
                fresh_token_kol_buy: "fresh_token_kol_buy";
                heating_up: "heating_up";
            }>>>;
            min_severity: import("zod").ZodOptional<import("zod").ZodEnum<{
                high: "high";
                medium: "medium";
                low: "low";
            }>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
            min_scout_tier: import("zod").ZodOptional<import("zod").ZodEnum<{
                S: "S";
                A: "A";
                B: "B";
                C: "C";
            }>>;
            min_n_touches: import("zod").ZodOptional<import("zod").ZodNumber>;
            strategy: import("zod").ZodOptional<import("zod").ZodEnum<{
                scalper: "scalper";
                day_trader: "day_trader";
                swing_trader: "swing_trader";
                hodler: "hodler";
                mixed: "mixed";
            }>>;
            token_age_max_min: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_first_buy_sol: import("zod").ZodOptional<import("zod").ZodNumber>;
            mint_suffix: import("zod").ZodOptional<import("zod").ZodString>;
            preset: import("zod").ZodOptional<import("zod").ZodEnum<{
                scout: "scout";
                fresh_launch: "fresh_launch";
            }>>;
            include: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>;
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
        schema: import("zod").ZodObject<{}, import("zod/v4/core").$strip>;
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
            primary_dex: import("zod").ZodOptional<import("zod").ZodEnum<{
                pumpfun: "pumpfun";
                pumpswap: "pumpswap";
                raydium: "raydium";
                meteora: "meteora";
                orca: "orca";
                letsbonk: "letsbonk";
                other: "other";
            }>>;
            authority_revoked: import("zod").ZodOptional<import("zod").ZodBoolean>;
            exclude_token2022: import("zod").ZodOptional<import("zod").ZodBoolean>;
            min_lp_burnt_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_volume_1h_usd: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_mev_share_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            mc_change_1h_min_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            mc_change_1h_max_pct: import("zod").ZodOptional<import("zod").ZodNumber>;
            min_liq_mc_ratio: import("zod").ZodOptional<import("zod").ZodNumber>;
            max_liq_mc_ratio: import("zod").ZodOptional<import("zod").ZodNumber>;
            deployer_tier: import("zod").ZodOptional<import("zod").ZodEnum<{
                elite: "elite";
                good: "good";
                moderate: "moderate";
                rising: "rising";
                cold: "cold";
                unranked: "unranked";
            }>>;
            sort: import("zod").ZodOptional<import("zod").ZodEnum<{
                mc_desc: "mc_desc";
                mc_asc: "mc_asc";
                last_trade_desc: "last_trade_desc";
                liquidity_desc: "liquidity_desc";
                cumulative_volume_desc: "cumulative_volume_desc";
            }>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            offset: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
        }, import("zod/v4/core").$strip>;
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
            action: import("zod").ZodOptional<import("zod").ZodEnum<{
                buy: "buy";
                sell: "sell";
            }>>;
            token_mint: import("zod").ZodOptional<import("zod").ZodString>;
            since: import("zod").ZodOptional<import("zod").ZodNumber>;
            until: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, import("zod/v4/core").$strip>;
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
export { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent, createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary, alphaLeaderboard, alphaWallet, alphaLinked, tokenCapTable, tokenBuyerQuality, copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals, coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete, kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete, priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents, scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory, walletStats, walletPnl, walletPositions, walletTrades, me, tokensList, };
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction, kolPnlAction, kolTrendingTokensAction, kolTokenEntryOrderAction, kolCompareAction, kolAlertsRecentAction, kolFirstTouchesAction };
export { walletTrackerWatchlistAction, walletTrackerAddAction, walletTrackerRemoveAction, walletTrackerTradesAction, walletTrackerSummaryAction };
export { walletStatsAction, walletPnlAction, walletPositionsAction, walletTradesAction };
export { meAction, tokensListAction };
