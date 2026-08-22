import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description: "PoPP Architecture — deep dive into the protocol's technical architecture, including chain design, consensus mechanism, data layers, and network topology.",
  keywords: ["PoPP architecture", "protocol architecture", "chain design", "consensus mechanism", "network topology"],
  alternates: { canonical: "/how-it-works/architecture" },
};

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
