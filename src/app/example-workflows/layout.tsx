import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Example Workflows",
  description: "PoPP workflow examples — see real-world scenarios of problem reporting, community verification, AI analysis, and reward distribution through step-by-step workflow demonstrations.",
  keywords: ["PoPP workflow examples", "reporting workflow", "verification process", "step-by-step guide", "protocol workflows"],
  alternates: { canonical: "/example-workflows" },
  openGraph: { title: "Example Workflows — PoPP", description: "Step-by-step workflow demonstrations of problem reporting, verification, and rewards.", url: "/example-workflows" },
  twitter: { title: "Example Workflows — PoPP", description: "Step-by-step PoPP workflow demonstrations." },
};

export default function ExampleWorkflowsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Example Workflows" }]} />{children}</>; }
