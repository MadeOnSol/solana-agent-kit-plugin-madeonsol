import { z } from "zod";
import { streamSessions, streamSessionKill } from "../tools/index.js";
export const streamSessionsAction = {
    name: "MADEONSOL_STREAM_SESSIONS_ACTION",
    similes: ["list stream sessions", "live websocket sessions", "my streaming connections", "active ws sessions", "who is connected"],
    description: "List your live WebSocket streaming sessions across ws-streaming and dex-stream. Returns { sessions, count }: each session has id, service (ws-streaming|dex-stream), tier, channels[], connected_at, remote_ip, and messages_sent. PRO/ULTRA only.",
    examples: [
        [{ input: {}, output: { status: "success" }, explanation: "Show my active streaming sessions" }],
    ],
    schema: z.object({}),
    handler: async (agent) => {
        try {
            const data = await streamSessions(agent);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
export const streamSessionKillAction = {
    name: "MADEONSOL_STREAM_SESSION_KILL_ACTION",
    similes: ["kill stream session", "disconnect session", "evict websocket session", "close streaming session", "free up a connection slot"],
    description: "Evict (kill) one of your live WebSocket streaming sessions by id — frees the connection slot. Returns { evicted: true, id }; 404 if no such session, 400 if id is not a positive integer. PRO/ULTRA only.",
    examples: [
        [{ input: { id: "123" }, output: { status: "success" }, explanation: "Kill a live streaming session to free a slot" }],
    ],
    schema: z.object({
        id: z.union([z.string(), z.number()]).describe("Session id (positive integer)"),
    }),
    handler: async (agent, input) => {
        try {
            const data = await streamSessionKill(agent, input);
            return { status: "success", result: data };
        }
        catch (err) {
            return { status: "error", message: err.message };
        }
    },
};
