import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Students",
  description: "PoPP for students — learn about decentralized governance, participate in civic problem reporting, earn rewards, and gain real-world experience with blockchain technology and community validation.",
  keywords: ["student civic participation", "learn blockchain governance", "student rewards", "civic tech education", "blockchain learning"],
  alternates: { canonical: "/students" },
  openGraph: { title: "Students — PoPP", description: "Learn blockchain governance and participate in civic problem reporting.", url: "/students" },
  twitter: { title: "Students — PoPP", description: "Learn blockchain governance and earn rewards through civic participation." },
};

const studentsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Students - PoPP","url":"https://pops.thharko.com/students","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function StudentsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Students" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(studentsJsonLd) }} />{children}</>; }
