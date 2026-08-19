"use client";
import React, { useState } from "react";
import { useStageFlow } from "./hooks/useStageFlow";
import StageProgressBar from "./StageProgressBar";
import SubmissionForm from "./SubmissionForm";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Copy, Download, ExternalLink, Shield,
  FileText, ShieldCheck, Users, Vote, Rocket, Zap,
} from "lucide-react";

const stageIcons = [FileText, ShieldCheck, Users, Vote, Rocket];

export default function SubmitPage() {
  const { STAGES, currentStage, advanceStage } = useStageFlow();
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted && currentStage < STAGES.length - 1) {
      timer = setTimeout(() => advanceStage(), 1200);
    }
    return () => clearTimeout(timer);
  }, [submitted, currentStage, STAGES.length, advanceStage]);

  return (
    <main className="min-h-screen bg-[#06080f] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHR0cHMgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      <div className="relative pt-20 pb-16 min-h-screen flex flex-col">
        {!submitted ? (
          /* ═══════ PRE-SUBMISSION: Split Panel ═══════ */
          <div className="flex-1 w-full max-w-7xl mx-auto px-6 flex gap-8 items-start">
            {/* ── Left: Pipeline Timeline ── */}
            <div className="hidden lg:flex flex-col w-80 sticky top-28">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/15 rounded-full text-xs text-cyan-400 mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  Proof of Problem Protocol
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Submit a Problem</h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Report a real-world issue. Your submission goes through a 5-stage decentralized verification pipeline.
                </p>
              </div>

              {/* Vertical Pipeline Timeline */}
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-transparent" />
                <div className="space-y-1">
                  {STAGES.map((stage, idx) => {
                    const Icon = stageIcons[idx] || ShieldCheck;
                    const isActive = idx === 0;
                    const isFuture = idx > 0;
                    return (
                      <div key={stage.key} className="relative flex items-start gap-4 py-4">
                        {/* Node */}
                        <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                          isActive
                            ? "bg-cyan-500/15 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                            : "bg-white/[0.02] border-white/[0.06]"
                        }`}>
                          <Icon className={`w-4.5 h-4.5 ${isActive ? "text-cyan-400" : "text-gray-600"}`} />
                          {isActive && (
                            <div className="absolute -inset-1 rounded-xl bg-cyan-500/10 animate-ping" style={{ animationDuration: "2s" }} />
                          )}
                        </div>
                        {/* Label */}
                        <div className="pt-1.5">
                          <div className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-600"}`}>{stage.label}</div>
                          <div className={`text-[11px] mt-0.5 ${isActive ? "text-gray-400" : "text-gray-700"}`}>{stage.subtitle || getStageDesc(idx)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: "Avg. Verify Time", value: "~4 min", icon: Zap },
                  { label: "Validators", value: "3-7", icon: Users },
                ].map((s) => (
                  <div key={s.label} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <s.icon className="w-3.5 h-3.5 text-cyan-500/50 mb-1.5" />
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Form Panel ── */}
            <div className="flex-1 max-w-2xl">
              {/* Mobile header */}
              <div className="lg:hidden mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/15 rounded-full text-xs text-cyan-400 mb-3">
                  <Shield className="w-3.5 h-3.5" />
                  Proof of Problem Protocol
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Submit a Problem</h1>
                <p className="text-sm text-gray-500">Report a real-world issue for verification</p>
              </div>

              {/* Glassmorphism form card */}
              <div className="relative">
                {/* Gradient border glow */}
                <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent rounded-2xl" />
                <div className="relative bg-[#0a0e18]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                  <SubmissionForm
                    onSuccess={(data: any) => {
                      setSubmitted(true);
                      setReceipt(data);
                    }}
                  />
                </div>
              </div>

              {/* Mobile pipeline below form */}
              <div className="lg:hidden mt-6">
                <h2 className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-3 text-center">
                  Verification Pipeline
                </h2>
                <StageProgressBar stages={STAGES} current={0} />
              </div>
            </div>
          </div>
        ) : (
          /* ═══════ POST-SUBMISSION ═══════ */
          <div className="flex-1 w-full max-w-4xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* ── Left: Success + Pipeline ── */}
              <div className="flex-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  {/* Success hero */}
                  <div className="mb-8">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                      <div className="absolute -inset-2 rounded-2xl bg-green-500/5 animate-ping" style={{ animationDuration: "2s" }} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Problem Submitted</h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Your problem is now being processed through the PoPP decentralized verification pipeline.
                    </p>
                  </div>

                  {/* Stage progress - horizontal pipeline */}
                  <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6">
                    <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-4">Pipeline Progress</div>
                    <div className="flex items-center gap-0">
                      {STAGES.map((stage, idx) => {
                        const Icon = stageIcons[idx] || ShieldCheck;
                        const isDone = idx < currentStage;
                        const isActive = idx === currentStage;
                        return (
                          <React.Fragment key={stage.key}>
                            <div className="flex flex-col items-center gap-1.5 z-10">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                                isDone ? "bg-green-500/15 border-green-500/25" :
                                isActive ? "bg-cyan-500/15 border-cyan-500/30 shadow-lg shadow-cyan-500/10" :
                                "bg-white/[0.02] border-white/[0.06]"
                              }`}>
                                {isDone ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-gray-600"}`} />}
                              </div>
                              <span className={`text-[9px] font-medium text-center leading-tight ${
                                isDone ? "text-green-400" : isActive ? "text-cyan-400" : "text-gray-700"
                              }`}>{stage.label}</span>
                            </div>
                            {idx < STAGES.length - 1 && (
                              <div className="flex-1 h-px mx-2 mb-5">
                                <div className={`h-full rounded-full transition-all duration-700 ${
                                  idx < currentStage ? "bg-green-500/40" : "bg-white/[0.06]"
                                }`} />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Right: Receipt Card ── */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-96 sticky top-28">
                <div className="relative">
                  <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/15 via-green-500/10 to-transparent rounded-2xl" />
                  <div className="relative bg-[#0a0e18]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
                    {/* Receipt Header */}
                    <div className="px-6 py-5 border-b border-white/[0.06] bg-gradient-to-r from-cyan-500/[0.04] to-green-500/[0.02]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Transaction Hash</div>
                          <div className="text-sm font-mono text-cyan-400">{receipt?.txHash || "0x849a...bc62"}</div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/15 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium text-green-400">Confirmed</span>
                        </div>
                      </div>
                    </div>

                    {/* Receipt Body */}
                    <div className="px-6 py-5">
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          { label: "ID", value: `#${receipt?.id || "133456"}` },
                          { label: "Chain", value: "PoPP Chain" },
                          { label: "Gas", value: "0.00452 POPPT" },
                          { label: "Time", value: new Date().toLocaleTimeString() },
                        ].map((item) => (
                          <div key={item.label} className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                            <div className="text-[9px] text-gray-600 uppercase tracking-wider mb-0.5">{item.label}</div>
                            <div className="text-xs text-white font-medium">{item.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* QR Code */}
                      <div className="flex flex-col items-center gap-3 mb-5">
                        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                          <QRCodeCanvas
                            value={`https://www.mintscan.io/cosmos/txs/${receipt?.txHash || "0x849a"}`}
                            size={120} bgColor="transparent" fgColor="#22d3ee" level="H"
                          />
                        </div>
                        <p className="text-[10px] text-gray-600">Scan to verify on explorer</p>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2.5">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/15">
                          <Download className="w-4 h-4" /> Download Receipt
                        </button>
                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs text-gray-400 hover:bg-white/[0.06] transition-colors">
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs text-cyan-400 hover:bg-white/[0.06] transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" /> Explorer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Submit Another */}
            <div className="text-center mt-10">
              <button onClick={() => { setSubmitted(false); setReceipt(null); }}
                className="text-sm text-gray-500 hover:text-white transition-colors">
                Submit another problem →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function getStageDesc(idx: number): string {
  const descs = [
    "Problem registered on-chain",
    "Evidence verified by validators",
    "Community validation in progress",
    "Governance review and voting",
    "Resolution executed on-chain",
  ];
  return descs[idx] || "";
}
