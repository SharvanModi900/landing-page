import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Exam",
  description: "PoPP Validator Certification Exam — demonstrate your understanding of protocol rules and validation procedures to become a certified network validator.",
  keywords: ["validator exam", "validator certification", "qualification exam", "validator test"],
  alternates: { canonical: "/validators/exam" },
};

export default function ValidatorsExamLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validators", href: "/validators" }, { label: "Exam" }]} />{children}</>; }
