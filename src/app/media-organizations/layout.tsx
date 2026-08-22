import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Media Organizations",
  description: "PoPP for media organizations — access verified evidence, fact-check reports with cryptographic proof, and leverage community-validated data for investigative journalism and news reporting.",
  keywords: ["media verification tools", "journalism evidence", "fact-checking protocol", "verified news sources", "investigative journalism blockchain"],
  alternates: { canonical: "/media-organizations" },
  openGraph: { title: "Media Organizations — PoPP", description: "Verified evidence and community-validated data for journalism.", url: "/media-organizations" },
  twitter: { title: "Media Organizations — PoPP", description: "Verified evidence and validated data for journalism." },
};

export default function MediaOrganizationsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Media Organizations" }]} />{children}</>; }
