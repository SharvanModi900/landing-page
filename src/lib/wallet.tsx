"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { poppWallet } from "./poppWallet";

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
  hasWallet: boolean;
}

interface WalletContextType extends WalletState {
  /** Create a new wallet (generates 24-word phrase) */
  createWallet: () => Promise<{ address: string; mnemonic: string }>;
  /** Import wallet from recovery phrase */
  importWallet: (mnemonic: string) => Promise<string>;
  /** Connect to backend after wallet is ready */
  connect: () => Promise<void>;
  /** Disconnect and clear session */
  disconnect: () => void;
  /** Disconnect AND delete wallet data permanently */
  disconnectAndDelete: () => Promise<void>;
  loading: boolean;
  error: string | null;
  getAuthHeaders: () => Record<string, string>;
  refreshProfile: () => Promise<void>;
  fetchBalance: () => Promise<void>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://popp.thharko.com";
const REST_ENDPOINT = "https://chain.thharko.com";

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
  hasWallet: false,
  createWallet: async () => ({ address: "", mnemonic: "" }),
  importWallet: async () => "",
  connect: async () => {},
  disconnect: () => {},
  disconnectAndDelete: async () => {},
  loading: false,
  error: null,
  getAuthHeaders: () => ({}),
  refreshProfile: async () => {},
  fetchBalance: async () => {},
});

export const useWallet = () => useContext(WalletContext);

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
    hasWallet: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-restore session on mount
  useEffect(() => {
    // Always derive address from encrypted storage (source of truth)
    // instead of trusting the session cache which may be stale
    const derivedAddress = poppWallet.getAddress();
    const saved = localStorage.getItem("popp-wallet");

    if (derivedAddress) {
      // Merge any saved session data (name, token, user) with the derived address
      let name: string | null = null, token: string | null = null, user: UserProfile | null = null, balance: string | null = null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          name = parsed.name || null;
          token = parsed.token || null;
          user = parsed.user || null;
          // Use backend's satmudra_balance from saved user profile
          if (user?.satmudra_balance != null) {
            balance = user.satmudra_balance.toFixed(2);
          }
        } catch {}
      }
      setState({
        connected: true,
        address: derivedAddress,
        name,
        balance,
        token,
        user,
        hasWallet: true,
      });
      // Keep the session cache in sync with the derived address
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.address !== derivedAddress) {
            localStorage.setItem("popp-wallet", JSON.stringify({ ...parsed, address: derivedAddress }));
          }
        } catch {}
      }
      if (token) {
        fetchBalanceForAddress(derivedAddress);
      } else {
        authenticateWithBackend(derivedAddress);
      }
    } else if (saved) {
      // No encrypted wallet but old session exists — clean up
      localStorage.removeItem("popp-wallet");
    }
  }, []);

  const fetchBalanceForAddress = async (address: string) => {
    try {
      const res = await fetch(`${REST_ENDPOINT}/cosmos/bank/v1beta1/balances/${address}`);
      if (res.ok) {
        const data = await res.json();
        const found = data.balances?.find((b: any) => b.denom === "satmudtra");
        if (found) {
          const bal = (parseInt(found.amount) / 1e6).toFixed(2);
          setState(prev => ({ ...prev, balance: bal }));
        }
      }
    } catch { /* non-critical */ }
  };

  const authenticateWithBackend = async (address: string) => {
    try {
      const authRes = await fetch(`${BACKEND_URL}/api/auth/wallet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address, create_if_missing: true }),
      });
      if (authRes.ok) {
        const authData = await authRes.json();
        const token = authData.token as string;
        const user = authData.user as UserProfile;
        setState(prev => {
          // Use backend's satmudra_balance as primary balance source
          const bal = user?.satmudra_balance != null ? user.satmudra_balance.toFixed(2) : prev.balance;
          const next = { ...prev, token, user, name: user?.display_name || prev.name, balance: bal };
          localStorage.setItem("popp-wallet", JSON.stringify({ address: prev.address, name: next.name, token, user }));
          return next;
        });
        // Also try chain REST API for real-time on-chain balance
        fetchBalanceForAddress(address);
      }
    } catch (authErr) {
      console.warn("Backend auth failed (wallet still connected):", authErr);
    }
  };

  const createWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await poppWallet.createWallet();
      setState(prev => ({ ...prev, address: wallet.address, connected: true, hasWallet: true }));
      return wallet;
    } catch (err: any) {
      setError(err.message || "Failed to create wallet");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const importWallet = useCallback(async (mnemonic: string) => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await poppWallet.importWallet(mnemonic);
      setState(prev => ({ ...prev, address: wallet.address, connected: true, hasWallet: true }));
      return wallet.address;
    } catch (err: any) {
      setError(err.message || "Failed to import wallet");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!poppWallet.hasWallet()) {
      window.dispatchEvent(new CustomEvent("popp-wallet-open-modal"));
      return;
    }
    const address = poppWallet.getAddress();
    if (!address) {
      window.dispatchEvent(new CustomEvent("popp-wallet-open-modal"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setState(prev => ({ ...prev, address, connected: true }));
      // Sync session cache with the derived address immediately
      const saved = localStorage.getItem("popp-wallet");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.address !== address) {
            // Address changed (new import) — clear stale session data
            localStorage.setItem("popp-wallet", JSON.stringify({ address }));
          }
        } catch {}
      }
      await authenticateWithBackend(address);
      await fetchBalanceForAddress(address);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({ connected: false, address: null, name: null, balance: null, token: null, user: null, hasWallet: poppWallet.hasWallet() });
    setError(null);
    localStorage.removeItem("popp-wallet");
  }, []);

  const disconnectAndDelete = useCallback(async () => {
    await poppWallet.deleteWallet();
    setState({ connected: false, address: null, name: null, balance: null, token: null, user: null, hasWallet: false });
    setError(null);
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

  const fetchBalance = useCallback(async () => {
    if (state.address) await fetchBalanceForAddress(state.address);
  }, [state.address]);

  return (
    <WalletContext.Provider
      value={{ ...state, createWallet, importWallet, connect, disconnect, disconnectAndDelete, loading, error, getAuthHeaders, refreshProfile, fetchBalance }}
    >
      {children}
    </WalletContext.Provider>
  );
}
