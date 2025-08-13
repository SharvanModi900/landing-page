"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "What is a validator's main role in a blockchain network?",
    options: [
      "To store user wallets",
      "To verify transactions and produce blocks",
      "To create NFTs",
      "To write smart contracts",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "What happens if a validator acts maliciously?",
    options: [
      "They earn more rewards",
      "They get slashed or removed",
      "They become admin",
      "Nothing happens",
    ],
    answer: 1,
  },
];

export default function ValidatorExamPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResult]);

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore((s) => s + 1);
    }
    setSelected(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-6">
      {!showResult ? (
        <motion.div
          className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold text-orange-400">
              Validator Certification Exam
            </h1>
            <div className="text-lg">
              ⏳ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl mb-4">{questions[currentQ].question}</h2>
          <div className="space-y-3">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selected === idx
                    ? "bg-orange-500 text-black"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded-xl font-semibold"
            >
              {currentQ === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="max-w-xl mx-auto bg-slate-800 rounded-2xl p-10 text-center shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h1 className="text-3xl font-bold mb-4 text-orange-400">Exam Complete</h1>
          <p className="text-xl mb-2">Your Score: {score} / {questions.length}</p>
          {score >= questions.length * 0.7 ? (
            <p className="text-green-400 text-lg font-semibold">✅ Passed!</p>
          ) : (
            <p className="text-red-400 text-lg font-semibold">❌ Failed</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
