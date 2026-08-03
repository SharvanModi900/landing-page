"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Eye,
  Share2,
  Lock,
  UserCheck,
  Clock,
  Mail,
  FileText,
  ChevronRight,
  Globe,
  Server,
  Users,
  AlertTriangle,
  BookOpen,
  Smartphone,
  MapPin,
  Camera,
  Bell,
  Image,
  Key,
  Wifi,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    icon: <BookOpen size={14} />,
    content: `The Proof-of-Problem Protocol (PoPP) values your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you interact with our platform, mobile application, blockchain network, and related services.

By using PoPP services — including submitting problems, validating content, participating in governance, or interacting with Truth NFTs — you consent to the practices described in this policy.`,
  },
  {
    id: "data-we-collect",
    title: "Data We Collect",
    icon: <Database size={14} />,
    content: null,
    subsections: [
      { label: "Account Data", detail: "Name, email, organization, wallet address" },
      { label: "Submissions", detail: "Problem descriptions, location coordinates, photos, evidence hashes" },
      { label: "Validation Data", detail: "Validator votes, reputation scores, staking information" },
      { label: "Device & Usage", detail: "IP address, device type, browser, access logs, interaction patterns" },
      { label: "Blockchain Data", detail: "On-chain transactions, wallet addresses, token balances (public ledger)" },
      { label: "Cookies", detail: "Session tokens, analytics cookies, preference storage" },
    ],
  },
  {
    id: "how-we-use-data",
    title: "How We Use Your Data",
    icon: <Eye size={14} />,
    content: null,
    subsections: [
      { label: "Service Delivery", detail: "Process problem submissions, validations, and proof generation" },
      { label: "Security", detail: "Detect fraud, prevent abuse, protect network integrity" },
      { label: "Governance", detail: "Enable DAO voting, validator reputation tracking, dispute resolution" },
      { label: "Research", detail: "Anonymized datasets for civic research and impact analysis" },
      { label: "Communication", detail: "Notify about proposals, network upgrades, and opportunities" },
      { label: "Improvement", detail: "Enhance UX, optimize performance, develop new features" },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Disclosure",
    icon: <Share2 size={14} />,
    content: `We do not sell your personal information. Data may be shared only in these circumstances:

• Service providers — hosting, analytics, and infrastructure partners under strict data processing agreements
• Research collaborators — only with fully anonymized and aggregated datasets
• Legal compliance — when required by law, regulation, or court order
• DAO governance — on-chain data is inherently public and visible to all network participants

Cross-border transfers are protected by standard contractual clauses where applicable.`,
  },
  {
    id: "data-protection",
    title: "Data Protection Measures",
    icon: <Lock size={14} />,
    content: null,
    subsections: [
      { label: "Encryption", detail: "TLS 1.3 in transit, AES-256 at rest for sensitive data" },
      { label: "Pseudonymization", detail: "Personal identifiers separated from problem content where possible" },
      { label: "Access Control", detail: "Role-based permissions, principle of least privilege" },
      { label: "Auditing", detail: "Regular security audits, penetration testing, and code reviews" },
      { label: "Blockchain Security", detail: "Cryptographic proofs, zero-knowledge evidence verification" },
      { label: "Incident Response", detail: "72-hour breach notification process with affected user alerts" },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: <UserCheck size={14} />,
    content: `Depending on your jurisdiction (GDPR, CCPA, or equivalent), you have the right to:

• Access — request a copy of your personal data
• Rectification — correct inaccurate or incomplete data
• Erasure — request deletion of your data (subject to legal obligations)
• Portability — receive your data in a machine-readable format
• Restriction — limit how your data is processed
• Objection — opt out of certain processing activities

Note: On-chain data (transactions, wallet addresses) is immutable by design and cannot be deleted once recorded on the blockchain.

To exercise these rights, contact us at privacy@popp.org.`,
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: <Clock size={14} />,
    content: `We retain personal data only as long as necessary for the purposes described in this policy:

• Account data — retained while your account is active, deleted within 30 days of closure request
• Problem submissions — retained indefinitely as part of the public record (anonymized where possible)
• Validation records — retained for reputation and audit purposes
• Analytics data — retained for up to 24 months
• On-chain data — permanently retained (immutable blockchain ledger)

Anonymized and aggregated data may be retained indefinitely for research and network analysis.`,
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    icon: <Globe size={14} />,
    content: `PoPP integrates with third-party services that have their own privacy policies:

• Cloud infrastructure providers (hosting, CDN, storage)
• Analytics platforms (anonymized usage tracking)
• Wallet providers (self-custodial — we never hold your private keys)
• Block explorers (public blockchain data)

We encourage you to review the privacy policies of any third-party services you interact with through PoPP.`,
  },
  {
    id: "mobile-app-data",
    title: "Mobile App Data Collection (Google Play)",
    icon: <Smartphone size={14} />,
    content: `The PoPP mobile application collects the following types of data to provide its civic reporting and validation services. This disclosure is provided in compliance with Google Play Store Data Safety requirements.`,
    subsections: [
      { label: "Location (Approximate & Precise)", detail: "GPS coordinates are collected to geo-tag problem submissions, enable map exploration, and power ride-mode road health monitoring. Location is collected only when you submit a problem or use ride-mode — not in the background." },
      { label: "Photos & Videos (Camera + Gallery)", detail: "Camera and photo library access is used to capture or select photos and videos as evidence when reporting civic problems (potholes, damage, etc.). Media is uploaded to our servers as problem evidence." },
      { label: "Device & App Activity", detail: "Device type, OS version, IP address, app crash logs, and interaction patterns are collected for analytics, security, and performance optimization." },
      { label: "Push Notifications", detail: "A unique device push token (via Firebase/Expo) is stored on our server to deliver real-time alerts about problem status updates, governance proposals, and validator activities." },
      { label: "User Profile & Identity", detail: "Display name and profile avatar (optional) are collected during sign-up. Wallet address is stored for authentication. All credentials are stored in encrypted on-device storage (SecureStore/Keychain)." },
      { label: "In-App Wallet & Keys", detail: "A 24-word mnemonic recovery phrase is generated and stored in encrypted on-device storage. Private keys are derived in-memory only — never transmitted or stored on our servers." },
      { label: "Submissions & Evidence", detail: "Problem descriptions, GPS coordinates, photos, videos, and evidence hashes are uploaded to our servers for validation, verification, and public record." },
      { label: "App Permissions Requested", detail: "Location (foreground), Camera, Photo Library, Notifications. All permissions are optional and can be revoked at any time via device settings." },
    ],
  },
  {
    id: "play-store-safety",
    title: "Google Play Data Safety Summary",
    icon: <Shield size={14} />,
    content: null,
    subsections: [
      { label: "Data Collected", detail: "Location, Photos/Videos, Device info, App activity, Push token, User profile, Wallet address" },
      { label: "Data NOT Collected", detail: "Contacts, SMS, call logs, microphone, browsing history, personal messages, fitness data, financial info" },
      { label: "Data Shared with Third Parties", detail: "None. We do not sell or share personal data. Push notifications are delivered via Expo's service." },
      { label: "Data Encryption", detail: "All data is encrypted in transit (TLS 1.3) and sensitive data encrypted at rest (AES-256)" },
      { label: "Data Deletable?", detail: "Yes — users can request account deletion and data removal via privacy@popp.org or in-app settings" },
      { label: "Security Practices", detail: "Regular security audits, code reviews, encrypted credential storage, self-custodial wallet keys" },
      { label: "Data Purpose", detail: "Civic problem reporting, evidence collection, map visualization, governance participation, validator reputation" },
      { label: "On-Chain Data", detail: "Wallet addresses and transaction data are publicly visible on the blockchain ledger (immutable by design)" },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: <AlertTriangle size={14} />,
    content: `PoPP services are not directed at individuals under 16 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will take steps to delete the information.`,
  },
  {
    id: "changes",
    title: "Policy Changes",
    icon: <FileText size={14} />,
    content: `We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. Material changes will be communicated through:

• A prominent notice on our website
• Email notification to registered users
• On-chain governance proposal for protocol-level changes

Continued use of PoPP services after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: <Mail size={14} />,
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:

• Email: privacy@popp.org
• Governance Forum: governance.popp.org
• Mailing Address: PoPP Foundation, Decentralized Operations

Our Data Protection Officer reviews all privacy inquiries within 5 business days.`,
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-6 px-6 text-center overflow-hidden border-b border-white/10">
          <div className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Shield className="h-4 w-4 text-cyan-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Privacy Policy</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              How PoPP collects, uses, and protects your data across the protocol.
            </p>
            <p className="text-[11px] text-gray-500 mt-1.5">Last Updated: August 2025</p>
          </motion.div>
        </section>

        {/* ─── TOC ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Table of Contents</div>
            <div className="flex flex-wrap gap-1.5">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition flex items-center gap-1 ${
                    activeSection === s.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}>
                  {s.icon} {s.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Content ──────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pb-6 space-y-4">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.03 }}
              className="scroll-mt-24 bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400">
                  {section.icon}
                </div>
                <h2 className="text-sm font-bold text-white">{section.title}</h2>
              </div>

              {section.content && (
                <p className="text-[12px] text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
              )}

              {section.subsections && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.subsections.map((sub) => (
                    <div key={sub.label} className="bg-white/[0.03] rounded-md p-2 flex items-start gap-2">
                      <ChevronRight size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[11px] font-semibold text-white">{sub.label}</div>
                        <div className="text-[10px] text-gray-500">{sub.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* ─── Summary ──────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5">
            <h2 className="text-sm font-bold mb-2 flex items-center gap-1.5"><Shield size={14} className="text-cyan-400" /> Privacy at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: "No Data Selling", desc: "We never sell your personal information", color: "text-emerald-400" },
                { label: "Encrypted", desc: "TLS 1.3 + AES-256 encryption", color: "text-cyan-400" },
                { label: "Self-Custodial", desc: "You control your private keys", color: "text-blue-400" },
                { label: "GDPR Compliant", desc: "Full data rights for all users", color: "text-purple-400" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] rounded-md p-2.5">
                  <div className={`text-[11px] font-semibold ${item.color}`}>{item.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
