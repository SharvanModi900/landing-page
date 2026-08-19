"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X, Copy, Check, Wallet, Loader2, ArrowLeft, Download, Upload,
  Shield, Eye, Trash2, AlertTriangle, Send, ArrowDownLeft,
  RefreshCw, Settings, ChevronRight, Clock, Coins,
  ArrowRightLeft, Plus, Globe, LogOut, Key
} from "lucide-react";
import { useWallet } from "@/lib/wallet";

type Screen = "main" | "backup" | "import" | "home" | "delete-confirm" | "settings" | "receive";

export default function WalletDropdown({ onClose }: { onClose: () => void }) {
  const {
    connected, address, name, balance, hasWallet,
    createWallet, importWallet, connect, disconnect, disconnectAndDelete,
    loading, error,
  } = useWallet();

  const [screen, setScreen] = useState<Screen>(connected ? "home" : "main");
  const [mnemonic, setMnemonic] = useState("");
  const [importWords, setImportWords] = useState<string[]>(Array(24).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [backupConfirmed, setBackupConfirmed] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [importError, setImportError] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const clipboardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid catching the click that opened the dropdown
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => { clearTimeout(timer); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Clear mnemonic from state after 2 minutes on backup screen
  useEffect(() => {
    if (screen === "backup" && mnemonic) {
      const timer = setTimeout(() => { setMnemonic(""); setShowMnemonic(false); }, 120_000);
      return () => clearTimeout(timer);
    }
  }, [screen, mnemonic]);

  useEffect(() => {
    return () => { if (clipboardTimerRef.current) clearTimeout(clipboardTimerRef.current); };
  }, []);

  const shortAddr = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : null;

  const clearClipboard = (text: string, delayMs: number = 30_000) => {
    if (clipboardTimerRef.current) clearTimeout(clipboardTimerRef.current);
    clipboardTimerRef.current = setTimeout(() => {
      navigator.clipboard.readText().then(clip => { if (clip === text) navigator.clipboard.writeText(""); }).catch(() => {});
    }, delayMs);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedField(field);
    setTimeout(() => { setCopied(false); setCopiedField(""); }, 2000);
  };

  const handleCreate = async () => {
    setCreating(true);
    try { const w = await createWallet(); setMnemonic(w.mnemonic); setScreen("backup"); }
    catch { /* handled in context */ }
    finally { setCreating(false); }
  };

  const handleConfirmBackup = async () => {
    await connect();
    setMnemonic(""); setShowMnemonic(false);
    setScreen("home");
  };

  const handleImport = async () => {
    setImportError("");
    const words = importWords.filter(w => w.trim());
    if (words.length !== 12 && words.length !== 24) {
      setImportError(`Please enter all ${words.length < 15 ? 12 : 24} words`);
      return;
    }
    try { await importWallet(words.join(" ")); await connect(); setImportWords(Array(24).fill("")); setScreen("home"); }
    catch (err: any) { setImportError(err.message || "Failed to import"); }
  };

  const handleWordChange = (index: number, value: string) => {
    setImportError("");
    const clean = value.trim().toLowerCase().replace(/[^a-z]/g, "");
    const next = [...importWords];
    if (value.includes(" ")) {
      const parts = value.split(/\s+/).filter(Boolean);
      parts.forEach((w, i) => { if (index + i < 24) next[index + i] = w.toLowerCase().replace(/[^a-z]/g, ""); });
      setImportWords(next);
      inputRefs.current[Math.min(index + parts.length, 23)]?.focus();
    } else {
      next[index] = clean;
      setImportWords(next);
      if (value.endsWith(" ") && clean && index < 23) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleWordKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === " " && importWords[index]) { e.preventDefault(); if (index < 23) inputRefs.current[index + 1]?.focus(); }
    if (e.key === "Backspace" && !importWords[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const copyAddress = () => { if (address) copyToClipboard(address, "address"); };
  const copyMnemonic = () => { if (mnemonic) { copyToClipboard(mnemonic, "mnemonic"); clearClipboard(mnemonic); } };
  const handleDeleteWallet = async () => { await disconnectAndDelete(); onClose(); };
  const filledWords = importWords.filter(w => w.trim()).length;

  // Sub-screens that take over the dropdown
  const isSubScreen = ["backup", "import", "settings", "receive", "delete-confirm"].includes(screen);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-1rem)] bg-[#13141a] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      style={{ maxHeight: "calc(100vh - 5rem)" }}
    >
      <div className="flex flex-col" style={{ maxHeight: "calc(100vh - 5rem)" }}>

        {/* ═══════════════════════════════════════════════════════════
            WELCOME SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "main" && (
          <div className="flex flex-col">
            {/* Gradient hero */}
            <div className="relative px-6 pt-8 pb-6 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 via-purple-600/10 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white mb-1.5">PoPP Wallet</h1>
                <p className="text-xs text-gray-400 max-w-[240px] mx-auto leading-relaxed">
                  Your gateway to the PoPP ecosystem. Create or import your wallet to get started.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 space-y-2.5">
              {error && (
                <div className="px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">{error}</div>
              )}
              <button
                onClick={handleCreate}
                disabled={creating}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white text-sm disabled:opacity-60 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] transition-all"
              >
                {creating ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Download className="w-4 h-4" /> Create New Wallet</>}
              </button>
              <button
                onClick={() => { setImportWords(Array(24).fill("")); setImportError(""); setScreen("import"); }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl font-semibold text-gray-300 text-sm hover:bg-white/[0.1] active:scale-[0.98] transition-all"
              >
                <Upload className="w-4 h-4" /> Import Existing Wallet
              </button>
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] text-gray-600">
                <Shield className="w-3 h-3" /> AES-256 encrypted · Non-custodial · Stored locally
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            HOME SCREEN (compact wallet dashboard)
            ═══════════════════════════════════════════════════════════ */}
        {screen === "home" && (
          <div className="flex flex-col overflow-y-auto">
            {/* Gradient header */}
            <div className="relative px-5 pt-4 pb-6 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-cyan-600/10" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.06] rounded-full transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center text-[8px] text-white font-bold">
                      {name?.[0]?.toUpperCase() || address?.[4]?.toUpperCase() || "?"}
                    </div>
                    <span className="text-xs text-gray-300 font-medium">{name || shortAddr}</span>
                    {copied && copiedField === "address"
                      ? <Check className="w-3 h-3 text-emerald-400" />
                      : <Copy className="w-3 h-3 text-gray-500" />
                    }
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={() => connect()} className="p-1.5 hover:bg-white/[0.08] rounded-lg transition-colors" title="Refresh">
                      <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button onClick={() => setScreen("settings")} className="p-1.5 hover:bg-white/[0.08] rounded-lg transition-colors">
                      <Settings className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Balance */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-white tracking-tight mb-0.5">
                    {balance !== null ? `${balance}` : "—"}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Sat Mudra</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-5 -mt-3 mb-4 flex-shrink-0">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: <Send className="w-3.5 h-3.5" />, label: "Send", disabled: true },
                  { icon: <ArrowDownLeft className="w-3.5 h-3.5" />, label: "Receive", action: () => setScreen("receive") },
                  { icon: <ArrowRightLeft className="w-3.5 h-3.5" />, label: "Swap", disabled: true },
                  { icon: <Plus className="w-3.5 h-3.5" />, label: "Buy", disabled: true },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action}
                    disabled={btn.disabled}
                    className="flex flex-col items-center gap-1 disabled:opacity-40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-300 hover:bg-white/[0.1] active:scale-95 transition-all">
                      {btn.icon}
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-4 space-y-3">
              {/* Token */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tokens</span>
                  <span className="text-[9px] text-gray-600">PoPP Chain</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2.5 px-3 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Coins className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white">Sat Mudra</div>
                      <div className="text-[10px] text-gray-500">satmudtra</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-white">{balance !== null ? balance : "—"}</div>
                      <div className="text-[10px] text-gray-500">satmudtra</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div>
                <div className="flex items-center justify-between px-2 mb-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Activity</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2.5 px-3 py-4 justify-center">
                    <Clock className="w-3.5 h-3.5 text-gray-600" />
                    <span className="text-[11px] text-gray-500">No recent activity</span>
                  </div>
                </div>
              </div>

              {/* Explorer link */}
              <a
                href={`/explorer`}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[11px] text-gray-400 flex-1">Problem Explorer</span>
                <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </a>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            RECEIVE SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "receive" && (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
              <button onClick={() => setScreen("home")} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-bold text-white">Receive</h2>
              <div className="w-7" />
            </div>
            <div className="px-5 py-6 flex flex-col items-center gap-4 overflow-y-auto">
              <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center p-3">
                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNDAiIHk9IjEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI3MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI3MCIgeT0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSI3MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNDAiIHk9IjcwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI3MCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] bg-center bg-contain rounded-lg" />
              </div>
              <div className="text-center w-full">
                <p className="text-xs text-gray-400 mb-2">Your wallet address</p>
                <div className="px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl">
                  <p className="text-[11px] text-gray-300 font-mono break-all leading-relaxed">{address}</p>
                </div>
              </div>
              <button
                onClick={copyAddress}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white text-sm hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] transition-all"
              >
                {copied && copiedField === "address" ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Address</>}
              </button>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            SETTINGS SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "settings" && (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
              <button onClick={() => setScreen("home")} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-bold text-white">Settings</h2>
              <div className="w-7" />
            </div>
            <div className="px-4 py-3 space-y-1 overflow-y-auto">
              {/* Account */}
              <div className="px-1.5 mb-1.5">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Account</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden mb-3">
                <div className="flex items-center gap-2.5 px-3 py-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {name?.[0]?.toUpperCase() || address?.[4]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white">{name || "Wallet"}</div>
                    <div className="text-[10px] text-gray-500 font-mono truncate">{shortAddr}</div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="px-1.5 mb-1.5">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Security</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden mb-3">
                <button onClick={copyAddress} className="flex items-center gap-2.5 px-3 py-3 w-full hover:bg-white/[0.03] transition-colors">
                  <Key className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-300 flex-1 text-left">Copy Address</span>
                  {copied && copiedField === "address"
                    ? <Check className="w-3 h-3 text-emerald-400" />
                    : <ChevronRight className="w-3 h-3 text-gray-600" />
                  }
                </button>
                <div className="h-px bg-white/[0.04] mx-3" />
                <div className="flex items-center gap-2.5 px-3 py-2.5">
                  <Shield className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-300 flex-1">Encryption</span>
                  <span className="text-[10px] text-emerald-400 font-medium">AES-256-GCM</span>
                </div>
              </div>

              {/* Danger zone */}
              <div className="px-1.5 mb-1.5">
                <span className="text-[9px] font-semibold text-red-400/60 uppercase tracking-wider">Danger Zone</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <button
                  onClick={() => { disconnect(); setScreen("main"); }}
                  className="flex items-center gap-2.5 px-3 py-3 w-full hover:bg-white/[0.03] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-300 flex-1 text-left">Disconnect Session</span>
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                </button>
                <div className="h-px bg-white/[0.04] mx-3" />
                <button
                  onClick={() => { setDeleteConfirmText(""); setScreen("delete-confirm"); }}
                  className="flex items-center gap-2.5 px-3 py-3 w-full hover:bg-red-500/[0.04] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400/60" />
                  <span className="text-xs text-red-400 flex-1 text-left">Delete Wallet</span>
                  <ChevronRight className="w-3 h-3 text-red-400/40" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            BACKUP SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "backup" && (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
              <div className="w-7" />
              <h2 className="text-sm font-bold text-white">Recovery Phrase</h2>
              <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-4 space-y-3 overflow-y-auto">
              <div className="flex items-start gap-2 p-3 bg-amber-500/[0.06] border border-amber-500/10 rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-300/80 leading-relaxed">
                  Write down these 24 words in order and store them safely. This is the <strong className="text-amber-300">only way</strong> to recover your wallet. Never share your recovery phrase.
                </p>
              </div>

              {mnemonic ? (
                <>
                  <div className="relative">
                    <div className={`grid grid-cols-3 gap-1 ${!showMnemonic ? "blur-lg select-none" : ""}`}>
                      {mnemonic.split(" ").map((word, i) => (
                        <div key={i} className="flex items-center gap-1 px-2 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">
                          <span className="text-[8px] text-gray-600 w-3.5 text-right font-mono">{i + 1}</span>
                          <span className="text-[11px] text-white/90 font-mono">{word}</span>
                        </div>
                      ))}
                    </div>
                    {!showMnemonic && (
                      <button
                        onClick={() => setShowMnemonic(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl backdrop-blur-[2px]"
                      >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.08] border border-white/[0.12] rounded-lg text-xs text-white hover:bg-white/[0.12] transition-colors">
                          <Eye className="w-3.5 h-3.5" /> Tap to reveal
                        </div>
                      </button>
                    )}
                  </div>

                  <button onClick={copyMnemonic} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[11px] text-gray-400 hover:bg-white/[0.06] transition">
                    {copied && copiedField === "mnemonic" ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy to Clipboard</>}
                  </button>
                  <p className="text-[9px] text-gray-600 text-center">Clipboard auto-clears after 30 seconds</p>
                </>
              ) : (
                <div className="text-center py-4 text-xs text-gray-500">
                  Recovery phrase cleared from memory for security.
                </div>
              )}

              <label className="flex items-start gap-2 cursor-pointer group">
                <input type="checkbox" checked={backupConfirmed} onChange={(e) => setBackupConfirmed(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/50" />
                <span className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  I have safely stored my recovery phrase. I understand that losing it means permanent loss of funds.
                </span>
              </label>

              <button
                onClick={handleConfirmBackup}
                disabled={!backupConfirmed || !mnemonic}
                className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] transition-all"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            IMPORT SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "import" && (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
              <button onClick={() => setScreen("main")} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-bold text-white">Import Wallet</h2>
              <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-4 space-y-3 overflow-y-auto">
              <p className="text-xs text-gray-400 leading-relaxed">
                Enter your 12 or 24-word recovery phrase to restore your wallet.
              </p>

              {/* Word counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-1 rounded-full transition-all duration-300 ${filledWords >= 24 ? "w-14 bg-emerald-500" : filledWords >= 12 ? "w-10 bg-violet-500" : "w-7 bg-violet-500/40"}`} />
                  <span className="text-[10px] text-gray-500 font-medium">{filledWords} / 24</span>
                </div>
                <button
                  onClick={() => { setImportWords(Array(24).fill("")); setImportError(""); inputRefs.current[0]?.focus(); }}
                  className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors px-2 py-0.5 rounded hover:bg-white/[0.04]"
                >Clear</button>
              </div>

              {/* 24 word grid */}
              <div className="grid grid-cols-3 gap-1">
                {importWords.map((word, i) => (
                  <div key={i} className={`flex items-center gap-1 px-1.5 py-1 rounded-lg border transition-all duration-150 ${word ? "bg-violet-500/[0.06] border-violet-500/20" : "bg-white/[0.03] border-white/[0.06]"} focus-within:border-violet-500/40 focus-within:ring-1 focus-within:ring-violet-500/20`}>
                    <span className="text-[8px] text-gray-600 w-3 flex-shrink-0 text-right font-mono">{i + 1}</span>
                    <input
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text"
                      value={word}
                      onChange={e => handleWordChange(i, e.target.value)}
                      onKeyDown={e => handleWordKeyDown(i, e)}
                      placeholder="..."
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      tabIndex={0}
                      className="w-full bg-transparent text-[11px] text-white font-mono outline-none placeholder:text-gray-700 min-w-0"
                    />
                  </div>
                ))}
              </div>

              {importError && (
                <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[11px] text-red-400">{importError}</div>
              )}
              {error && (
                <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[11px] text-red-400">{error}</div>
              )}

              <button
                onClick={handleImport}
                disabled={loading || filledWords < 12}
                className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] transition-all"
              >
                {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1.5" /> Importing...</> : "Import Wallet"}
              </button>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            DELETE CONFIRM SCREEN
            ═══════════════════════════════════════════════════════════ */}
        {screen === "delete-confirm" && (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
              <button onClick={() => setScreen("settings")} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-bold text-red-400">Delete Wallet</h2>
              <div className="w-7" />
            </div>
            <div className="px-4 py-4 space-y-3 overflow-y-auto">
              <div className="flex items-start gap-2 p-3 bg-red-500/[0.06] border border-red-500/10 rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-300/80 leading-relaxed">
                  This will <strong className="text-red-300">permanently delete</strong> your wallet and all local data. This action <strong className="text-red-300">cannot be undone</strong>. You can only recover with your 24-word recovery phrase.
                </p>
              </div>
              <p className="text-xs text-gray-400">
                Type <strong className="text-white font-semibold">DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-gray-600 focus:ring-1 focus:ring-red-500/40 focus:border-red-500/40 outline-none transition"
                autoFocus
              />
              <button
                onClick={handleDeleteWallet}
                disabled={deleteConfirmText !== "DELETE"}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-white text-sm disabled:opacity-20 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
              >
                Permanently Delete Wallet
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
