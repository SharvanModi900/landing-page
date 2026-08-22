import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "CLI Tool",
  description: "PoPP Command Line Interface — submit problems, validate evidence, manage validator operations, and interact with the protocol directly from your terminal.",
  keywords: ["PoPP CLI", "command line tool", "protocol CLI", "validator CLI", "blockchain command line"],
  alternates: { canonical: "/cli" },
  openGraph: { title: "CLI Tool — PoPP", description: "Interact with the PoPP protocol directly from your terminal.", url: "/cli" },
  twitter: { title: "CLI Tool — PoPP", description: "Interact with the PoPP protocol from your terminal." },
};

const cliJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"PoPP CLI - Command Line Interface","url":"https://pops.thharko.com/cli","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function CliLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CLI" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cliJsonLd) }} />{children}</>; }
