"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Wallet, Coins, ArrowUpRight, ArrowDownLeft, Lock, Flame, TrendingUp, Clock, Copy, Check, ArrowRightLeft } from "lucide-react";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description?: string;
  created_at: string;
}

interface WalletBalance {
  satmudra_balance: number;
  staked_amount: number;
}

interface Earning {
  id: string;
  reward_type: string;
  amount: number;
  description?: string;
  created_at: string;
}

export default function WalletPage() {
  const { connected, connect, getAuthHeaders, address, user } = useWallet();
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [copied, setCopied] = useState(false);
  const [burnAmount, setBurnAmount] = useState("");
  const [supplyInfo, setSupplyInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "stake" | "transactions" | "earnings" | "burn" | "supply">("overview");

  const fetchData = useCallback(async () => {
    if (!connected) return;
    setLoading(true);
    try {
      const [balRes, txRes, earnRes, supplyRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/wallet/balance`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : null),
        fetch(`${BACKEND_API}/api/wallet/transactions`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/wallet/earnings`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/wallet/supply`).then(r => r.ok ? r.json() : null),
      ]);
      if (balRes.status === "fulfilled" && balRes.value) setBalance(balRes.value);
      if (txRes.status === "fulfilled" && Array.isArray(txRes.value)) setTransactions(txRes.value.slice(0, 30));
      if (earnRes.status === "fulfilled" && Array.isArray(earnRes.value)) setEarnings(earnRes.value.slice(0, 30));
      if (supplyRes.status === "fulfilled" && supplyRes.value) setSupplyInfo(supplyRes.value);
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    setActionLoading("stake"); setActionMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/wallet/stake`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ amount: parseFloat(stakeAmount) }),
      });
      if (res.ok) { setActionMsg({ text: "Staked successfully!", ok: true }); setStakeAmount(""); fetchData(); }
      else { const err = await res.text(); setActionMsg({ text: err || "Stake failed", ok: false }); }
    } catch (e: any) { setActionMsg({ text: e.message || "Failed", ok: false }); }
    finally { setActionLoading(null); }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    setActionLoading("withdraw"); setActionMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/wallet/withdraw`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ amount: parseFloat(withdrawAmount) }),
      });
      if (res.ok) { setActionMsg({ text: "Withdrawn successfully!", ok: true }); setWithdrawAmount(""); fetchData(); }
      else { const err = await res.text(); setActionMsg({ text: err || "Withdraw failed", ok: false }); }
    } catch (e: any) { setActionMsg({ text: e.message || "Failed", ok: false }); }
    finally { setActionLoading(null); }
  };

  const handleBurn = async () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) return;
    setActionLoading("burn"); setActionMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/wallet/burn`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ amount: parseFloat(burnAmount) }),
      });
      if (res.ok) { setActionMsg({ text: "Tokens burned successfully!", ok: true }); setBurnAmount(""); fetchData(); }
      else { const err = await res.text(); setActionMsg({ text: err || "Burn failed", ok: false }); }
    } catch (e: any) { setActionMsg({ text: e.message || "Failed", ok: false }); }
    finally { setActionLoading(null); }
  };

  const copyAddr = () => { if (address) { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 ring-1 ring-emerald-500/30">
              <Wallet className="h-4 w-4 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold">Wallet</h1>
          </div>
          {address && (
            <button onClick={copyAddr} className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-400 hover:text-white transition">
              {address.slice(0, 6)}...{address.slice(-4)} {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
            </button>
          )}
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <Wallet className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">Connect to manage your Sat Mudra tokens.</p>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : (
          <>
            {/* Balance Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Coins size={12} className="text-emerald-400" /><span className="text-[10px] text-gray-400">Sat Mudra</span></div>
                <div className="text-lg font-bold">{loading ? "—" : (balance?.satmudra_balance ?? user?.satmudra_balance ?? 0).toLocaleString()}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Lock size={12} className="text-purple-400" /><span className="text-[10px] text-gray-400">Staked</span></div>
                <div className="text-lg font-bold">{loading ? "—" : (balance?.staked_amount ?? user?.staked_amount ?? 0).toLocaleString()}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-yellow-400" /><span className="text-[10px] text-gray-400">R-Score</span></div>
                <div className="text-lg font-bold">{user?.r_score ?? 0}</div>
              </motion.div>
            </div>

            {/* Action Message */}
            {actionMsg && (
              <div className={`mb-4 p-2 rounded-lg text-xs font-semibold ${actionMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{actionMsg.text}</div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["overview", "stake", "transactions", "earnings", "burn", "supply"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-emerald-500 to-cyan-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><ArrowRightLeft size={14} className="text-cyan-400" /> Quick Actions</h3>
                  <div className="space-y-2">
                    <button onClick={() => setActiveTab("stake")} className="w-full px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/20 rounded-lg text-xs font-semibold text-emerald-400 transition flex items-center justify-center gap-1.5">
                      <Lock size={12} /> Stake Tokens
                    </button>
                    <button onClick={() => setActiveTab("transactions")} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 hover:bg-white/10 transition flex items-center justify-center gap-1.5">
                      <ArrowDownLeft size={12} /> View Transactions
                    </button>
                    <button onClick={() => setActiveTab("earnings")} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 hover:bg-white/10 transition flex items-center justify-center gap-1.5">
                      <TrendingUp size={12} /> View Earnings
                    </button>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Coins size={14} className="text-yellow-400" /> Profile Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-gray-500">Tickets Submitted</span><span className="font-semibold">{user?.tickets_submitted ?? 0}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-500">Tickets Resolved</span><span className="font-semibold text-emerald-400">{user?.tickets_resolved ?? 0}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-500">Validations Done</span><span className="font-semibold">{user?.validations_done ?? 0}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-500">Validator Level</span><span className="font-semibold">{user?.validator_level ?? 0}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Stake Tab */}
            {activeTab === "stake" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Lock size={14} className="text-emerald-400" /> Stake Tokens</h3>
                  <input type="number" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} placeholder="Amount to stake"
                    className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
                  <button onClick={handleStake} disabled={actionLoading !== null || !stakeAmount}
                    className="w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {actionLoading === "stake" ? "Staking..." : "Stake"}
                  </button>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><ArrowUpRight size={14} className="text-orange-400" /> Withdraw Tokens</h3>
                  <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Amount to withdraw"
                    className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
                  <button onClick={handleWithdraw} disabled={actionLoading !== null || !withdrawAmount}
                    className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {actionLoading === "withdraw" ? "Withdrawing..." : "Withdraw"}
                  </button>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === "transactions" && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><ArrowDownLeft size={14} className="text-cyan-400" /> Transaction History</h3>
                {transactions.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">No transactions yet</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.type === "stake" ? "bg-purple-500/20" : tx.type === "withdraw" ? "bg-orange-500/20" : "bg-emerald-500/20"}`}>
                          {tx.type === "stake" ? <Lock size={10} className="text-purple-400" /> : tx.type === "withdraw" ? <ArrowUpRight size={10} className="text-orange-400" /> : <ArrowDownLeft size={10} className="text-emerald-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold capitalize">{tx.type}</div>
                          <div className="text-[10px] text-gray-500">{tx.description || ""}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs font-bold ${tx.type === "withdraw" ? "text-orange-400" : "text-emerald-400"}`}>{tx.type === "withdraw" ? "-" : "+"}{tx.amount?.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Burn Tab */}
            {activeTab === "burn" && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Flame size={14} className="text-orange-400" /> Burn Tokens</h3>
                <p className="text-xs text-gray-400 mb-3">Permanently destroy tokens to reduce circulating supply. This action is irreversible.</p>
                <input type="number" value={burnAmount} onChange={e => setBurnAmount(e.target.value)} placeholder="Amount to burn"
                  className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
                <button onClick={handleBurn} disabled={actionLoading !== null || !burnAmount}
                  className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                  {actionLoading === "burn" ? "Burning..." : "Burn Tokens"}
                </button>
              </div>
            )}

            {/* Supply Tab */}
            {activeTab === "supply" && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Coins size={14} className="text-cyan-400" /> Token Supply Info</h3>
                {supplyInfo ? (
                  <div className="grid grid-cols-2 gap-3">
                    {supplyInfo.total_supply != null && (
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Total Supply</div>
                        <div className="text-base font-bold">{Number(supplyInfo.total_supply).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )}
                    {supplyInfo.circulating_supply != null && (
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Circulating</div>
                        <div className="text-base font-bold">{Number(supplyInfo.circulating_supply).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )}
                    {supplyInfo.total_burned != null && (
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Total Burned</div>
                        <div className="text-base font-bold text-orange-400">{Number(supplyInfo.total_burned).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )}
                    {supplyInfo.total_staked != null && (
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Total Staked</div>
                        <div className="text-base font-bold text-purple-400">{Number(supplyInfo.total_staked).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center py-6">Supply info not available</p>
                )}
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === "earnings" && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><TrendingUp size={14} className="text-yellow-400" /> Earnings History</h3>
                {earnings.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">No earnings yet</p>
                ) : (
                  <div className="space-y-2">
                    {earnings.map(e => (
                      <div key={e.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500/20">
                          <Coins size={10} className="text-yellow-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold capitalize">{e.reward_type?.replace(/_/g, " ")}</div>
                          <div className="text-[10px] text-gray-500">{e.description || ""}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-emerald-400">+{e.amount?.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-500">{new Date(e.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
