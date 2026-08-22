import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sandbox & Testnet",
  description: "PoPP sandbox and testnet environment — experiment with problem reporting, validation workflows, and governance without risking real assets. Perfect for developers and testers.",
  keywords: ["PoPP testnet", "sandbox testing", "test environment", "developer sandbox", "protocol testing"],
  alternates: { canonical: "/sandbox-or-testnet" },
  openGraph: { title: "Sandbox & Testnet — PoPP", description: "Experiment with PoPP in a risk-free sandbox and testnet environment.", url: "/sandbox-or-testnet" },
  twitter: { title: "Sandbox & Testnet — PoPP", description: "Experiment with PoPP in a risk-free testnet environment." },
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sandbox & Testnet" }]} />{children}</>; }
