import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Vision",
  description: "PoPP's vision — shaping a transparent and decentralized future where collective intelligence solves real-world problems through cryptographic proof and community governance.",
  keywords: ["PoPP vision", "decentralized future", "transparent governance", "collective intelligence"],
  alternates: { canonical: "/vision" },
};

export default function VisionLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Vision" }]} />{children}</>; }
