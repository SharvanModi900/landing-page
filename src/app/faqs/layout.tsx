import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about PoPP — answers about how the protocol works, how to report problems, become a validator, earn rewards, and participate in governance.",
  keywords: ["PoPP FAQs", "frequently asked questions", "how PoPP works", "report problems FAQ", "validator FAQ", "rewards FAQ"],
  alternates: { canonical: "/faqs" },
  openGraph: { title: "FAQs — PoPP", description: "Answers about how PoPP works, reporting problems, becoming a validator, and earning rewards.", url: "/faqs" },
  twitter: { title: "FAQs — PoPP", description: "Answers about how PoPP works, reporting, validating, and earning rewards." },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is PoPP?", "acceptedAnswer": { "@type": "Answer", "text": "PoPP (Proof of Problem Protocol) is a decentralized protocol for verifying, validating, and escalating real-world problems with cryptographic evidence and community governance." } },
    { "@type": "Question", "name": "How do I report a problem?", "acceptedAnswer": { "@type": "Answer", "text": "Visit the Report page, provide details about the problem along with photo/video evidence and location data, and submit a problem ticket." } },
    { "@type": "Question", "name": "How do I become a validator?", "acceptedAnswer": { "@type": "Answer", "text": "Visit the Validators page to learn about staking requirements, pass the validator exam, and begin verifying problem reports in your area." } },
    { "@type": "Question", "name": "What rewards can I earn?", "acceptedAnswer": { "@type": "Answer", "text": "Contributors earn SAT MUDRA tokens when their problem reports or validations are verified by the community and pass AI + human validation." } },
    { "@type": "Question", "name": "Is PoPP open source?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, PoPP is fully open source. All code is available on GitHub for anyone to review, contribute, or build upon." } }
  ]
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      {children}
    </>
  );
}
