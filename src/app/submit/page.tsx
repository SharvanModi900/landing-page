// "use client";
// import React, { useState } from "react";
// import { useStageFlow } from "./hooks/useStageFlow";
// import StageProgressBar from "./StageProgressBar";
// import StageDetailCard from "./StageDetailCard";
// import SubmissionTimeline from "./SubmissionTimeline";
// import DownloadPanel from "./DownloadPanel";
// import SubmissionForm from "./SubmissionForm";

// export default function MainInterface() {
//   const { STAGES, currentStage, completed, advanceStage } = useStageFlow();
//   const [submitted, setSubmitted] = useState(false);
//   const [receipt, setReceipt] = useState<any>(null);

//   // Auto-advance stages after submission
//   React.useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (submitted && currentStage < STAGES.length - 1) {
//       timer = setTimeout(() => {
//         advanceStage();
//       }, 1200); // 1.2s per stage for demo
//     }
//     return () => clearTimeout(timer);
//   }, [submitted, currentStage, STAGES.length, advanceStage]);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#0b0f1c] to-[#141e30] text-white p-8 flex items-center justify-center">
//       {!submitted ? (
//         <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 bg-[#101a2e]/60 rounded-2xl border border-cyan-700/40 shadow-[0_0_32px_0_rgba(34,211,238,0.10)] p-12">
//           {/* LEFT: Title, subtitle, stepper, problem preview */}
//           <div className="flex flex-col justify-center gap-8">
//             <div>
//               <h1 className="text-3xl font-bold text-white mb-2">Proof of Problem Protocol</h1>
//               <p className="text-cyan-300 mb-4">Turn civic complaints into cryptographic proof</p>
//               <h2 className="text-2xl font-bold text-white mb-2">Your Civic Problem,<br/>Verifiable in 7 Steps</h2>
//             </div>
//             <StageProgressBar stages={STAGES} current={0} completed={[]} />
//             {/* Problem preview card placeholder */}
//             <div className="bg-[#0b172a] border border-cyan-700/50 rounded-xl p-6 shadow-cyan-400/10 flex flex-col gap-2 max-w-md">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-cyan-900/70 p-3 rounded-full">
//                   {/* Icon placeholder */}
//                   <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#22d3ee" strokeWidth="3" /></svg>
//                 </div>
//                 <div>
//                   <div className="text-lg font-semibold text-white">Pothole on Main St</div>
//                   <div className="text-xs text-cyan-300">2025-07-25 14:37</div>
//                 </div>
//               </div>
//               <div className="text-cyan-300 text-sm">0x1fdee...98c1</div>
//               <div className="flex items-center justify-between mt-2">
//                 <div className="text-xs text-slate-400">2025-07-25 14:37</div>
//                 <div className="bg-cyan-900/70 p-2 rounded">
//                   {/* QR placeholder */}
//                   <svg width="28" height="28"><rect width="28" height="28" rx="4" fill="#22d3ee" fillOpacity="0.2" /></svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Neon form card */}
//           <div className="bg-[#0e1a2c] border border-cyan-700/40 rounded-2xl shadow-cyan-400/10 p-8 flex flex-col justify-center min-h-[420px]">
//             <h2 className="text-2xl font-bold text-white mb-6">Submit Your Complaint</h2>
//             <SubmissionForm
//               onSuccess={(data: any) => {
//                 setSubmitted(true);
//                 setReceipt(data);
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         // After submission, show your original multi-stage tracker UI here
//         <div className="w-full mx-auto flex flex-col md:flex-row gap-10 items-start overflow-x-auto">
//           {/* LEFT COLUMN: stepper, timeline, and proof unlock in one card */}
//           <div className="flex flex-col w-[560px] flex-none bg-[#101a2e]/70 rounded-2xl p-0 overflow-hidden min-h-[420px]">
//             {/* Horizontal stepper inside left card */}
//             <div className="w-full px-10 pt-8 pb-6">
//               <StageProgressBar stages={STAGES} current={currentStage} completed={completed} />
//             </div>
//             {/* Timeline + Proof Unlock inside left card */}
//             <div className="flex flex-row w-full items-center px-6 pb-10">
//               {/* Timeline + QR, vertically centered */}
//               <div className="flex flex-col items-center justify-center pr-4 h-full min-w-[80px]">
//                 <div className="flex flex-col items-center justify-between h-full" style={{height: '260px'}}>
//                   <div className="flex-1 flex flex-col justify-between">
//                     {[...Array(STAGES.length - 1)].map((_, idx) => (
//                       <div key={idx} className="flex flex-col items-center">
//                         <div className="w-7 h-7 flex items-center justify-center text-lg font-bold text-cyan-300 bg-transparent mb-2">
//                           <span>✔️</span>
//                         </div>
//                         {idx < STAGES.length - 2 && (
//                           <div className="w-1 h-10 bg-cyan-400/70 rounded-full mx-auto" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {/* QR node at end, large neon square, flush with card */}
//                   <div className="w-16 h-16 rounded-lg flex items-center justify-center  shadow-[0_0_16px_6px_rgba(34,211,238,0.5)] mt-2">
//                     <img src="/assets/qr-code.svg" alt="QR Code" className="w-10 h-10" />
//                   </div>
//                   <span className="mt-2 text-cyan-300 font-semibold text-xs tracking-wide">QR Code</span>
//                 </div>
//               </div>
//               {/* Proof Unlock Card (Ledger Stamp), only the card, no border */}
//               <div className="flex-1 flex flex-col rounded-2xl border-1 border-cyan-400 bg-[#101a2e] justify-between bg-transparent p-6 py-0 min-h-[260px]">
//                 <div className="flex items-center gap-5 mb-4">
//                   <div className="bg-cyan-900/80 p-5 rounded-2xl shadow-[0_0_20px_6px_rgba(34,211,238,0.22)]">
//                     {/* Large Ledger Stamp Icon in rounded square */}
//                     <svg width="44" height="44" fill="none"><rect width="44" height="44" rx="10" fill="#22d3ee" fillOpacity="0.18" /><path d="M13 22h18M22 13v18" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round"/></svg>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-3xl font-extrabold leading-tight"><span className="text-cyan-400">Prob</span><span className="text-white"> unlocked</span></span>
//                     <span className="text-sm text-cyan-200 mt-1 font-semibold">Confirmed</span>
//                   </div>
//                 </div>
//                 <hr className="border-cyan-500/30 my-2" />
//                 <div className="flex flex-col gap-1 mb-2">
//                   <div className="text-cyan-300 text-base font-semibold">Prof# xxxxx</div>
//                   <div className="text-white text-lg font-semibold">Pagesell cin stronly</div>
//                 </div>
//                 <hr className="border-cyan-800/50 my-2" />
//                 <div className="flex flex-col gap-1 mb-3">
//                   <span className="text-cyan-300 text-xs font-semibold">Confirmed</span>
//                   <span className="text-slate-400 text-xs">2025-04-06 14:32:10</span>
//                 </div>
//                 <div className="flex flex-row gap-2 w-full mt-2">
//                   <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow-blue-400/20 text-center">Download PDF</button>
//                   <button className="flex-1 bg-cyan-900 border border-cyan-400 text-cyan-300 hover:bg-cyan-700/20 px-4 py-2 rounded text-center">Copy Reference</button>
//                 </div>
//                 <button className="w-full text-cyan-400 underline mt-2">View on Explorer</button>
//               </div>
//             </div>
           
            
//           </div>
//           <div className="flex flex-col w-[480px] flex-none bg-[#101a2e]/70 rounded-2xl border-2 border-cyan-400 shadow-[0_0_24px_6px_rgba(34,211,238,0.15)] p-8 gap-4 items-start justify-start min-h-[420px]">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-green-400 text-2xl">✔️</span>
//                 <span className="text-xl font-bold text-green-400">Proof Submitted!</span>
//               </div>
//               <div className="text-white text-base font-semibold">Problem Details</div>
//               <div className="text-cyan-300 text-xs">Problem # 133456</div>
//               <div className="text-white text-sm">Title: Damaged sidewalk o Eim St</div>
//               <div className="text-white text-sm">Description: Report of a broken ad obstructed sidewalk creating a hazard</div>
//               <div className="text-cyan-300 text-xs">Tags: Sidewalk, Safety</div>
//               <div className="text-white text-base font-semibold mt-3">Blockchain Info</div>
//               <div className="text-cyan-300 text-xs">Transaction Hash: 0x849a...bc62</div>
//               <div className="text-cyan-300 text-xs">Chain: Cosmos Hub</div>
//               <div className="text-cyan-300 text-xs">Gas Used: 0.00452 ATOM</div>
//               <div className="text-cyan-300 text-xs">Confirmed</div>
//               <div className="flex gap-3 mt-4">
//                 <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow-blue-400/20">Download PDF</button>
//                 <button className="bg-cyan-900 border border-cyan-400 text-cyan-300 hover:bg-cyan-700/20 px-4 py-2 rounded">Copy Reference</button>
//               </div>
//             </div>
//         </div>
//       )}
//     </main>
//   );
// }

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
      }, 1200); // 1.2s per stage for demo
    }
    return () => clearTimeout(timer);
  }, [submitted, currentStage, STAGES.length, advanceStage]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0f1c] to-[#141e30] text-white p-8 flex items-center justify-center ">
      {!submitted ? (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 bg-[#101a2e]/60 rounded-2xl border border-cyan-700/40 shadow-[0_0_32px_0_rgba(34,211,238,0.10)] p-12 mt-[100px]">
          {/* LEFT: Title, subtitle, stepper, problem preview */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Proof of Problem Protocol
              </h1>
              <p className="text-cyan-300 mb-4">
                Turn civic complaints into cryptographic proof
              </p>
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Civic Problem,Verifiable in 7 Steps
              </h2>
            </div>
            <StageProgressBar stages={STAGES} current={0} completed={[]} />
            {/* Problem preview card */}
            <div className="bg-[#0b172a] border border-cyan-700/50 rounded-xl p-6 shadow-cyan-400/10 flex flex-col gap-2 max-w-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-900/70 p-3 rounded-full">
                  <svg width="28" height="28" fill="none">
                    <circle
                      cx="14"
                      cy="14"
                      r="12"
                      stroke="#22d3ee"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    Pothole on Main St
                  </div>
                  <div className="text-xs text-cyan-300">
                    2025-07-25 14:37
                  </div>
                </div>
              </div>
              <div className="text-cyan-300 text-sm">0x1fdee...98c1</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-400">
                  2025-07-25 14:37
                </div>
                <div className="bg-cyan-900/70 p-2 rounded">
                  <svg width="28" height="28">
                    <rect
                      width="28"
                      height="28"
                      rx="4"
                      fill="#22d3ee"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Neon form card */}
          <div className="bg-[#0e1a2c] border border-cyan-700/40 rounded-2xl shadow-cyan-400/10 p-8 flex flex-col justify-center min-h-[420px]">
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
      ) : (
        // After submission
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10 items-center justify-center mt-[100px]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-[560px] flex-none bg-[#101a2e]/70 rounded-2xl p-0 overflow-hidden min-h-[420px]">
            <div className="w-full px-10 pt-8 pb-6">
              <StageProgressBar
                stages={STAGES}
                current={currentStage}
                completed={completed}
              />
            </div>
            <div className="flex flex-row w-full items-center px-6 pb-10">
              {/* Timeline + QR */}
              <div className="relative flex flex-col items-center justify-center pr-4 h-full min-w-[80px]">
                {/* Continuous vertical line */}
                <div className="absolute top-0 bottom-0 w-1 bg-cyan-400/70 rounded-full"></div>

                {/* Check icons placed on the line */}
                <div
                  className="flex flex-col items-center justify-between h-full relative z-10"
                  style={{ height: "260px" }}
                >
                  {[...Array(STAGES.length - 1)].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 flex items-center justify-center text-lg font-bold text-cyan-300 bg-[#0b172a] rounded-full border border-cyan-400 mb-2"
                    >
                      ✔️
                    </div>
                  ))}
                </div>

               {receipt?.txHash && (
  <div className="flex flex-col items-center mt-4 relative z-10">
    <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-[0_0_16px_6px_rgba(34,211,238,0.5)] mt-2 bg-[#0b172a]">
      <QRCodeCanvas
        value={`https://www.mintscan.io/cosmos/txs/${receipt.txHash}`}
        size={56}
        bgColor="#0b172a"
        fgColor="#22d3ee"
        level="H"
        includeMargin={false}
      />
    </div>
    <span className="mt-2 text-cyan-300 font-semibold text-xs tracking-wide">
      QR Code
    </span>
  </div>
)}

              </div>

              {/* Proof Unlock */}
              <div className="flex-1 flex flex-col rounded-2xl bg-transparent p-6 py-0 min-h-[260px]">
                <div className="flex items-center gap-5 mb-4">
                  <div className="bg-cyan-900/80 p-5 rounded-2xl shadow-[0_0_20px_6px_rgba(34,211,238,0.22)]">
                    <svg width="44" height="44" fill="none">
                      <rect
                        width="44"
                        height="44"
                        rx="10"
                        fill="#22d3ee"
                        fillOpacity="0.18"
                      />
                      <path
                        d="M13 22h18M22 13v18"
                        stroke="#22d3ee"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold leading-tight">
                      <span className="text-cyan-400">Prob</span>
                      <span className="text-white"> unlocked</span>
                    </span>
                    <span className="text-sm text-cyan-200 mt-1 font-semibold">
                      Confirmed
                    </span>
                  </div>
                </div>
                <hr className="border-cyan-500/30 my-2" />
                <div className="flex flex-col gap-1 mb-2">
                  <div className="text-cyan-300 text-base font-semibold">
                    Prof# xxxxx
                  </div>
                  <div className="text-white text-lg font-semibold">
                    Pagesell cin stronly
                  </div>
                </div>
                <hr className="border-cyan-800/50 my-2" />
                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-cyan-300 text-xs font-semibold">
                    Confirmed
                  </span>
                  <span className="text-slate-400 text-xs">
                    2025-04-06 14:32:10
                  </span>
                </div>
                <div className="flex flex-row gap-2 w-full mt-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow-blue-400/20 text-center">
                    Download PDF
                  </button>
                  <button className="flex-1 bg-cyan-900 border border-cyan-400 text-cyan-300 hover:bg-cyan-700/20 px-4 py-2 rounded text-center">
                    Copy Reference
                  </button>
                </div>
                <button className="w-full text-cyan-400 underline mt-2">
                  View on Explorer
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col w-[480px] flex-none bg-[#101a2e]/70 rounded-2xl border-2 border-cyan-400 shadow-[0_0_24px_6px_rgba(34,211,238,0.15)] p-8 gap-4 items-start justify-start min-h-[420px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400 text-2xl">✔️</span>
              <span className="text-xl font-bold text-green-400">
                Proof Submitted!
              </span>
            </div>
            <div className="text-white text-base font-semibold">
              Problem Details
            </div>
            <div className="text-cyan-300 text-xs">Problem # 133456</div>
            <div className="text-white text-sm">
              Title: Damaged sidewalk o Eim St
            </div>
            <div className="text-white text-sm">
              Description: Report of a broken ad obstructed sidewalk creating a
              hazard
            </div>
            <div className="text-cyan-300 text-xs">Tags: Sidewalk, Safety</div>
            <div className="text-white text-base font-semibold mt-3">
              Blockchain Info
            </div>
            <div className="text-cyan-300 text-xs">
              Transaction Hash: {receipt?.txHash || "0x849a...bc62"}
            </div>
            <div className="text-cyan-300 text-xs">Chain: Cosmos Hub</div>
            <div className="text-cyan-300 text-xs">Gas Used: 0.00452 ATOM</div>
            <div className="text-cyan-300 text-xs">Confirmed</div>
            {receipt?.txHash && (
              <div className="mt-3 flex items-center justify-center">
                <QRCodeCanvas
                  value={`https://www.mintscan.io/cosmos/txs/${receipt.txHash}`}
                  size={96}
                  bgColor="#101a2e"
                  fgColor="#22d3ee"
                  level="H"
                />
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded shadow-blue-400/20">
                Download PDF
              </button>
              <button className="bg-cyan-900 border border-cyan-400 text-cyan-300 hover:bg-cyan-700/20 px-4 py-2 rounded">
                Copy Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
