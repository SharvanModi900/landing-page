import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Partners",
  description: "PoPP partners — organizations, institutions, and ecosystem collaborators supporting the Proof of Problem Protocol's mission for decentralized civic validation.",
  keywords: ["PoPP partners", "ecosystem partners", "civic tech partnerships", "collaborators"],
  alternates: { canonical: "/patners" },
};

export default function PatnersLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />{children}</>; }
