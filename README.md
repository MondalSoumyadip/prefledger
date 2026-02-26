# ⛰️ PrefLedger

> Decentralized Preference Registry on Avalanche

PrefLedger is a Web3 protocol that allows any wallet to store, update, and retrieve structured user preferences on-chain. Built on Avalanche C-Chain with IPFS metadata storage, PrefLedger provides a permissionless, censorship-resistant preference layer that any dApp, DAO, or protocol can read and build on.

---

## 🔗 Live Deployment

- **Contract Address:** `0x0C108164Ee97792443bB03F68357D6F4033Cc568`
- **Network:** Avalanche Fuji Testnet (C-Chain)
- **Snowtrace:** [View Contract](https://testnet.snowtrace.io/address/0x0C108164Ee97792443bB03F68357D6F4033Cc568)

---

## 🧠 The Problem

User preferences in Web3 are siloed. Every dApp stores its own copy of your settings — your theme, language, notification preferences — in its own database. When you switch apps, your preferences don't follow you. There is no universal, permissionless preference layer for Web3.

---

## ✅ The Solution

PrefLedger stores preferences as IPFS-hosted JSON objects with an on-chain CID pointer on Avalanche C-Chain. Any dApp can:

- Write a preference for a connected wallet
- Read preferences for any wallet address
- Access full preference history with timestamps
- Build on top of a shared, permissionless preference graph

---

## 🏗️ Architecture

```
User → Frontend (React + Vite)
           ↓
     Upload JSON to IPFS (Pinata)
           ↓
     Get CID hash back
           ↓
     Write CID to Avalanche C-Chain (PrefLedger.sol)
           ↓
     Any dApp can read preferences permissionlessly
```

---

## ⚙️ Smart Contract

**PrefLedger.sol** — deployed on Avalanche Fuji C-Chain

| Function | Description |
|---|---|
| `setPreference(bytes32 key, string ipfsCID)` | Store a preference on-chain |
| `getPreference(address user, bytes32 key)` | Read latest preference for a wallet |
| `getPreferenceHistory(address user, bytes32 key)` | Get full history of preference updates |
| `getUserKeys(address user)` | Get all preference keys for a wallet |

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.28, Hardhat v3 |
| Blockchain | Avalanche C-Chain (Fuji Testnet) |
| Storage | IPFS via Pinata |
| Frontend | React + Vite |
| Web3 | ethers.js v6 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- MetaMask with Avalanche Fuji Testnet configured
- Fuji test AVAX

### Clone and Install

```bash
git clone https://github.com/MondalSoumyadip/prefledger.git
cd prefledger
```

### Run Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Add your Pinata API keys to .env
npm run dev
```

### Deploy Contract

```bash
cd prefledger
npm install
npx hardhat run scripts/deploy.ts --network fuji
```

---

## 🔑 Environment Variables

Create a `.env` file in the `frontend` folder:

```
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET=your_pinata_secret
VITE_CONTRACT_ADDRESS=0x0C108164Ee97792443bB03F68357D6F4033Cc568
```

---

## 🎯 Real World Use Cases

- **DAOs** — Read member preferences for governance UI personalization
- **DeFi protocols** — Store user display and notification preferences
- **NFT platforms** — Save user collection and filter preferences
- **Cross-app identity** — Any dApp reads your preferences without asking

---

## 👥 Team

Built for **Avalanche Build Games Hackathon 2026**

---

## 📄 License

MIT
