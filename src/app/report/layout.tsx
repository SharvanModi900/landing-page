import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Report a Problem",
  description:
    "Submit a problem report to the Proof of Problem Protocol. Provide evidence — photos, videos, location data — and earn rewards when your report is verified by the community. Start making an impact today.",
  keywords: [
    "report a problem",
    "civic issue reporting",
    "problem ticket",
    "submit evidence",
    "report pothole infrastructure",
    "earn rewards reporting problems",
    "PoPP report submission",
  ],
  alternates: { canonical: "/report" },
  openGraph: {
    title: "Report a Problem — PoPP",
    description:
      "Submit a problem report with evidence and earn rewards when verified by the community.",
    url: "/report",
  },
  twitter: {
    title: "Report a Problem — PoPP",
    description: "Submit a problem report with evidence and earn rewards when verified.",
  },
};

const reportJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"Report a Problem - PoPP","url":"https://pops.thharko.com/report","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Report a Problem" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportJsonLd) }} />{children}</>;
}
