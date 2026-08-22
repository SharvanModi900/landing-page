import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tools",
  description: "PoPP Tools — developer utilities, diagnostic tools, and community-built applications for the Proof of Problem Protocol ecosystem.",
  keywords: ["PoPP tools", "developer utilities", "diagnostic tools", "community tools"],
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />{children}</>; }
