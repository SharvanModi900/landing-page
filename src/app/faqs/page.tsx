'use client';

import { useState } from 'react';

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is Proof of Problem (PoPP)?',
        a: 'PoPP is a decentralized protocol that incentivizes citizens to report and validate real-world problems. Through blockchain verification and token rewards, we create a trustless system for community-driven problem resolution.',
      },
      {
        q: 'How does PoPP differ from traditional reporting systems?',
        a: 'Unlike centralized systems, PoPP uses blockchain verification, community consensus, and economic incentives to ensure problems are genuinely reported, validated, and resolved without censorship or manipulation.',
      },
      {
        q: 'What is the PoPP token ($POPPT)?',
        a: '$POPPT is the native utility token used for rewards, staking, and governance. Validators stake tokens to participate, submitters earn tokens for valid reports, and token holders govern protocol parameters.',
      },
    ],
  },
  {
    category: 'For Submitters',
    items: [
      {
        q: 'How do I submit a problem?',
        a: 'Use the mobile app or web interface to submit a problem with description, location, photos/videos, and category. The AI assistant "Hukum" can also accept voice submissions.',
      },
      {
        q: 'What happens after I submit?',
        a: 'Your submission undergoes AI analysis for severity and urgency, then enters community validation where validators verify the problem\'s authenticity. Once validated, it moves to proof and resolution stages.',
      },
      {
        q: 'How are rewards calculated?',
        a: 'Rewards depend on problem severity, validation speed, and community impact. Critical issues earn higher rewards. Validators and proofers also earn tokens for their participation.',
      },
    ],
  },
  {
    category: 'For Validators',
    items: [
      {
        q: 'How do I become a validator?',
        a: 'Register as a validator, pass the qualification exam, and stake the minimum required tokens. Higher reputation scores unlock access to higher-tier validations.',
      },
      {
        q: 'What are the slashing conditions?',
        a: 'Validators lose stake for voting against consensus (>3 times), providing false validations, or being inactive. Slashed tokens are burned to maintain token economics.',
      },
      {
        q: 'How is consensus reached?',
        a: 'Multiple validators vote on each submission. If >60% vote "valid", consensus is reached. Low consensus triggers cross-verification with additional validator rounds (max 3).',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'What blockchain does PoPP use?',
        a: 'PoPP runs on a custom Cosmos SDK chain with IBC compatibility, enabling interoperability with other Cosmos-based chains.',
      },
      {
        q: 'What is the R-Score?',
        a: 'R-Score (Reputation Score) tracks user credibility. It increases with valid submissions, accurate validations, and community contributions. It decays with inactivity (1 point per 7 days).',
      },
      {
        q: 'What are Soulbound NFTs?',
        a: 'Non-transferable NFTs minted when users reach R-Score thresholds (Bronze: 100, Silver: 250, Gold: 500, Platinum: 1000). They serve as permanent reputation badges.',
      },
    ],
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<Record<string, number>>({});

  const toggle = (category: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? -1 : index,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about the PoPP protocol
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((section) => (
            <div key={section.category} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((faq, idx) => (
                  <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggle(section.category, idx)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <span className="font-semibold">{faq.q}</span>
                      <span className="text-2xl">{openIndex[section.category] === idx ? '−' : '+'}</span>
                    </button>
                    {openIndex[section.category] === idx && (
                      <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
