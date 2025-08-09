import { useEffect, useState } from "react";
import { MsgSubmitProblem } from "@/proto/poppchain/problem/v1/tx";
import { Registry } from "@cosmjs/proto-signing";
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

export function useKeplr() {
  const [address, setAddress] = useState<string | null>(null);
  const [client, setClient] = useState<SigningStargateClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    if (!window.keplr) {
      setError("Please install Keplr extension");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const chainId = "poppchain-1";
      const gasPrice = GasPrice.fromString("0.025stake"); // ✅ Updated fee denom

      await window.keplr.experimentalSuggestChain({
        chainId: chainId,
        chainName: "PoPP Chain",
        rpc: "http://localhost:26657",
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
        currencies: [
          {
            coinDenom: "PoPP",
            coinMinimalDenom: "stake", // ✅ Correct denom
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "PoPP",
            coinMinimalDenom: "stake", // ✅ Correct denom
            coinDecimals: 6,
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.03,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "PoPP",
          coinMinimalDenom: "stake", // ✅ Correct denom
          coinDecimals: 6,
        },
        features: ["stargate"],
      });

      window.keplr.defaultOptions = {
        sign: {
          preferNoSetFee: false,
          disableBalanceCheck: true,
        },
      };

      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);

      const registry = new Registry();
      registry.register("/poppchain.problem.v1.MsgSubmitProblem", MsgSubmitProblem);

      const client = await SigningStargateClient.connectWithSigner(
        "http://localhost:26657",
        offlineSigner,
        {
          registry,
          gasPrice,
        }
      );

      setClient(client);

      try {
        const balance = await client.getAllBalances(accounts[0].address);
        console.log("Account balance:", balance);
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
      }

    } catch (err) {
      console.error("Error connecting to Keplr:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to Keplr");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.keplr) {
      connect();
    }
  }, []);

  const disconnect = () => {
    setAddress(null);
    setClient(null);
  };

  return { address, client, connect, disconnect, isLoading, error };
}
