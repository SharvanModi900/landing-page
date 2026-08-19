"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, AlertCircle, Clock, Tag, Shield, Vote, Gift } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ticket_id?: string;
}

const TYPE_ICONS: Record<string, any> = {
  validation: <Shield size={14} className="text-cyan-400" />,
  governance: <Vote size={14} className="text-purple-400" />,
  reward: <Gift size={14} className="text-yellow-400" />,
  escalation: <AlertCircle size={14} className="text-orange-400" />,
  referral: <Tag size={14} className="text-emerald-400" />,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!connected) return;
    setLoading(true);
    try {
      const [notifRes, countRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/notifications`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/notifications/unread-count`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : { count: 0 }),
      ]);
      if (notifRes.status === "fulfilled" && Array.isArray(notifRes.value)) setNotifications(notifRes.value);
      if (countRes.status === "fulfilled" && countRes.value?.count != null) setUnreadCount(countRes.value.count);
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const markRead = async (id: string) => {
    try {
      await fetch(`${BACKEND_API}/api/notifications/${id}/read`, { method: "PUT", headers: getAuthHeaders() });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    try {
      await fetch(`${BACKEND_API}/api/notifications/read-all`, { method: "PUT", headers: getAuthHeaders() });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch { /* ignore */ }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-600/20 ring-1 ring-yellow-500/30">
              <Bell className="h-4 w-4 text-yellow-400" />
            </div>
            <h1 className="text-xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-500/20 text-yellow-400 rounded-full">{unreadCount} new</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition">
              <CheckCheck size={12} /> Mark all read
            </button>
          )}
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <Bell className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">Connect your wallet to view notifications.</p>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <Bell className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">No Notifications</h3>
            <p className="text-sm text-gray-400">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n, i) => {
              const icon = TYPE_ICONS[n.type] || <Bell size={14} className="text-gray-400" />;
              return (
                <motion.div key={n.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  onClick={() => !n.is_read && markRead(n.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${n.is_read ? "bg-white/[0.02] border-white/5" : "bg-white/[0.05] border-white/10"}`}>
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={`text-sm font-semibold truncate ${n.is_read ? "text-gray-400" : "text-white"}`}>{n.title}</h3>
                      {!n.is_read && <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{n.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><Clock size={9} /> {timeAgo(n.created_at)}</span>
                      {n.type && <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500">{n.type}</span>}
                    </div>
                  </div>
                  {!n.is_read && <Check size={14} className="text-gray-600 flex-shrink-0 mt-1" />}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
