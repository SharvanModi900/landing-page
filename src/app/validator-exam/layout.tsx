import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Exam",
  description: "PoPP Validator Exam — test your knowledge of protocol rules, validation procedures, and governance principles to qualify as a network validator.",
  keywords: ["PoPP validator exam", "validator certification", "qualification test", "validator knowledge"],
  alternates: { canonical: "/validator-exam" },
};

export default function ValidatorExamLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Exam" }]} />{children}</>; }
