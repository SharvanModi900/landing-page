export default function DownloadPanel() {
    return (
      <div className="bg-[#0e1a2c] rounded-xl p-6 flex flex-col gap-3 items-start shadow-lg">
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded">
          Download Proof
        </button>
        <button className="border border-cyan-600 text-cyan-300 hover:bg-cyan-700/20 px-4 py-2 rounded">
          View on Explorer
        </button>
        <img src="/assets/qr-code.svg" alt="QR code to download PoPP report" width={64} height={64} className="w-16 h-16 mt-2" loading="lazy" />
      </div>
    );
  }
  