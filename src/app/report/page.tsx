"use client";
import React, { useState } from "react";
import { useStageFlow } from "./hooks/useStageFlow";
import StageProgressBar from "./StageProgressBar";
import SubmissionForm from "./SubmissionForm";
import { QRCodeCanvas } from "qrcode.react";
import {
  MapPin,
  FileText,
  Upload,
  Navigation,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Shield,
} from "lucide-react";

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
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-20 pb-16">
        {!submitted ? (
          /* ─── Pre-Submission View ─── */
          <div className="w-full max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Info + Stage Progress */}
              <div className="flex flex-col gap-8 lg:sticky lg:top-24">
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 mb-4">
                    <Shield className="w-4 h-4" />
                    Proof of Problem Protocol
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                    Submit a Problem
                  </h1>
                  <p className="text-gray-400 max-w-md">
                    Turn civic complaints into cryptographic proof. Every submission
                    goes through our 5-stage verification pipeline.
                  </p>
                </div>

                {/* Stage Progress */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    Verification Pipeline
                  </h2>
                  <StageProgressBar stages={STAGES} current={0} />
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-cyan-400">5</div>
                    <div className="text-xs text-gray-500 mt-1">Verification Stages</div>
                  </div>
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-purple-400">~2min</div>
                    <div className="text-xs text-gray-500 mt-1">Avg. Processing</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">
                  Problem Details
                </h2>
                <SubmissionForm
                  onSuccess={(data: any) => {
                    setSubmitted(true);
                    setReceipt(data);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ─── Post-Submission View ─── */
          <div className="w-full max-w-4xl mx-auto px-6">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                Problem Submitted
              </h1>
              <p className="text-gray-400">
                Your problem is now being processed through the PoPP pipeline.
              </p>
            </div>

            {/* Stage Progress */}
            <div className="mb-8">
              <StageProgressBar stages={STAGES} current={currentStage} />
            </div>

            {/* Receipt Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              {/* Receipt Header */}
              <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Transaction Hash
                    </div>
                    <div className="text-sm font-mono text-cyan-400">
                      {receipt?.txHash || "0x849a...bc62"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Details */}
                <div className="space-y-5">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Problem Details
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">ID:</span>
                        <span className="text-white font-mono">
                          #{receipt?.id || "133456"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Chain:</span>
                        <span className="text-white">PoPP Chain</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Gas:</span>
                        <span className="text-white">0.00452 POPPT</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span className="text-white">
                          {new Date().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Pipeline Status
                    </div>
                    <div className="space-y-2">
                      {STAGES.map((stage, idx) => (
                        <div key={stage.key} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              idx <= currentStage
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                : "bg-white/5 text-gray-600 border border-white/10"
                            }`}
                          >
                            {idx < currentStage ? "✓" : idx + 1}
                          </div>
                          <span
                            className={`text-sm ${
                              idx <= currentStage
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: QR + Actions */}
                <div className="flex flex-col items-center justify-center gap-6">
                  {receipt?.txHash && (
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                      <QRCodeCanvas
                        value={`https://www.mintscan.io/cosmos/txs/${receipt.txHash}`}
                        size={120}
                        bgColor="transparent"
                        fgColor="#22d3ee"
                        level="H"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Scan to verify on explorer
                  </p>

                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors">
                      <Copy className="w-4 h-4" />
                      Copy Reference
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-cyan-400 hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      View on Explorer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Another */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setReceipt(null);
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Submit another problem →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
