import { ethers } from "ethers";
import { readFileSync } from "fs";

const PRIVATE_KEY = "f3f894c0001d5bffd43e951f422a2c79ebdf5c2da47c2eabdb1c3a370c4a0204";
const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Deploying from:", wallet.address);

  const artifact = JSON.parse(
    readFileSync("./artifacts/contracts/PrefLedger.sol/PrefLedger.json", "utf8")
  );

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ PrefLedger deployed to:", address);
  console.log("🔍 Snowtrace: https://testnet.snowtrace.io/address/" + address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});