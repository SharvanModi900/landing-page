"use client";

import React, { useState, useRef, useEffect } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is PoPP?",
    answer:
      "PoPP stands for Proof-of-Problem Protocol. It is a decentralized framework for verifying, validating, and escalating real-world problems.",
  },
  {
    question: "How do I authenticate API requests?",
    answer:
      "All API requests require an API key passed in the Authorization header as a Bearer token.",
  },
  {
    question: "How can I submit a new problem?",
    answer:
      "Use the POST /api/problems endpoint with the problem title and detailed description in the request body.",
  },
  {
    question: "Can I vote on problems?",
    answer:
      "Yes! You can cast an upvote or downvote on a problem using the POST /api/problems/{problemId}/votes endpoint.",
  },
  {
    question: "What error codes should I expect?",
    answer:
      "Common errors include 400 for bad requests, 401 for unauthorized access, 404 for not found, and 500 for server errors.",
  },
];

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      const el = contentRefs.current[activeIndex];
      if (el) {
        el.style.maxHeight = el.scrollHeight + "px";
      }
    }
    contentRefs.current.forEach((el, idx) => {
      if (idx !== activeIndex && el) {
        el.style.maxHeight = "0px";
      }
    });
  }, [activeIndex]);

  return (
    <div className="bg-[#030712] min-h-screen text-white">
      <div className="pt-16 max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h1>

        <div className="space-y-3">
          {faqs.map(({ question, answer }, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-white/5"
            >
              <button
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full px-5 py-4 text-base font-semibold text-white focus:outline-none"
              >
                <span>{question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-cyan-400 shrink-0 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                ref={(el) => {
                  if (el) contentRefs.current[index] = el;
                }}
                className="px-5 pb-4 overflow-hidden max-h-0 transition-max-height duration-500 ease-in-out text-gray-400"
              >
                <p className="whitespace-pre-line text-sm">{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
