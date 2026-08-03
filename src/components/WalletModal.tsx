"use client";
import React from "react";
import { X, Copy, ExternalLink, LogOut, Wallet, Loader2 } from "lucide-react";
import { useWallet } from "@/lib/wallet";

export default function WalletModal({ onClose }: { onClose: () => void }) {
  const { connected, address, name, balance, connect, disconnect, loading, error } =
    useWallet();

  const shortAddr = address
    ? `${address.slice(0, 10)}...${address.slice(-6)}`
    : null;

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Wallet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {!connected ? (
            /* ─── Not Connected ─── */
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Connect Your Wallet
                </h3>
                <p className="text-sm text-gray-400">
                  Connect your Keplr wallet to submit problems, validate, and
                  participate in governance.
                </p>
              </div>

              {error && (
                <div className="w-full px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={connect}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white disabled:opacity-60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <img
                      src="https://raw.githubusercontent.com/chainapsis/keplr-wallet/master/packages/extension/src/assets/icon-128.png"
                      alt="Keplr"
                      className="w-5 h-5 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    Connect Keplr
                  </>
                )}
              </button>

              <a
                href="https://www.keplr.app/download"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
              >
                Don&apos;t have Keplr?
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            /* ─── Connected ─── */
            <div className="flex flex-col gap-5">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {name?.[0]?.toUpperCase() || address?.[4]?.toUpperCase() || "?"}
                </div>
                <div>
                  {name && (
                    <div className="text-white font-semibold">{name}</div>
                  )}
                  <div className="text-sm text-gray-400 font-mono">
                    {shortAddr}
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Balance
                </div>
                <div className="text-2xl font-bold text-white">
                  {balance !== null ? `${balance} POPPT` : "—"}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyAddress}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <a
                  href={`https://www.mintscan.io/cosmos/account/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Explorer
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Disconnect */}
              <button
                onClick={disconnect}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
