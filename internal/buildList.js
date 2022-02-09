const { version } = require("../package.json");

const bsc = require("../tokens/bsc.json");
const bscTestnet = require("../tokens/bsc-testnet.json");

module.exports = function buildList() {
  const parsed = version.split(".")
  return {
    name: "SummitSwap Menu",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://raw.githubusercontent.com/Koda-Finance/summitswap-data/main/images/coins/koda.png",
    keywords: ["summitswap", "token", "list"],
    tokens: [
      ...bsc,
      ...bscTestnet,
    ]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1
        }
        return t1.chainId < t2.chainId ? -1 : 1
      }),
  }
}
