'use client';
import React, { useState } from 'react';

export const STAGES = [
  { key: 'spark', label: 'Spark', subtitle: 'the Complaint', icon: '⚡️' },
  { key: 'truth', label: 'Truth', subtitle: 'Detector', icon: '🧠' },
  { key: 'stamp', label: 'ImmuChale', subtitle: 'Ledger Stamp', icon: '📜' },
  { key: 'messenger', label: 'Interchain', subtitle: 'Messenger', icon: '⚡' },
  { key: 'proof', label: 'Proof', subtitle: "UnJo'cked", icon: '✅' },
];

export const useStageFlow = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  const advanceStage = () => {
    setCompleted((prev) => [...prev, STAGES[currentStage].key]);
    setCurrentStage((prev) => Math.min(prev + 1, STAGES.length - 1));
  };

  return { STAGES, currentStage, completed, advanceStage };
};
