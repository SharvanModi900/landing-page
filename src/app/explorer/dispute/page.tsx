'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, Clock, CheckCircle, XCircle, Search } from 'lucide-react';

const mockDisputes = [
  { id: '1', submission_id: 'sub-001', title: 'Road Pothole - Sector 62', reason: 'Photo evidence shows different location', status: 'pending', raised_at: '2025-01-15', raised_by: 'user123' },
  { id: '2', submission_id: 'sub-002', title: 'Water Logging - Block A', reason: 'Severity overstated, minor puddle', status: 'resolved', raised_at: '2025-01-10', raised_by: 'user456', resolution: 'Upheld original validation' },
  { id: '3', submission_id: 'sub-003', title: 'Garbage Dump - Park Area', reason: 'Duplicate of existing ticket #1234', status: 'pending', raised_at: '2025-01-20', raised_by: 'user789' },
];

export default function DisputePage() {
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === 'all' ? mockDisputes : mockDisputes.filter(d => d.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Disputes & Appeals
          </h1>
          <p className="text-xl text-gray-300">
            Challenge validated tickets or view dispute status
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {['all', 'pending', 'resolved'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === f ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <AlertTriangle size={14} /> File Dispute
            </button>
          </div>

          {/* Dispute Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">File a Dispute</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Submission ID</label>
                  <input type="text" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="Enter submission ID" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Reason for Dispute</label>
                  <textarea className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white h-24" placeholder="Explain why you're disputing this ticket..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Evidence (Optional)</label>
                  <input type="file" multiple className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" />
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg font-semibold">Submit Dispute</button>
                  <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg">Cancel</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Disputes List */}
          <div className="space-y-4">
            {filtered.map(dispute => (
              <motion.div key={dispute.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{dispute.title}</h3>
                    <p className="text-sm text-gray-400">Submission: {dispute.submission_id}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg ${
                    dispute.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
                    'bg-green-500/15 text-green-400 border border-green-500/20'
                  }`}>
                    {dispute.status === 'pending' ? <Clock size={12} className="inline mr-1" /> : <CheckCircle size={12} className="inline mr-1" />}
                    {dispute.status}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2"><strong>Reason:</strong> {dispute.reason}</p>
                {dispute.resolution && (
                  <p className="text-sm text-gray-400"><strong>Resolution:</strong> {dispute.resolution}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>Raised: {dispute.raised_at}</span>
                  <span>By: {dispute.raised_by}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
