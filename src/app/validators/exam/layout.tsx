import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Exam",
  description: "PoPP Validator Certification Exam — demonstrate your understanding of protocol rules and validation procedures to become a certified network validator.",
  keywords: ["validator exam", "validator certification", "qualification exam", "validator test"],
  alternates: { canonical: "/validators/exam" },
};

const validatorsexamJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Validator Exam - PoPP","url":"https://pops.thharko.com/validators/exam","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorsExamLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validators", href: "/validators" }, { label: "Exam" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatorsexamJsonLd) }} />{children}</>; }
