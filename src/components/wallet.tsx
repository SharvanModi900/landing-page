// app/components/wallet.tsx
'use client';

import { useKeplr } from '../lib/useKeplr';

export default function Wallet() {
  const { address, connect } = useKeplr();

  return (
    <button
      onClick={connect}
      className="bg-gray-200 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-300 transition"
    >
      {address ? `${address.slice(0, 8)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}
