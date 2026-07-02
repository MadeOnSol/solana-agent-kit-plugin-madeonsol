import { z } from "zod";
import { tokenCandles } from "../tools/index.js";
export const tokenCandlesAction = {
    name: "MADEONSOL_TOKEN_CANDLES_ACTION",
    similes: ["token candles", "ohlc", "ohlcv", "price chart", "candlestick", "price history"],
    description: "Get historical OHLCV price candles for a Solana token (1m/5m/15m/1h/4h/1d). Each candle has t/open/high/low/close/volume_usd/trades/market_cap_usd. PRO returns OHLCV for the last 30 days; ULTRA adds buy/sell volume + count splits, net flow, MEV volume, open/close liquidity, and full history. PRO/ULTRA only — BASIC receives HTTP 403.",
    examples: [
        [{ input: { mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", tf: "1h" }, output: { status: "success" }, explanation: "Get the 1h OHLCV candle history for this token." }],
    ],
    schema: z.object({
        mint: z.string().describe("Token mint address (base58)"),
        tf: z.enum(["1m", "5m", "15m", "1h", "4h", "1d"]).optional().describe("Candle timeframe (default 1h)"),
        limit: z.number().min(1).max(1000).optional().describe("Number of candles to return, 1–1000 (default 200)"),
        from: z.string().optional().describe("Start of range, ISO8601 timestamp"),
        to: z.string().optional().describe("End of range, ISO8601 timestamp"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await tokenCandles(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
