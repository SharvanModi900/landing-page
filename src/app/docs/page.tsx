"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Shield,
  Settings,
  Server,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Layers,
  Users,
  Vote,
  Coins,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Target,
  Eye,
  Fingerprint,
  Link2,
} from "lucide-react";
import Link from "next/link";

// ─── Sidebar Sections ───────────────────────────────────────────────────────

const SECTIONS = [
  { id: "overview", label: "Overview", icon: <BookOpen size={16} /> },
  { id: "policy", label: "Policy", icon: <Shield size={16} /> },
  { id: "governance", label: "Governance", icon: <Settings size={16} /> },
  { id: "architecture", label: "Architecture", icon: <Server size={16} /> },
  { id: "faq", label: "FAQs", icon: <HelpCircle size={16} /> },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="flex">
        {/* ─── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="w-56 border-r border-white/10 bg-white/[0.02] min-h-[calc(100vh-4rem)] sticky top-16 hidden md:block">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={18} className="text-cyan-400" />
              <span className="text-sm font-bold text-gray-300">POPP Docs</span>
            </div>
            <nav className="space-y-1">
              {SECTIONS.map((sec) => (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 w-full rounded-lg transition-all text-sm font-medium ${
                    activeSection === sec.id
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 font-semibold"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                  }`}>
                  {sec.icon}
                  {sec.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-5 border-t border-white/10">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Quick Links</div>
              <div className="space-y-1.5">
                {[
                  { label: "Explorer", href: "/explorer" },
                  { label: "DAO Dashboard", href: "/dao-dashboard" },
                  { label: "Validators", href: "/validators" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-cyan-400 transition">
                    <ChevronRight size={12} /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 p-5 md:p-8 max-w-4xl">
          {/* Mobile nav */}
          <div className="flex gap-2 mb-5 md:hidden overflow-x-auto pb-2">
            {SECTIONS.map((sec) => (
              <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeSection === sec.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white/5 text-gray-400 border border-white/10"
                }`}>
                {sec.icon} {sec.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ─── Overview ──────────────────────────────────────────────── */}
            {activeSection === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={22} className="text-cyan-400" />
                  <h1 className="text-2xl font-bold">Overview</h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5">
                  <p className="text-base text-gray-300 leading-7">
                    The <span className="text-cyan-400 font-semibold">Proof-of-Problem Protocol (PoPP)</span> is a decentralized mechanism for verifying real-world problems through cryptographic proof, validator consensus, and hierarchical escalation. It creates an immutable record that a problem exists, has been validated, and is being addressed — enabling transparent accountability without relying on any single authority.
                  </p>
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Layers size={18} className="text-cyan-400" /> Core Concepts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { icon: <FileText size={14} />, title: "Problem Ticket", desc: "A verified record of a real-world problem with location, evidence, and metadata submitted to the network." },
                    { icon: <Fingerprint size={14} />, title: "Truth NFT", desc: "An immutable, on-chain proof that a problem has been validated — minted when a ticket reaches sufficient validation." },
                    { icon: <Users size={14} />, title: "Validators", desc: "Staked network participants who review evidence and vote to confirm or reject problem submissions." },
                    { icon: <Target size={14} />, title: "Escalation", desc: "Unresolved problems automatically escalate from local → regional → national → global levels." },
                    { icon: <Coins size={14} />, title: "PoPP Credits", desc: "Token rewards earned by submitters, validators, and resolvers for contributing to problem resolution." },
                    { icon: <Vote size={14} />, title: "DAO Governance", desc: "Token holders propose and vote on protocol changes, treasury allocation, and parameter updates." },
                  ].map((item) => (
                    <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-cyan-400">{item.icon}</span>
                        <span className="text-sm font-bold">{item.title}</span>
                      </div>
                      <p className="text-sm text-gray-400 leading-6">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Zap size={18} className="text-yellow-400" /> How It Works</h2>
                <div className="space-y-3 mb-5">
                  {[
                    { step: "1", title: "Submit", desc: "A citizen reports a problem with location, photos, and description via the mobile app." },
                    { step: "2", title: "Validate", desc: "Network validators review the evidence and cast votes to confirm or reject." },
                    { step: "3", title: "Prove", desc: "Cryptographic proof is generated and recorded on-chain as a Truth NFT." },
                    { step: "4", title: "Escalate", desc: "If unresolved, the problem escalates through geographic levels automatically." },
                    { step: "5", title: "Resolve", desc: "Rewards are distributed, reputation updated, and the problem is marked resolved." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 bg-white/[0.03] rounded-xl p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold flex-shrink-0">{item.step}</div>
                      <div>
                        <div className="text-base font-semibold">{item.title}</div>
                        <div className="text-sm text-gray-400 leading-6">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link href="/explorer"><button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Explore Problems</button></Link>
                  <Link href="/validators"><button className="px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-sm font-semibold text-gray-300">Become a Validator</button></Link>
                </div>
              </motion.div>
            )}

            {/* ─── Policy ────────────────────────────────────────────────── */}
            {activeSection === "policy" && (
              <motion.div key="policy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-3 mb-5">
                  <Shield size={22} className="text-cyan-400" />
                  <h1 className="text-2xl font-bold">Policy</h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5">
                  <p className="text-base text-gray-300 leading-7">
                    PoPP's policy framework ensures fairness, transparency, and inclusivity in problem verification. These policies govern how problems are submitted, validated, escalated, and resolved across the network.
                  </p>
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><CheckCircle size={18} className="text-emerald-400" /> Submission Policy</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 space-y-3">
                  {[
                    "Any individual can submit a problem anonymously or with a verified identity",
                    "Submissions must include location data and at least one form of evidence (photo, video, or description)",
                    "Duplicate detection prevents the same problem from being reported multiple times in the same area",
                    "AI classification automatically categorizes problems by type, severity, and urgency",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400 leading-6">{rule}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Eye size={18} className="text-blue-400" /> Validation Policy</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 space-y-3">
                  {[
                    "Validators must stake tokens to participate — stake is at risk if they vote dishonestly",
                    "A minimum quorum of validators must review each problem before a verdict is reached",
                    "Validators vote based on evidence quality, not personal opinion",
                    "Accuracy scores track each validator's alignment with consensus over time",
                    "Validators with consistently low accuracy face slashing penalties",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Eye size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400 leading-6">{rule}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><AlertTriangle size={18} className="text-yellow-400" /> Escalation Policy</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 space-y-3">
                  {[
                    "Problems unresolved within a time window automatically escalate to the next level",
                    "Escalation levels: Local → Regional → National → Global → Critical",
                    "Each level has higher-stake validators with domain expertise",
                    "Escalated problems receive increased visibility and resource allocation",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <AlertTriangle size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400 leading-6">{rule}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Coins size={18} className="text-purple-400" /> Reward Policy</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  {[
                    "Submitters earn PoPP Credits when their problem is validated",
                    "Accurate validators earn a share of the validation reward pool",
                    "Resolvers earn reputation and tokens for solving validated problems",
                    "Dishonest validators lose stake through slashing mechanisms",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Coins size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400 leading-6">{rule}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── Governance ────────────────────────────────────────────── */}
            {activeSection === "governance" && (
              <motion.div key="governance" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-3 mb-5">
                  <Settings size={22} className="text-cyan-400" />
                  <h1 className="text-2xl font-bold">Governance</h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5">
                  <p className="text-base text-gray-300 leading-7">
                    PoPP is governed by a decentralized DAO (Decentralized Autonomous Organization). Token holders propose and vote on protocol changes, treasury allocation, parameter updates, and community initiatives. All governance actions are recorded on-chain for full transparency.
                  </p>
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Vote size={18} className="text-blue-400" /> How Governance Works</h2>
                <div className="space-y-3 mb-5">
                  {[
                    { step: "1", title: "Proposal", desc: "Any token holder can submit a governance proposal with a description and deposit." },
                    { step: "2", title: "Deposit Period", desc: "The community must contribute minimum deposit to move the proposal to a vote." },
                    { step: "3", title: "Voting", desc: "All stakers vote: Yes, No, NoWithVeto, or Abstain. Voting is token-weighted." },
                    { step: "4", title: "Execution", desc: "If majority votes Yes and no veto threshold is exceeded, the proposal passes automatically." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 bg-white/[0.03] rounded-xl p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold flex-shrink-0">{item.step}</div>
                      <div>
                        <div className="text-base font-semibold">{item.title}</div>
                        <div className="text-sm text-gray-400 leading-6">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Globe size={18} className="text-cyan-400" /> What Can Be Governed</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { title: "Protocol Parameters", desc: "Validation thresholds, escalation timers, quorum requirements" },
                    { title: "Treasury Spending", desc: "Fund development, bounties, grants, and community initiatives" },
                    { title: "Validator Rules", desc: "Staking requirements, slashing conditions, reputation formulas" },
                    { title: "Token Economics", desc: "Reward distribution, emission rates, burn mechanisms" },
                    { title: "Network Upgrades", desc: "Protocol improvements, new features, compatibility changes" },
                    { title: "Dispute Resolution", desc: "Handle edge cases, appeals, and contested validations" },
                  ].map((item) => (
                    <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-sm font-semibold mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400 leading-6">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link href="/dao-dashboard"><button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold">DAO Dashboard</button></Link>
                </div>
              </motion.div>
            )}

            {/* ─── Architecture ──────────────────────────────────────────── */}
            {activeSection === "architecture" && (
              <motion.div key="architecture" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-3 mb-5">
                  <Server size={22} className="text-cyan-400" />
                  <h1 className="text-2xl font-bold">Architecture</h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5">
                  <p className="text-base text-gray-300 leading-7">
                    PoPP follows a 7-layer architecture designed for modularity, scalability, and jurisdictionless operation. Each layer handles a specific concern and communicates through well-defined interfaces.
                  </p>
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Layers size={18} className="text-cyan-400" /> 7-Layer Stack</h2>
                <div className="space-y-3 mb-5">
                  {[
                    { layer: "1", name: "Problem Submission", status: "Complete", color: "text-emerald-400", bg: "bg-emerald-500/20", desc: "Mobile app → Rust backend → PostgreSQL+PostGIS. Handles problem reports with geolocation, evidence, and metadata." },
                    { layer: "2", name: "AI Intelligence", status: "Partial", color: "text-yellow-400", bg: "bg-yellow-500/20", desc: "Python offchain service for auto-classification, severity scoring, and duplicate detection." },
                    { layer: "3", name: "Validator Consensus", status: "Partial", color: "text-yellow-400", bg: "bg-yellow-500/20", desc: "Staked validators vote on problem validity. Cosmos SDK module with reputation tracking." },
                    { layer: "4", name: "Escalation Engine", status: "Planned", color: "text-gray-400", bg: "bg-gray-500/20", desc: "Automatic escalation through Local → Regional → National → Global → Critical tiers." },
                    { layer: "5", name: "Resolution & Rewards", status: "Planned", color: "text-gray-400", bg: "bg-gray-500/20", desc: "Token distribution, R-Score updates, PoPP Credits minting upon problem resolution." },
                    { layer: "6", name: "Blockchain & Immutability", status: "Active", color: "text-cyan-400", bg: "bg-cyan-500/20", desc: "Cosmos SDK sovereign chain. On-chain tickets, proofs, Truth NFTs, and validator records." },
                    { layer: "7", name: "Governance DAO", status: "Active", color: "text-cyan-400", bg: "bg-cyan-500/20", desc: "Cosmos gov module for proposals, voting, treasury management, and parameter updates." },
                  ].map((item) => (
                    <div key={item.layer} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold">{item.layer}</div>
                        <span className="text-base font-bold flex-1">{item.name}</span>
                        <span className={`${item.bg} ${item.color} rounded-full px-2.5 py-0.5 text-xs font-semibold`}>{item.status}</span>
                      </div>
                      <p className="text-sm text-gray-400 leading-6">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Link2 size={18} className="text-purple-400" /> Tech Stack</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Chain", value: "Cosmos SDK v0.50" },
                    { label: "Core API", value: "Rust + SQLx" },
                    { label: "AI Service", value: "Python FastAPI" },
                    { label: "Database", value: "PostgreSQL + PostGIS" },
                    { label: "Mobile", value: "Expo React Native" },
                    { label: "Landing", value: "Next.js + Tailwind" },
                    { label: "RPC", value: "rpc.thharko.com" },
                    { label: "Chain API", value: "chain.thharko.com" },
                    { label: "Backend", value: "popp.thharko.com" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/[0.03] rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase">{item.label}</div>
                      <div className="text-sm font-semibold">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link href="/explorer"><button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Explore Network</button></Link>
                  <Link href="/dao-dashboard"><button className="px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-sm font-semibold text-gray-300">DAO Dashboard</button></Link>
                </div>
              </motion.div>
            )}

            {/* ─── FAQs ──────────────────────────────────────────────────── */}
            {activeSection === "faq" && (
              <motion.div key="faq" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-3 mb-5">
                  <HelpCircle size={22} className="text-cyan-400" />
                  <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
                </div>

                <div className="space-y-3">
                  {[
                    { q: "What is PoPP?", a: "Proof-of-Problem Protocol is a decentralized system for verifying real-world problems through validator consensus and cryptographic proof. It creates immutable records that problems exist and are being addressed." },
                    { q: "How do I submit a problem?", a: "Download the PoPP mobile app, describe the problem, attach photos or evidence, and submit. Your location is automatically captured. The problem is then reviewed by network validators." },
                    { q: "Who are validators?", a: "Validators are staked network participants who review problem evidence and vote to confirm or reject submissions. They earn rewards for accurate validation and risk stake for dishonest behavior." },
                    { q: "What is a Truth NFT?", a: "A Truth NFT is an immutable, on-chain proof that a problem has been validated. It contains the cryptographic hash of the evidence, validator signatures, and metadata — permanently recording that the problem was verified." },
                    { q: "How does escalation work?", a: "If a validated problem remains unresolved within a time window, it automatically escalates to the next geographic level: Local → Regional → National → Global → Critical. Each level has higher-stake validators with relevant expertise." },
                    { q: "What tokens can I earn?", a: "Submitters earn PoPP Credits for validated problems. Validators earn rewards for accurate votes. Resolvers earn tokens for solving problems. All rewards are distributed through the on-chain protocol." },
                    { q: "How do I become a validator?", a: "You need to stake a minimum amount of $POPPT tokens, pass the validator exam, and register on-chain. Validators must maintain accuracy above a threshold to avoid slashing penalties." },
                    { q: "Is my identity protected?", a: "PoPP supports anonymous submissions. Your wallet address is recorded on-chain but is not directly linked to your real identity. Evidence is pseudonymized and access-controlled." },
                    { q: "What happens if a validator votes dishonestly?", a: "Validators whose votes consistently diverge from consensus face slashing — they lose a portion of their staked tokens and reputation score. Severe dishonesty can result in removal from the validator set." },
                    { q: "How is PoPP different from other reporting platforms?", a: "PoPP is decentralized and jurisdictionless. Problems are verified by a global network of validators, recorded immutably on-chain, and can escalate automatically. No single authority controls or censors the process." },
                  ].map((faq, i) => (
                    <details key={i} className="bg-white/5 border border-white/10 rounded-xl group">
                      <summary className="flex items-center gap-2.5 p-4 cursor-pointer text-sm font-semibold text-white hover:bg-white/[0.03] transition rounded-xl">
                        <ChevronRight size={14} className="text-cyan-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                        {faq.q}
                      </summary>
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-sm text-gray-400 leading-7 pl-6">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Right TOC ────────────────────────────────────────────────── */}
        <aside className="w-52 border-l border-white/10 bg-white/[0.02] min-h-[calc(100vh-4rem)] sticky top-16 hidden lg:block">
          <div className="p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </div>
            <nav className="space-y-1.5">
              {activeSection === "overview" && (
                <>
                  <TocLink label="Core Concepts" />
                  <TocLink label="How It Works" />
                </>
              )}
              {activeSection === "policy" && (
                <>
                  <TocLink label="Submission Policy" />
                  <TocLink label="Validation Policy" />
                  <TocLink label="Escalation Policy" />
                  <TocLink label="Reward Policy" />
                </>
              )}
              {activeSection === "governance" && (
                <>
                  <TocLink label="How Governance Works" />
                  <TocLink label="What Can Be Governed" />
                </>
              )}
              {activeSection === "architecture" && (
                <>
                  <TocLink label="7-Layer Stack" />
                  <TocLink label="Tech Stack" />
                </>
              )}
              {activeSection === "faq" && (
                <TocLink label="10 Questions" />
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TocLink({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 text-sm text-gray-500">
      <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
      {label}
    </div>
  );
}
