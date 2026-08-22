import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Exam",
  description: "PoPP Validator Exam — test your knowledge of protocol rules, validation procedures, and governance principles to qualify as a network validator.",
  keywords: ["PoPP validator exam", "validator certification", "qualification test", "validator knowledge"],
  alternates: { canonical: "/validator-exam" },
};

const validatorexamJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Validator Exam - PoPP","url":"https://pops.thharko.com/validator-exam","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorExamLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Exam" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatorexamJsonLd) }} />{children}</>; }
