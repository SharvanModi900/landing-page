import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "PoPP Terms of Use — rules and guidelines for using the Proof of Problem Protocol, including user responsibilities, intellectual property, and dispute resolution.",
  keywords: ["PoPP terms of use", "terms of service", "user agreement", "protocol terms"],
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
};

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />{children}</>; }
