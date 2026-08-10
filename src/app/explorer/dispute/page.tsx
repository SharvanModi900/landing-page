'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DisputePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link href="/explorer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
          <ArrowLeft size={14} /> Back to Explorer
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30 mb-6">
            <Shield className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Disputes & Appeals
          </h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Challenge validated tickets or view dispute status. This feature is coming soon as part of the PoPP governance system.
          </p>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 max-w-lg mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="text-sm font-semibold text-white mb-1">Feature In Development</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The disputes system will allow validators and community members to challenge ticket validations.
                  Disputes will be resolved through on-chain governance voting.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
