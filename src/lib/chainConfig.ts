export const poppchainConfig = {
  chainId: "poppchain",
  chainName: "Poppchain",
  rpc: "http://localhost:26657", // or use remote
  rest: "http://localhost:1317",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  currencies: [{ coinDenom: "token", coinMinimalDenom: "token", coinDecimals: 6 }],
  feeCurrencies: [{ coinDenom: "token", coinMinimalDenom: "token", coinDecimals: 6 }],
  stakeCurrency: { coinDenom: "token", coinMinimalDenom: "token", coinDecimals: 6 },
  gasPriceStep: { low: 0.01, average: 0.025, high: 0.03 },
};
