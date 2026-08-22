import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validation Process",
  description: "PoPP Validation Process — understand how community validators verify problem reports, assess evidence quality, and reach consensus on truth validation.",
  keywords: ["PoPP validation", "validation process", "community verification", "evidence assessment", "consensus validation"],
  alternates: { canonical: "/how-it-works/validation" },
};

export default function ValidationLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
