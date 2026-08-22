"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Key, Gift, Copy, Check, Users, TrendingUp, Tag, Award, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

export default function ProfilePage() {
  const { connected, connect, getAuthHeaders, user, refreshProfile } = useWallet();
  const [activeTab, setActiveTab] = useState<"info" | "referral" | "badges" | "danger">("info");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [pushToken, setPushToken] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralStats, setReferralStats] = useState<any>(null);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimMsg, setClaimMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [copied, setCopied] = useState(false);
  const [myBadges, setMyBadges] = useState<any[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const fetchReferral = useCallback(async () => {
    if (!connected) return;
    try {
      const [codeRes, statsRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/referral/my-code`, { headers: getAuthHeaders() }),
        fetch(`${BACKEND_API}/api/referral/stats`, { headers: getAuthHeaders() }),
      ]);
      if (codeRes.status === "fulfilled" && codeRes.value.ok) {
        const d = await codeRes.value.json();
        setReferralCode(d.referral_code || d.code || "");
      }
      if (statsRes.status === "fulfilled" && statsRes.value.ok) {
        const d = await statsRes.value.json();
        setReferralStats(d);
      }
    } catch { /* ignore */ }
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchReferral(); }, [fetchReferral]);

  const fetchBadges = useCallback(async () => {
    if (!connected) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/users/me/badges`, { headers: getAuthHeaders() });
      if (res.ok) { const d = await res.json(); setMyBadges(Array.isArray(d) ? d : d.badges || []); }
    } catch { /* ignore */ }
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchBadges(); }, [fetchBadges]);

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    setDeleteLoading(true); setDeleteMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/account/delete`, {
        method: "DELETE", headers: getAuthHeaders(),
      });
      if (res.ok) setDeleteMsg({ text: "Account deletion requested. You will be logged out.", ok: true });
      else { const err = await res.text(); setDeleteMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setDeleteMsg({ text: e.message || "Failed", ok: false }); }
    finally { setDeleteLoading(false); }
  };

  const handleUpdateProfile = async () => {
    setUpdateLoading(true); setUpdateMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/users/me`, {
        method: "PUT", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ display_name: displayName, email: email || undefined }),
      });
      if (res.ok) {
        setUpdateMsg({ text: "Profile updated!", ok: true });
        refreshProfile?.();
      } else {
        const err = await res.text();
        setUpdateMsg({ text: err || "Update failed", ok: false });
      }
    } catch (e: any) { setUpdateMsg({ text: e.message || "Failed", ok: false }); }
    finally { setUpdateLoading(false); }
  };

  const handleRegisterPushToken = async () => {
    if (!pushToken) return;
    setUpdateLoading(true); setUpdateMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/users/push-token`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ token: pushToken, platform: "web" }),
      });
      if (res.ok) {
        setUpdateMsg({ text: "Push token registered!", ok: true });
        setPushToken("");
      } else {
        const err = await res.text();
        setUpdateMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setUpdateMsg({ text: e.message || "Failed", ok: false }); }
    finally { setUpdateLoading(false); }
  };

  const handleClaimReferral = async () => {
    setClaimLoading(true); setClaimMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/referral/claim`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        const d = await res.json();
        setClaimMsg({ text: d.message || "Referral claimed!", ok: true });
      } else {
        const err = await res.text();
        setClaimMsg({ text: err || "Claim failed", ok: false });
      }
    } catch (e: any) { setClaimMsg({ text: e.message || "Failed", ok: false }); }
    finally { setClaimLoading(false); }
  };

  const copyCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20 ring-1 ring-violet-500/30">
            <User className="h-4 w-4 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold">My Profile</h1>
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <User className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">Connect to manage your profile.</p>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-1.5 mb-4">
              {(["info", "referral", "badges", "danger"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                  {tab === "danger" ? "Account" : tab}
                </button>
              ))}
            </div>

            {updateMsg && (
              <div className={`mb-4 p-2 rounded-lg text-xs font-semibold ${updateMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{updateMsg.text}</div>
            )}

            {activeTab === "info" && (
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><User size={14} className="text-violet-400" /> Profile Info</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-400 mb-1 block">Display Name</label>
                      <input value={displayName} onChange={e => setDisplayName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 mb-1 block">Email</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    </div>
                    <button onClick={handleUpdateProfile} disabled={updateLoading}
                      className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                      {updateLoading ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Key size={14} className="text-violet-400" /> Push Notifications</h3>
                  <input value={pushToken} onChange={e => setPushToken(e.target.value)} placeholder="Enter push notification token"
                    className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <button onClick={handleRegisterPushToken} disabled={updateLoading || !pushToken}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {updateLoading ? "Registering..." : "Register Push Token"}
                  </button>
                </motion.div>

                {/* Stats */}
                {user && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><TrendingUp size={14} className="text-violet-400" /> Stats</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">R-Score</div>
                        <div className="text-base font-bold">{user.r_score ?? 0}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Sat Mudra</div>
                        <div className="text-base font-bold">{(user.satmudra_balance ?? 0).toLocaleString()}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Submitted</div>
                        <div className="text-base font-bold">{user.tickets_submitted ?? 0}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Resolved</div>
                        <div className="text-base font-bold">{user.tickets_resolved ?? 0}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Validations</div>
                        <div className="text-base font-bold">{user.validations_done ?? 0}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-400">Level</div>
                        <div className="text-base font-bold">{user.validator_level ?? 0}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "referral" && (
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Gift size={14} className="text-violet-400" /> My Referral Code</h3>
                  {referralCode ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-mono font-bold text-violet-400">{referralCode}</span>
                      <button onClick={copyCode} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition" aria-label="Copy referral code">
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-gray-400" />}
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No referral code available yet</p>
                  )}
                </motion.div>

                {referralStats && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Users size={14} className="text-violet-400" /> Referral Stats</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {referralStats.total_referrals != null && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-400">Total Referrals</div>
                          <div className="text-base font-bold">{referralStats.total_referrals}</div>
                        </div>
                      )}
                      {referralStats.active_referrals != null && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-400">Active</div>
                          <div className="text-base font-bold">{referralStats.active_referrals}</div>
                        </div>
                      )}
                      {referralStats.total_earned != null && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-400">Total Earned</div>
                          <div className="text-base font-bold text-emerald-400">{referralStats.total_earned}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Tag size={14} className="text-violet-400" /> Claim Referral Reward</h3>
                  <p className="text-xs text-gray-400 mb-3">Claim your referral reward if you were referred by another user.</p>
                  <button onClick={handleClaimReferral} disabled={claimLoading}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {claimLoading ? "Claiming..." : "Claim Reward"}
                  </button>
                  {claimMsg && (
                    <div className={`mt-2 p-2 rounded-lg text-xs font-semibold ${claimMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{claimMsg.text}</div>
                  )}
                </motion.div>
              </div>
            )}

            {activeTab === "badges" && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-yellow-400" /> My Badges</h3>
                {myBadges.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">No badges earned yet</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {myBadges.map((b: any, i: number) => (
                      <motion.div key={b.id || i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">{b.icon || b.emoji || "\uD83C\uDFC5"}</div>
                        <div className="text-xs font-bold">{b.name || b.badge_name || "Badge"}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{b.description || ""}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "danger" && (
              <div className="bg-white/5 border border-red-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Trash2 size={14} className="text-red-400" /> Delete Account</h3>
                {deleteMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${deleteMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{deleteMsg.text}</div>}
                <p className="text-xs text-gray-400 mb-3">This action is irreversible. All your data will be permanently deleted.</p>
                <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder='Type "DELETE" to confirm'
                  className="w-full mb-3 px-3 py-2 bg-white/5 border border-red-500/20 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={handleDeleteAccount} disabled={deleteLoading || deleteConfirm !== "DELETE"}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-xs font-semibold text-red-400 disabled:opacity-50">
                  {deleteLoading ? "Deleting..." : "Permanently Delete Account"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
