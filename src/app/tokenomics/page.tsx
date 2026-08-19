'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Coins, Flame, BarChart3, Award, PieChart, RefreshCw } from 'lucide-react';
import { useWallet } from '@/lib/wallet';

const BACKEND_API = 'https://popp.thharko.com';

export default function TokenomicsPage() {
  const { connected, getAuthHeaders } = useWallet();
  const [dashData, setDashData] = useState<any>(null);
  const [qualityData, setQualityData] = useState<any>(null);
  const [emissionData, setEmissionData] = useState<any>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [recycleAmount, setRecycleAmount] = useState('');
  const [recycleOrg, setRecycleOrg] = useState('');
  const [recycleLoading, setRecycleLoading] = useState(false);
  const [recycleMsg, setRecycleMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [chainStatus, setChainStatus] = useState<any>(null);
  const [chainBalance, setChainBalance] = useState<any>(null);
  const [chainLoading, setChainLoading] = useState(false);

  const fetchLiveData = useCallback(async () => {
    setLiveLoading(true);
    try {
      const [dashRes, emissionRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/tokenomics/dashboard`),
        fetch(`${BACKEND_API}/api/tokenomics/emissions`),
      ]);
      if (dashRes.status === 'fulfilled' && dashRes.value.ok) {
        const d = await dashRes.value.json();
        setDashData(d);
      }
      if (emissionRes.status === 'fulfilled' && emissionRes.value.ok) {
        const e = await emissionRes.value.json();
        setEmissionData(e);
      }
      if (connected) {
        try {
          const qRes = await fetch(`${BACKEND_API}/api/tokenomics/my-quality`, { headers: getAuthHeaders() });
          if (qRes.ok) {
            const q = await qRes.json();
            setQualityData(q);
          }
        } catch { /* ignore */ }
      }
    } catch { /* ignore */ }
    setLiveLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchLiveData(); }, [fetchLiveData]);

  const handleFeeRecycle = async () => {
    const amt = parseFloat(recycleAmount);
    if (!amt || amt <= 0) return;
    setRecycleLoading(true); setRecycleMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/tokenomics/fee-recycling`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ amount: amt, organization: recycleOrg || undefined }),
      });
      if (res.ok) {
        const d = await res.json();
        setRecycleMsg({ text: d.message || `Recycled ${amt} tokens!`, ok: true });
        setRecycleAmount('');
      } else {
        const err = await res.text();
        setRecycleMsg({ text: err || 'Failed', ok: false });
      }
    } catch (e: any) { setRecycleMsg({ text: e.message || 'Failed', ok: false }); }
    finally { setRecycleLoading(false); }
  };

  const fetchChainData = async () => {
    setChainLoading(true);
    try {
      const [statusRes, balRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/chain/status`),
        fetch(`${BACKEND_API}/api/chain/balance`),
      ]);
      if (statusRes.status === 'fulfilled' && statusRes.value.ok) setChainStatus(await statusRes.value.json());
      if (balRes.status === 'fulfilled' && balRes.value.ok) setChainBalance(await balRes.value.json());
    } catch { /* ignore */ }
    setChainLoading(false);
  };

  useEffect(() => { fetchChainData(); }, []);
  const tokenomics = [
    {
      token: "PoPP Tokens",
      purpose: "Staking, governance, validator rewards",
      distribution: "Validators, contributors, ecosystem fund",
    },
    {
      token: "PRS Credits",
      purpose: "Reputation scoring, validator ranking",
      distribution: "Earned through successful validations",
    },
    {
      token: "Escalation Tokens",
      purpose: "Priority processing, media amplification",
      distribution: "Purchased or earned through community contribution",
    },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-x-hidden">
      <div className="">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Tokenomics
            </span>
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            Understand how the Proof-of-Problem Protocol incentivizes truth, validates problems, and sustains the ecosystem with a carefully designed token model.
          </p>
        </div>

        {/* Token Flow SVG */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <svg viewBox="0 0 600 120" className="w-full h-32">
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path d="M30 80 L150 40 L300 80 L450 40 L570 80" stroke="url(#flowGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <circle key={i} r="6" fill="#06b6d4" cx={150 + i * 150} cy={40 + (i % 2 === 0 ? 40 : 0)}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 1}s`} />
              </circle>
            ))}
          </svg>
        </div>

        {/* Token Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tokenomics.map((t, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-2 text-cyan-400">{t.token}</h3>
              <p className="text-gray-400 text-sm mb-1">
                <span className="font-semibold text-gray-300">Purpose:</span> {t.purpose}
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-gray-300">Distribution:</span> {t.distribution}
              </p>
            </div>
          ))}
        </div>

        {/* How Tokens Move */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">How Tokens Move in PoPP</h2>
          <p className="text-gray-400">
            Each submitted problem generates PRS credits for validators and contributors. Escalation tokens allow priority processing and media amplification. The PoPP token ensures governance participation and sustainable ecosystem growth.
          </p>
        </div>

        {/* Incentive Structures */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Incentive Structures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "💰", title: "Direct Rewards", desc: "Token incentives for validators and contributors upon successful validation." },
                { icon: "🛡️", title: "Reputation & Governance", desc: "Reputation points build influence in PoPP DAO governance and voting." },
                { icon: "🏆", title: "Social Incentives", desc: "Recognition badges, leaderboard positions, and community prestige." },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-4 text-center">Reward Distribution</h3>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { label: "Validators", percent: 50 },
                { label: "Contributors", percent: 30 },
                { label: "Ecosystem Fund", percent: 20 },
              ].map((r, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-semibold text-sm">{r.label}</span>
                  <span className="font-bold text-cyan-400">{r.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fee Recycling */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <RefreshCw size={20} className="text-orange-400" /> Fee Recycling & Chain Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fee Recycling Action */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Flame size={14} className="text-orange-400" /> Recycle Fee</h3>
            <p className="text-xs text-gray-400 mb-3">Pay a data access fee that gets recycled: 70% to treasury, 30% to reward pool.</p>
            {recycleMsg && <div className={`mb-2 p-2 rounded-lg text-xs font-semibold ${recycleMsg.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{recycleMsg.text}</div>}
            <input type="number" value={recycleAmount} onChange={e => setRecycleAmount(e.target.value)} placeholder="Fee amount" className="w-full mb-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
            <input value={recycleOrg} onChange={e => setRecycleOrg(e.target.value)} placeholder="Organization (optional)" className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
            <button onClick={handleFeeRecycle} disabled={recycleLoading || !recycleAmount} className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">
              {recycleLoading ? 'Recycling...' : 'Recycle Fee'}
            </button>
          </div>
          {/* Chain Status */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><BarChart3 size={14} className="text-cyan-400" /> Chain Node Status</h3>
            {chainLoading ? (
              <div className="flex items-center justify-center py-4"><div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : chainStatus ? (
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(chainStatus).slice(0, 8).map(([k, v]) => (
                  <div key={k} className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">{k.replace(/_/g, ' ')}</div>
                    <div className="text-sm font-bold truncate">{typeof v === 'number' ? v.toLocaleString() : String(v)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center py-4">Chain node not reachable</p>
            )}
            {chainBalance && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <h4 className="text-xs font-bold text-gray-400 mb-2">Chain Balance</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(chainBalance).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-500">{k.replace(/_/g, ' ')}</div>
                      <div className="text-sm font-bold">{typeof v === 'number' ? v.toLocaleString() : String(v)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Tokenomics Data */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 size={20} className="text-cyan-400" /> Live Tokenomics Dashboard
        </h2>

        {liveLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dashData || emissionData ? (
          <div className="space-y-4">
            {/* Treasury Stats */}
            {dashData && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1"><Coins size={12} className="text-cyan-400" /><span className="text-[10px] text-gray-400">Max Supply</span></div>
                  <div className="text-lg font-bold">{dashData.max_supply ? Number(dashData.max_supply).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1"><PieChart size={12} className="text-blue-400" /><span className="text-[10px] text-gray-400">Circulating</span></div>
                  <div className="text-lg font-bold">{dashData.circulating_supply ? Number(dashData.circulating_supply).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-emerald-400" /><span className="text-[10px] text-gray-400">Total Minted</span></div>
                  <div className="text-lg font-bold">{dashData.total_minted ? Number(dashData.total_minted).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1"><Flame size={12} className="text-orange-400" /><span className="text-[10px] text-gray-400">Total Burned</span></div>
                  <div className="text-lg font-bold">{dashData.total_burned ? Number(dashData.total_burned).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}</div>
                </motion.div>
              </div>
            )}

            {/* Emission Status */}
            {emissionData && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-400" /> Emission Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {emissionData.current_epoch != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Current Epoch</div>
                      <div className="text-base font-bold">{emissionData.current_epoch}</div>
                    </div>
                  )}
                  {emissionData.remaining_supply != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Remaining</div>
                      <div className="text-base font-bold">{Number(emissionData.remaining_supply).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                  )}
                  {emissionData.emission_rate != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Emission Rate</div>
                      <div className="text-base font-bold">{Number(emissionData.emission_rate).toFixed(4)}</div>
                    </div>
                  )}
                  {emissionData.hard_cap_reached != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Hard Cap</div>
                      <div className={`text-base font-bold ${emissionData.hard_cap_reached ? 'text-red-400' : 'text-emerald-400'}`}>{emissionData.hard_cap_reached ? 'Reached' : 'Active'}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* My Quality Score */}
            {qualityData && connected && (
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-purple-400" /> My Quality Score</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {qualityData.quality_score != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Quality Score</div>
                      <div className="text-base font-bold">{Number(qualityData.quality_score).toFixed(2)}</div>
                    </div>
                  )}
                  {qualityData.quality_tier && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Tier</div>
                      <div className="text-base font-bold capitalize">{qualityData.quality_tier}</div>
                    </div>
                  )}
                  {qualityData.reward_multiplier != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Multiplier</div>
                      <div className="text-base font-bold">{Number(qualityData.reward_multiplier).toFixed(2)}x</div>
                    </div>
                  )}
                  {qualityData.verified_count != null && (
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400">Verified</div>
                      <div className="text-base font-bold">{qualityData.verified_count}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fee Recycling */}
            {dashData && dashData.fee_recycle_pool != null && (
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><Flame size={14} className="text-orange-400" /> Fee Recycling Pool</h3>
                <div className="text-xs text-gray-400">Current pool: <span className="text-white font-semibold">{Number(dashData.fee_recycle_pool).toLocaleString(undefined, { maximumFractionDigits: 2 })} tokens</span></div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-gray-400">Live tokenomics data is not yet available. The backend may not be configured with tokenomics data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
