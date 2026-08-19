"use client";
import React, { useState } from "react";
import { Shield, Trash2, AlertCircle, CheckCircle, Mail, ExternalLink, Loader2 } from "lucide-react";

const BACKEND_API = "https://popp.thharko.com";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_API}/api/account/request-deletion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, wallet_address: walletAddress, reason }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit deletion request. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again or email us directly at sharvanmodi900@gmail.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* Hero */}
        <section className="relative py-6 px-4 sm:px-6 text-center overflow-hidden border-b border-white/10">
          <div className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-orange-600/20 ring-1 ring-red-500/30">
                <Trash2 className="h-4 w-4 text-red-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                  Delete Account
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Request deletion of your PoPP account and associated data
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Important Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-red-400 mb-2">Important: Before You Delete</h2>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Your profile, submissions, and all off-chain data will be permanently deleted</li>
                  <li>• On-chain data (submission hashes anchored to blockchain) cannot be deleted as they are part of the immutable ledger</li>
                  <li>• Your Satmudra balance and staked amounts will be forfeited</li>
                  <li>• Validator status and reputation will be lost</li>
                  <li>• This action cannot be undone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What Gets Deleted */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              Data That Will Be Deleted
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-emerald-400 mb-2">✓ Completely Deleted</h3>
                <ul className="space-y-1.5 text-gray-300">
                  <li>• User profile and display name</li>
                  <li>• Email address</li>
                  <li>• Avatar/profile photo</li>
                  <li>• Push notification tokens</li>
                  <li>• All submission text and media</li>
                  <li>• Comments and discussions</li>
                  <li>• Notifications</li>
                  <li>• Badges and reputation data</li>
                  <li>• Transaction history</li>
                  <li>• Validator/proofer records</li>
                  <li>• Governance votes and proposals</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">⚠ Cannot Be Deleted</h3>
                <ul className="space-y-1.5 text-gray-300">
                  <li>• Blockchain-anchored submission hashes</li>
                  <li>• On-chain ticket IDs</li>
                  <li>• Proof hashes on PoPP chain</li>
                  <li>• Public ledger transactions</li>
                </ul>
                <p className="text-xs text-gray-400 mt-3">
                  These are part of the immutable blockchain and cannot be removed.
                </p>
              </div>
            </div>
          </div>

          {/* Deletion Request Form */}
          {!submitted ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-cyan-400" />
                Submit Deletion Request
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    We'll use this to verify your identity and confirm deletion
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Wallet Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="popp1... or cosmos1..."
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    The wallet address associated with your PoPP account
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for Deletion (Optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Help us improve by telling us why you're leaving..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                  />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-xs text-yellow-200">
                    <strong>By submitting this form:</strong> You acknowledge that this action is permanent and cannot be undone. 
                    All your off-chain data will be deleted within 30 days. On-chain data cannot be deleted.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs text-red-300">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Account Deletion"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5 text-center">
              <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-emerald-400 mb-2">Request Submitted</h2>
              <p className="text-sm text-gray-300 mb-4">
                Your account deletion request has been received. We'll process it within 30 days.
              </p>
              <p className="text-xs text-gray-400">
                A confirmation email will be sent to <strong className="text-white">{email}</strong>
              </p>
            </div>
          )}

          {/* Alternative Contact */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h2 className="text-base font-bold text-white mb-3">Alternative Contact Methods</h2>
            <p className="text-sm text-gray-300 mb-3">
              If you prefer, you can also request account deletion by emailing us directly:
            </p>
            <a
              href="mailto:sharvanmodi900@gmail.com?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20PoPP%20account%20associated%20with%20wallet%20address%3A%20%0A%0AEmail%3A%20%0AWallet%20Address%3A%20"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition text-sm"
            >
              <Mail className="h-4 w-4" />
              sharvanmodi900@gmail.com
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Retention Policy */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h2 className="text-base font-bold text-white mb-3">Data Retention Policy</h2>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <strong className="text-white">Processing Time:</strong> Your account deletion request will be processed within 30 days of submission.
              </p>
              <p>
                <strong className="text-white">Backup Retention:</strong> Some data may remain in encrypted backups for up to 90 days for disaster recovery purposes, 
                but will not be accessible in normal operations.
              </p>
              <p>
                <strong className="text-white">Legal Requirements:</strong> We may retain certain data if required by law or to resolve disputes.
              </p>
              <p>
                <strong className="text-white">Blockchain Data:</strong> On-chain data (submission hashes, ticket IDs) are permanently stored on the PoPP blockchain 
                and cannot be deleted. This data is public and immutable by design.
              </p>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-center pt-4">
            <a
              href="/privacy-policy"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition inline-flex items-center gap-1"
            >
              Read our Privacy Policy
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
