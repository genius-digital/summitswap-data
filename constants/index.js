const bscTokens = require("../tokens/bsc.json");
const bscTestnetTokens = require("../tokens/bsc-testnet.json");

const ChainIds = {
  BSC: 56,
  BSC_TESTNET: 97,
};
const Networks = {
  [ChainIds.BSC]: "bsc",
  [ChainIds.BSC_TESTNET]: "bsc-testnet",
};

const Tokens = {
  [ChainIds.BSC]: bscTokens,
  [ChainIds.BSC_TESTNET]: bscTestnetTokens,
}

module.exports = {
  Tokens,
  ChainIds,
  Networks,
};
