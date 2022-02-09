const XLSX = require("xlsx");

const { ChainId } = require('@summitswap-sdk');

const fs = require("fs");

const { resolve } = require("path");

const NAME = {
  [ChainId.MAINNET]: "bsc",
  [ChainId.BSCTESTNET]: "bsc-testnet",
};

try {
  const book = XLSX.utils.book_new();

  for (const key of Object.keys(ChainId)) {
    const tokenPath = resolve(__dirname, `../tokens/${NAME[key]}.json`);

    if (!fs.existsSync(tokenPath)) {
      continue;
    }

    const tokens = require(tokenPath);

    const json = [];

    for (const token of tokens) {
      const tokenImageCoinPath = resolve(__dirname, `../images/coins/${token.symbol.replace(/[^a-zA-Z]/g, "")}.png`);
      const tokenImageNetworkPath = resolve(__dirname, `../images/networks/${token.address}.png`);

      const isTokenImageCoinExists = fs.existsSync(tokenImageCoinPath);
      const isTokenImageNetworkExists = fs.existsSync(tokenImageNetworkPath);

      if (!isTokenImageCoinExists && !isTokenImageNetworkExists) {
        json.push({
          network: NAME[key],
          address: token.address,
          name: token.name,
          symbol: token.symbol,
          logoURI: token?.logoURI || "",
        });
        console.log(`Add ${token.name} to list`);
        continue;
      }

      // Automate update logoURI
      if (!token.logoURI.includes("Koda-Finance/summitswap-data") && (isTokenImageCoinExists || isTokenImageNetworkExists)) {
        let logoURI = "";
        if (isTokenImageCoinExists) {
          logoURI = `https://raw.githubusercontent.com/Koda-Finance/summitswap-data/main/images/coins/${token.symbol.replace(/[^a-zA-Z]/g, "")}.png`
        } else if (isTokenImageNetworkExists) {
          logoURI = `https://raw.githubusercontent.com/Koda-Finance/summitswap-data/main/images/networks/${NAME[key]}/${token.address}.png`
        }
        token.logoURI = logoURI;
        console.log(`Update Logo URI for ${token.symbol} with ${logoURI}`);
      } else {
        console.log(`Logo URI for ${token.symbol} is correct`);
      }
    }

    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 4));

    const sheet = XLSX.utils.json_to_sheet(json);

    XLSX.utils.book_append_sheet(book, sheet, NAME[key]);
  }
  XLSX.writeFile(book, resolve(__dirname, `../generated/missing-icons.xlsx`));
} catch (error) {
  console.error(error);
}
