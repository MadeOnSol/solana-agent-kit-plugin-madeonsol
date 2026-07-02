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
import { tokenCandlesAction } from "./actions/tokenCandles.js";
import { tokenFlowAction } from "./actions/tokenFlow.js";
import { tokenRiskBatchAction } from "./actions/tokenRiskBatch.js";
import { streamSessionsAction, streamSessionKillAction } from "./actions/streamSessions.js";
import {
  kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent,
  createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, streamSessions, streamSessionKill,
  walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary,
  alphaLeaderboard, alphaWallet, alphaLinked,
  tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenCandles, tokenFlow,
  copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals,
  coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete,
  kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete,
  priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents,
  scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory,
  walletStats, walletPnl, walletPositions, walletTrades,
  me, tokensList, almostBonded,
} from "./tools/index.js";
import { walletStatsAction, walletPnlAction, walletPositionsAction, walletTradesAction } from "./actions/wallet.js";

const MadeOnSolPlugin = {
  name: "madeonsol",
  methods: {
    kolFeed,
    kolCoordination,
    kolLeaderboard,
    deployerAlerts,
    kolPnl,
    kolTrendingTokens,
    kolTokenEntryOrder,
    kolCompare,
    kolAlertsRecent,
    createWebhook,
    listWebhooks,
    deleteWebhook,
    testWebhook,
    getStreamToken,
    streamSessions,
    streamSessionKill,
    walletTrackerWatchlist,
    walletTrackerAdd,
    walletTrackerRemove,
    walletTrackerTrades,
    walletTrackerSummary,
    alphaLeaderboard,
    alphaWallet,
    alphaLinked,
    tokenCapTable,
    tokenBuyerQuality,
    tokenRisk,
    tokenRiskBatch,
    tokenCandles,
    tokenFlow,
    copyTradeList,
    copyTradeCreate,
    copyTradeGet,
    copyTradeUpdate,
    copyTradeDelete,
    copyTradeSignals,
    coordinationAlertsList,
    coordinationAlertsCreate,
    coordinationAlertsGet,
    coordinationAlertsUpdate,
    coordinationAlertsDelete,
    kolFirstTouches,
    firstTouchSubscriptionsList,
    firstTouchSubscriptionsCreate,
    firstTouchSubscriptionsGet,
    firstTouchSubscriptionsUpdate,
    firstTouchSubscriptionsDelete,
    priceAlertsList,
    priceAlertsCreate,
    priceAlertsGet,
    priceAlertsUpdate,
    priceAlertsDelete,
    priceAlertsEvents,
    scoutLeaderboard,
    coordinationHistory,
    kolConsensus,
    peakHistory,
    me,
    tokensList,
    almostBonded,
    walletStats,
    walletPnl,
    walletPositions,
    walletTrades,
  },
  actions: [
    kolFeedAction,
    kolCoordinationAction,
    kolLeaderboardAction,
    deployerAlertsAction,
    kolPnlAction,
    kolTrendingTokensAction,
    kolTokenEntryOrderAction,
    kolCompareAction,
    kolAlertsRecentAction,
    kolFirstTouchesAction,
    walletTrackerWatchlistAction,
    walletTrackerAddAction,
    walletTrackerRemoveAction,
    walletTrackerTradesAction,
    walletTrackerSummaryAction,
    meAction,
    tokensListAction,
    almostBondedAction,
    tokenRiskAction,
    tokenRiskBatchAction,
    tokenCandlesAction,
    tokenFlowAction,
    streamSessionsAction,
    streamSessionKillAction,
    walletStatsAction,
    walletPnlAction,
    walletPositionsAction,
    walletTradesAction,
  ],
  initialize(_agent: unknown) {
    // No-op — payment setup is lazy in tool functions
  },
};

export default MadeOnSolPlugin;
export {
  kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent,
  createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, streamSessions, streamSessionKill,
  walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary,
  alphaLeaderboard, alphaWallet, alphaLinked,
  tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenCandles, tokenFlow,
  copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals,
  coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete,
  kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete,
  priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents,
  scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory,
  walletStats, walletPnl, walletPositions, walletTrades,
  me, tokensList, almostBonded,
};
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction, kolPnlAction, kolTrendingTokensAction, kolTokenEntryOrderAction, kolCompareAction, kolAlertsRecentAction, kolFirstTouchesAction };
export { walletTrackerWatchlistAction, walletTrackerAddAction, walletTrackerRemoveAction, walletTrackerTradesAction, walletTrackerSummaryAction };
export { walletStatsAction, walletPnlAction, walletPositionsAction, walletTradesAction };
export { meAction, tokensListAction, almostBondedAction, tokenRiskAction, tokenRiskBatchAction, tokenCandlesAction, tokenFlowAction, streamSessionsAction, streamSessionKillAction };
