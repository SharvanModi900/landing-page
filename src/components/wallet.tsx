// app/components/wallet.tsx
'use client';

import { useKeplr } from '../lib/useKeplr';

export default function Wallet() {
  const { address, connect, isLoading } = useKeplr();

  return (
    <button
      onClick={connect}
      disabled={isLoading}
      className="bg-gradient-to-r from-indigo-700/50 to-indigo-800/50 hover:from-indigo-600/60 hover:to-indigo-700/60 backdrop-blur-sm text-cyan-200 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 border border-indigo-600/50 shadow-sm hover:shadow-indigo-500/20 flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Connecting...</span>
        </>
      ) : address ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
}