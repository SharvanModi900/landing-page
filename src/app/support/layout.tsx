import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Support",
  description: "PoPP Support — get help, find answers, and connect with the community. We're here to assist you with problem reporting, validation, and protocol usage.",
  keywords: ["PoPP support", "help center", "get help", "support team"],
  alternates: { canonical: "/support" },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Support" }]} />{children}</>; }
