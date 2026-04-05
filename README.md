# solana-agent-kit-plugin-madeonsol

[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit) plugin for [MadeOnSol](https://madeonsol.com) — Solana KOL intelligence and deployer analytics.

## Authentication

Three options (in priority order):

| Method | Config key | Best for |
|---|---|---|
| **MadeOnSol API key** (recommended) | `MADEONSOL_API_KEY` | Developers — [get a free key](https://madeonsol.com/developer) |
| RapidAPI key | `RAPIDAPI_KEY` | RapidAPI subscribers |
| x402 micropayments | `SVM_PRIVATE_KEY` | AI agents with Solana wallets |

## Install

```bash
npm install solana-agent-kit-plugin-madeonsol
```

> x402 peer deps (`@x402/fetch @x402/svm @x402/core @solana/kit @scure/base`) are only needed when using `SVM_PRIVATE_KEY`.

## Usage

```typescript
import { SolanaAgentKit } from "solana-agent-kit";
import MadeOnSolPlugin from "solana-agent-kit-plugin-madeonsol";

const agent = new SolanaAgentKit(privateKey, rpcUrl, {
  // Option 1: API key (simplest)
  MADEONSOL_API_KEY: "msk_your_api_key_here",

  // Option 2: RapidAPI key
  // RAPIDAPI_KEY: "your_rapidapi_key",

  // Option 3: x402 micropayments
  // SVM_PRIVATE_KEY: "your_solana_private_key_base58",
});

agent.use(MadeOnSolPlugin);

// Use via methods
const trades = await agent.methods.kolFeed(agent, { limit: 10, action: "buy" });

// Or let the LLM trigger actions via natural language
// "What are KOLs buying right now?" → MADEONSOL_KOL_FEED_ACTION
```

## Actions

| Action | Triggers on |
|---|---|
| `MADEONSOL_KOL_FEED_ACTION` | "kol trades", "what are kols buying" |
| `MADEONSOL_KOL_COORDINATION_ACTION` | "kol convergence", "tokens kols accumulating" |
| `MADEONSOL_KOL_LEADERBOARD_ACTION` | "top kols", "kol rankings", "best kol" |
| `MADEONSOL_DEPLOYER_ALERTS_ACTION` | "deployer alerts", "pump fun launches" |

## Also Available

| Platform | Package |
|---|---|
| TypeScript SDK | [`madeonsol-x402`](https://www.npmjs.com/package/madeonsol-x402) |
| Python (LangChain, CrewAI) | [`madeonsol-x402`](https://github.com/LamboPoewert/madeonsol-python) on PyPI |
| MCP Server (Claude, Cursor) | [`mcp-server-madeonsol`](https://www.npmjs.com/package/mcp-server-madeonsol) |
| ElizaOS | [`@madeonsol/plugin-madeonsol`](https://www.npmjs.com/package/@madeonsol/plugin-madeonsol) |

## License

MIT
