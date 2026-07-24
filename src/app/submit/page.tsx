"use client";
import React, { useState } from "react";
import { useStageFlow } from "./hooks/useStageFlow";
import StageProgressBar from "./StageProgressBar";
import SubmissionForm from "./SubmissionForm";
import { QRCodeCanvas } from "qrcode.react";

export default function MainInterface() {
  const { STAGES, currentStage, completed, advanceStage } = useStageFlow();
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  // Auto-advance stages after submission
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitted && currentStage < STAGES.length - 1) {
      timer = setTimeout(() => {
        advanceStage();
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [submitted, currentStage, STAGES.length, advanceStage]);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {!submitted ? (
          <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT: Title, stepper, problem preview */}
              <div className="flex flex-col justify-center gap-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Proof of Problem Protocol
                  </h1>
                  <p className="text-cyan-400 mb-4">
                    Turn civic complaints into cryptographic proof
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Your Civic Problem, Verifiable in 5 Steps
                  </h2>
                </div>

                <StageProgressBar stages={STAGES} current={0} />

                {/* Problem preview card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-2 max-w-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <svg width="24" height="24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">
                        Pothole on Main St
                      </div>
                      <div className="text-xs text-gray-500">
                        2025-07-25 14:37
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">0x1fdee...98c1</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">2025-07-25 14:37</div>
                    <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center">
                      <svg width="20" height="20">
                        <rect width="20" height="20" rx="3" fill="#22d3ee" fillOpacity="0.15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Form card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col justify-center min-h-[420px]">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Submit Your Complaint
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
          /* After submission */
          <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="flex flex-col w-full md:w-[560px] flex-none bg-white/5 border border-white/10 rounded-xl overflow-hidden min-h-[420px]">
              <div className="w-full px-8 pt-8 pb-6">
                <StageProgressBar stages={STAGES} current={currentStage} />
              </div>

              <div className="flex flex-row w-full items-center px-6 pb-10">
                {/* Timeline + QR */}
                <div className="relative flex flex-col items-center justify-center pr-4 h-full min-w-[80px]">
                  {/* Continuous vertical line */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white/10 rounded-full" />

                  {/* Check icons */}
                  <div
                    className="flex flex-col items-center justify-between h-full relative z-10"
                    style={{ height: "260px" }}
                  >
                    {[...Array(STAGES.length - 1)].map((_, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 flex items-center justify-center text-sm bg-[#030712] rounded-full border border-cyan-500/50 text-cyan-400"
                      >
                        &#10003;
                      </div>
                    ))}
                  </div>

                  {receipt?.txHash && (
                    <div className="flex flex-col items-center mt-4 relative z-10">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                        <QRCodeCanvas
                          value={`https://www.mintscan.io/cosmos/txs/${receipt.txHash}`}
                          size={56}
                          bgColor="transparent"
                          fgColor="#22d3ee"
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                      <span className="mt-2 text-gray-500 font-medium text-xs">
                        QR Code
                      </span>
                    </div>
                  )}
                </div>

                {/* Proof Unlock */}
                <div className="flex-1 flex flex-col p-6 py-0 min-h-[260px]">
                  <div className="flex items-center gap-5 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <svg width="28" height="28" fill="none">
                        <rect width="28" height="28" rx="6" fill="#22d3ee" fillOpacity="0.15" />
                        <path d="M9 14h10M14 9v10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-extrabold leading-tight">
                        <span className="text-cyan-400">Proof</span>
                        <span className="text-white"> unlocked</span>
                      </span>
                      <span className="text-sm text-gray-400 mt-1 font-medium">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  <hr className="border-white/[0.06] my-2" />

                  <div className="flex flex-col gap-1 mb-2">
                    <div className="text-sm text-gray-400 font-medium">
                      Proof # xxxxx
                    </div>
                    <div className="text-white text-base font-semibold">
                      Problem verified strongly
                    </div>
                  </div>

                  <hr className="border-white/[0.06] my-2" />

                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-xs text-gray-400 font-medium">Confirmed</span>
                    <span className="text-xs text-gray-500">2025-04-06 14:32:10</span>
                  </div>

                  <div className="flex flex-row gap-2 w-full mt-2">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                      Download PDF
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-4 py-2 rounded-lg text-sm text-center transition-colors">
                      Copy Reference
                    </button>
                  </div>
                  <button className="w-full text-cyan-400 hover:text-cyan-300 text-sm mt-2 transition-colors">
                    View on Explorer
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col w-full md:w-[480px] flex-none bg-white/5 border border-white/10 rounded-xl p-8 gap-4 items-start justify-start min-h-[420px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400 text-xl">&#10003;</span>
                <span className="text-lg font-bold text-green-400">
                  Proof Submitted!
                </span>
              </div>

              <div className="text-white text-base font-semibold">Problem Details</div>
              <div className="text-sm text-gray-400">Problem # 133456</div>
              <div className="text-sm text-gray-300">
                Title: Damaged sidewalk on Elm St
              </div>
              <div className="text-sm text-gray-300">
                Description: Report of a broken and obstructed sidewalk creating a hazard
              </div>
              <div className="text-sm text-gray-400">Tags: Sidewalk, Safety</div>

              <div className="text-white text-base font-semibold mt-3">Blockchain Info</div>
              <div className="text-sm text-gray-400 font-mono">
                Tx: {receipt?.txHash || "0x849a...bc62"}
              </div>
              <div className="text-sm text-gray-400">Chain: Cosmos Hub</div>
              <div className="text-sm text-gray-400">Gas Used: 0.00452 ATOM</div>
              <div className="text-sm text-gray-400">Confirmed</div>

              {receipt?.txHash && (
                <div className="mt-3 flex items-center justify-center">
                  <QRCodeCanvas
                    value={`https://www.mintscan.io/cosmos/txs/${receipt.txHash}`}
                    size={96}
                    bgColor="transparent"
                    fgColor="#22d3ee"
                    level="H"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                  Download PDF
                </button>
                <button className="bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors">
                  Copy Reference
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
