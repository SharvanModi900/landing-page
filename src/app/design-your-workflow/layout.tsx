import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Design Your Workflow",
  description: "Design custom workflows on PoPP — configure problem submission pipelines, validation rules, and reward structures tailored to your community or organization.",
  keywords: ["PoPP workflow designer", "custom workflows", "validation pipeline", "workflow configuration"],
  alternates: { canonical: "/design-your-workflow" },
};

export default function DesignWorkflowLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Design Your Workflow" }]} />{children}</>; }
