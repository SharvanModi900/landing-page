"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface UserProfile {
  id: string;
  wallet_address: string;
  display_name: string | null;
  email: string | null;
  avatar: string | null;
  r_score: number;
  satmudra_balance: number;
  staked_amount: number;
  tickets_submitted: number;
  tickets_resolved: number;
  validations_done: number;
  validator_level: number;
}

interface WalletState {
  connected: boolean;
  address: string | null;
  name: string | null;
  balance: string | null;
  token: string | null;
  user: UserProfile | null;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  loading: boolean;
  error: string | null;
  /** Returns the Authorization header object, or empty object if not logged in */
  getAuthHeaders: () => Record<string, string>;
  /** Refresh user profile from backend */
  refreshProfile: () => Promise<void>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://popp.thharko.com";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */
const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
  name: null,
  balance: null,
  token: null,
  user: null,
  connect: async () => {},
  disconnect: () => {},
  loading: false,
  error: null,
  getAuthHeaders: () => ({}),
  refreshProfile: async () => {},
});

export const useWallet = () => useContext(WalletContext);

/* ------------------------------------------------------------------ */
/*  Chain config                                                       */
/* ------------------------------------------------------------------ */
const CHAIN_ID = "popp-1";
const CHAIN_NAME = "PoPP Protocol";
const RPC_ENDPOINT = "https://rpc.thharko.com";
const REST_ENDPOINT = "https://api.thharko.com";

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    name: null,
    balance: null,
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("popp-wallet");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.address) {
          setState({
            connected: true,
            address: parsed.address,
            name: parsed.name || null,
            balance: null,
            token: parsed.token || null,
            user: parsed.user || null,
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check for Keplr
      if (!window.keplr) {
        throw new Error("Keplr wallet not found. Please install the Keplr browser extension.");
      }

      // Suggest chain (registers PoPP chain in Keplr if not already added)
      if (typeof window.keplr.experimentalSuggestChain === "function") {
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: CHAIN_ID,
            chainName: CHAIN_NAME,
            rpc: RPC_ENDPOINT,
            rest: REST_ENDPOINT,
            bip44: { coinType: 118 },
            bech32Config: {
              bech32PrefixAccAddr: "popp",
              bech32PrefixAccPub: "popppub",
              bech32PrefixValAddr: "poppvaloper",
              bech32PrefixValPub: "poppvaloperpub",
              bech32PrefixConsAddr: "poppvalcons",
              bech32PrefixConsPub: "poppvalconspub",
            },
            currencies: [
              {
                coinDenom: "POPPT",
                coinMinimalDenom: "upoppt",
                coinDecimals: 6,
              },
            ],
            feeCurrencies: [
              {
                coinDenom: "POPPT",
                coinMinimalDenom: "upoppt",
                coinDecimals: 6,
              },
            ],
            stakeCurrency: {
              coinDenom: "POPPT",
              coinMinimalDenom: "upoppt",
              coinDecimals: 6,
            },
            gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
            features: ["stargate", "ibc-transfer"],
          });
        } catch (suggestErr) {
          // Chain may already be registered — not fatal, continue
          console.warn("Chain suggestion failed (may already exist):", suggestErr);
        }
      }

      // Enable chain
      await window.keplr.enable(CHAIN_ID);

      // Get offline signer and address
      const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();

      if (!accounts.length) {
        throw new Error("No accounts found in Keplr wallet.");
      }

      const address = accounts[0].address;
      const name = window.keplr.key?.name || null;

      // Fetch balance
      let balance: string | null = null;
      try {
        const res = await fetch(
          `${REST_ENDPOINT}/cosmos/bank/v1beta1/balances/${address}`
        );
        if (res.ok) {
          const data = await res.json();
          const poppt = data.balances?.find(
            (b: any) => b.denom === "upoppt" || b.denom === "POPPT"
          );
          if (poppt) {
            balance = (parseInt(poppt.amount) / 1e6).toFixed(2);
          }
        }
      } catch {
        // balance fetch failed, not critical
      }

      const newState: WalletState = { connected: true, address, name, balance, token: null, user: null };
      setState(newState);
      localStorage.setItem("popp-wallet", JSON.stringify({ address, name }));

      // ── Authenticate with backend ──
      try {
        const authRes = await fetch(`${BACKEND_URL}/api/auth/wallet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet_address: address, display_name: name || undefined, create_if_missing: true }),
        });
        if (authRes.ok) {
          const authData = await authRes.json();
          const token = authData.token as string;
          const user = authData.user as UserProfile;
          setState(prev => ({ ...prev, token, user }));
          localStorage.setItem("popp-wallet", JSON.stringify({ address, name, token, user }));
        }
      } catch (authErr) {
        console.warn("Backend auth failed (wallet still connected):", authErr);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
      setState({ connected: false, address: null, name: null, balance: null, token: null, user: null });
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({ connected: false, address: null, name: null, balance: null, token: null, user: null });
    setError(null);
    localStorage.removeItem("popp-wallet");
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    if (state.token) return { Authorization: `Bearer ${state.token}` };
    return {};
  }, [state.token]);

  const refreshProfile = useCallback(async () => {
    if (!state.token) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      if (res.ok) {
        const user = await res.json();
        setState(prev => {
          localStorage.setItem("popp-wallet", JSON.stringify({
            address: prev.address, name: prev.name, token: prev.token, user,
          }));
          return { ...prev, user };
        });
      }
    } catch { /* non-critical */ }
  }, [state.token, state.address, state.name]);

  return (
    <WalletContext.Provider
      value={{ ...state, connect, disconnect, loading, error, getAuthHeaders, refreshProfile }}
    >
      {children}
    </WalletContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Keplr window type                                                  */
/* ------------------------------------------------------------------ */
declare global {
  interface Window {
    keplr?: any;
  }
}
