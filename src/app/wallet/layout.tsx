import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wallet",
  description: "PoPP Wallet — manage your SAT MUDRA tokens, view balances, send and receive rewards, and connect to the PoPP blockchain network.",
  keywords: ["PoPP wallet", "SAT MUDRA", "token wallet", "crypto wallet", "rewards wallet"],
  alternates: { canonical: "/wallet" },
};

export default function WalletLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wallet" }]} />{children}</>; }
