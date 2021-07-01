const ethers = require("ethers");

// aggregators docs: https://docs.chain.link/docs/ethereum-addresses/#Ethereum%20Mainnet

async function main(){
    // load config.json
    const nodeUrl = require("./config.json").ethNodeUrl;

    // load abi aggregator & token addresses
    const tokenList = require("./config-chainlink/config-tokens.json");
    const abi = require("./config-chainlink/abi-aggregator.json").abi;

    // load params
    const provider = new ethers.providers.JsonRpcProvider(nodeUrl);

    for (let i = 0; i < tokenList.length; i++){
        const tokenInfo = tokenList[i];

        // load contract
        const ethAggregator = new ethers.Contract(tokenInfo.addressAggregator, abi, provider);
        // get decimals
        const decimals = Number(await ethAggregator.decimals());
        // compute price
        let price = Number(await ethAggregator.latestAnswer.call());
        price = price / 10**decimals;
        console.log(`price ${tokenInfo.tokenName}: ${price.toFixed(2)}`);
    }
}

main();