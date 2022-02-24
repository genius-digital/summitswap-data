const fs = require("fs");

const buildList = require("./buildList");
const { ChainIds, Networks, Tokens } = require("../constants");

Object.values(ChainIds).forEach(chainId => {
  const tokenJson = buildList(Tokens[chainId]);
  const stringifyTokenJson = JSON.stringify(tokenJson, null, 2);
  fs.writeFile(`build/${Networks[chainId]}.json`, stringifyTokenJson, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Successfully Written to build/${Networks[chainId]}.json.`);
  });
});
