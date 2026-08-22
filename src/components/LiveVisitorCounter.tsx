"use client";
import { useState, useEffect, useRef } from "react";
import { Users } from "lucide-react";

const BACKEND_API = "https://popp.thharko.com";
const HEARTBEAT_INTERVAL = 30_000; // 30 seconds
const COUNT_POLL_INTERVAL = 30_000; // 30 seconds

function getOrCreateVisitorId(): string {
  const key = "popp-visitor-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

export default function LiveVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const visitorId = useRef<string>("");

  useEffect(() => {
    visitorId.current = getOrCreateVisitorId();

    const sendHeartbeat = () => {
      fetch(`${BACKEND_API}/api/visitors/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorId.current, page: "/" }),
      }).catch(() => {});
    };

    const fetchCount = () => {
      fetch(`${BACKEND_API}/api/visitors/count`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && typeof data.count === "number") {
            setCount(data.count);
          }
        })
        .catch(() => {});
    };

    // Initial heartbeat + count fetch
    sendHeartbeat();
    fetchCount();

    // Set up intervals
    const heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
    const countTimer = setInterval(fetchCount, COUNT_POLL_INTERVAL);

    return () => {
      clearInterval(heartbeatTimer);
      clearInterval(countTimer);
    };
  }, []);

  // Don't render until we have a count
  if (count === null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-full shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <Users className="w-3.5 h-3.5 text-gray-400" />
      <span className="text-xs font-semibold text-gray-300">
        {count} {count === 1 ? "visitor" : "visitors"} online
      </span>
    </div>
  );
}
