import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Learning Resources",
  description: "Curated PoPP learning resources — tutorials, guides, video walkthroughs, and documentation to master problem reporting, validation, and governance participation.",
  keywords: ["PoPP learning resources", "tutorials", "guides", "video walkthroughs", "protocol documentation"],
  alternates: { canonical: "/learning-resources" },
  openGraph: { title: "Learning Resources — PoPP", description: "Tutorials, guides, and videos to master PoPP problem reporting and validation.", url: "/learning-resources" },
  twitter: { title: "Learning Resources — PoPP", description: "Tutorials, guides, and videos to master PoPP." },
};

const learningresourcesJsonLd = {"@context":"https://schema.org","@type":"CollectionPage","name":"Learning Resources - PoPP","url":"https://pops.thharko.com/learning-resources","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function LearningResourcesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learning Resources" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningresourcesJsonLd) }} />{children}</>; }
