import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    fuji: {
      type: "http",
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: ["f3f894c0001d5bffd43e951f422a2c79ebdf5c2da47c2eabdb1c3a370c4a0204"],
    },
  },
};

export default config;