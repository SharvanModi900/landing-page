import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wallet",
  description: "PoPP Wallet — manage your SAT MUDRA tokens, view balances, send and receive rewards, and connect to the PoPP blockchain network.",
  keywords: ["PoPP wallet", "SAT MUDRA", "token wallet", "crypto wallet", "rewards wallet"],
  alternates: { canonical: "/wallet" },
};

const walletJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"Wallet - PoPP","url":"https://pops.thharko.com/wallet","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function WalletLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wallet" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(walletJsonLd) }} />{children}</>; }
