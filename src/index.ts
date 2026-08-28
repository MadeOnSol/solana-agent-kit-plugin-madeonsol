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
import { tokenHoldersAction } from "./actions/tokenHolders.js";
import { tokenLocksAction } from "./actions/tokenLocks.js";
import { tokenLocksFeedAction } from "./actions/tokenLocksFeed.js";
import { tokenUnlocksAction } from "./actions/tokenUnlocks.js";
import { tokenFeeSharesAction } from "./actions/tokenFeeShares.js";
import { tokenFeeClaimsAction } from "./actions/tokenFeeClaims.js";
import { tokenSurgesAction } from "./actions/tokenSurges.js";
import { deployerHistoryAction } from "./actions/deployerHistory.js";
import {
  deployerStatsAction,
  deployerLeaderboardAction,
  deployerProfileAction,
  deployerTokensAction,
  deployerAlertStatsAction,
  deployerBestTokensAction,
  deployerRecentBondsAction,
} from "./actions/deployerHunter.js";
import { tokenCandlesAction } from "./actions/tokenCandles.js";
import { tokenFlowAction } from "./actions/tokenFlow.js";
import { tokenRiskBatchAction } from "./actions/tokenRiskBatch.js";
import { tokenTradesAction } from "./actions/tokenTrades.js";
import { walletClassifyAction } from "./actions/walletClassify.js";
import { streamSessionsAction, streamSessionKillAction } from "./actions/streamSessions.js";
import {
  kolFeed, kolCoordination, kolLeaderboard, deployerAlerts, kolPnl, kolTrendingTokens, kolTokenEntryOrder, kolCompare, kolAlertsRecent,
  createWebhook, listWebhooks, deleteWebhook, testWebhook, getStreamToken, streamSessions, streamSessionKill,
  walletTrackerWatchlist, walletTrackerAdd, walletTrackerRemove, walletTrackerTrades, walletTrackerSummary,
  alphaLeaderboard, alphaWallet, alphaLinked,
  tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenBundle, tokenPools, tokenDepth, tokenHolders, tokenLocks, tokenLocksFeed, tokenUnlocks, tokenFeeShares, tokenFeeClaims, tokenSurges, tokenCandles, tokenFlow, tokenTrades,
  deployerHistory,
  deployerStats,
  deployerLeaderboard,
  deployerProfile,
  deployerTokens,
  deployerAlertStats,
  deployerBestTokens,
  deployerRecentBonds,
  copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals,
  coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete,
  kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete,
  priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents,
  scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory,
  walletStats, walletPnl, walletPositions, walletHoldings, walletTrades, walletClassify,
  me, tokensList, almostBonded,
} from "./tools/index.js";
import { walletStatsAction, walletPnlAction, walletPositionsAction, walletHoldingsAction, walletTradesAction } from "./actions/wallet.js";

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
    tokenBundle,
    tokenPools,
    tokenDepth,
    tokenHolders,
    tokenLocks,
    tokenLocksFeed,
    tokenUnlocks,
    tokenFeeShares,
    tokenFeeClaims,

    tokenSurges,    tokenCandles,
    tokenFlow,
    tokenTrades,
    deployerHistory,
    deployerStats,
    deployerLeaderboard,
    deployerProfile,
    deployerTokens,
    deployerAlertStats,
    deployerBestTokens,
    deployerRecentBonds,
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
    walletHoldings,
    walletTrades,
    walletClassify,
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
    tokenBundleAction,
    tokenPoolsAction,
    tokenDepthAction,
    tokenHoldersAction,
    tokenLocksAction,
    tokenLocksFeedAction,
    tokenUnlocksAction,
    tokenFeeSharesAction,
    tokenFeeClaimsAction,

    tokenSurgesAction,    deployerHistoryAction,
    deployerStatsAction,
    deployerLeaderboardAction,
    deployerProfileAction,
    deployerTokensAction,
    deployerAlertStatsAction,
    deployerBestTokensAction,
    deployerRecentBondsAction,
    tokenCandlesAction,
    tokenFlowAction,
    tokenTradesAction,
    walletClassifyAction,
    streamSessionsAction,
    streamSessionKillAction,
    walletStatsAction,
    walletPnlAction,
    walletPositionsAction,
    walletHoldingsAction,
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
  tokenCapTable, tokenBuyerQuality, tokenRisk, tokenRiskBatch, tokenBundle, tokenPools, tokenDepth, tokenHolders, tokenLocks, tokenLocksFeed, tokenUnlocks, tokenFeeShares, tokenFeeClaims, tokenSurges, tokenCandles, tokenFlow, tokenTrades,
  deployerHistory,
  deployerStats,
  deployerLeaderboard,
  deployerProfile,
  deployerTokens,
  deployerAlertStats,
  deployerBestTokens,
  deployerRecentBonds,
  copyTradeList, copyTradeCreate, copyTradeGet, copyTradeUpdate, copyTradeDelete, copyTradeSignals,
  coordinationAlertsList, coordinationAlertsCreate, coordinationAlertsGet, coordinationAlertsUpdate, coordinationAlertsDelete,
  kolFirstTouches, firstTouchSubscriptionsList, firstTouchSubscriptionsCreate, firstTouchSubscriptionsGet, firstTouchSubscriptionsUpdate, firstTouchSubscriptionsDelete,
  priceAlertsList, priceAlertsCreate, priceAlertsGet, priceAlertsUpdate, priceAlertsDelete, priceAlertsEvents,
  scoutLeaderboard, coordinationHistory, kolConsensus, peakHistory,
  walletStats, walletPnl, walletPositions, walletHoldings, walletTrades, walletClassify,
  me, tokensList, almostBonded,
};
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction, kolPnlAction, kolTrendingTokensAction, kolTokenEntryOrderAction, kolCompareAction, kolAlertsRecentAction, kolFirstTouchesAction };
export { walletTrackerWatchlistAction, walletTrackerAddAction, walletTrackerRemoveAction, walletTrackerTradesAction, walletTrackerSummaryAction };
export { walletStatsAction, walletPnlAction, walletPositionsAction, walletHoldingsAction, walletTradesAction };
export { meAction, tokensListAction, almostBondedAction, tokenRiskAction, tokenRiskBatchAction, tokenBundleAction, tokenPoolsAction, tokenDepthAction, tokenHoldersAction, tokenLocksAction, tokenLocksFeedAction, tokenUnlocksAction, tokenFeeSharesAction, tokenFeeClaimsAction, tokenSurgesAction, deployerHistoryAction, deployerStatsAction, deployerLeaderboardAction, deployerProfileAction, deployerTokensAction, deployerAlertStatsAction, deployerBestTokensAction, deployerRecentBondsAction, tokenCandlesAction, tokenFlowAction, tokenTradesAction, walletClassifyAction, streamSessionsAction, streamSessionKillAction };
