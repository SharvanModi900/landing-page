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

export default function LearningResourcesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learning Resources" }]} />{children}</>; }
