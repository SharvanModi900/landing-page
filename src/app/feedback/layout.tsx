import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share your feedback on PoPP — help us improve the protocol, suggest features, and report issues. Your input shapes the future of decentralized problem validation.",
  keywords: ["PoPP feedback", "suggest features", "report issues", "user feedback"],
  alternates: { canonical: "/feedback" },
};

const feedbackJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Feedback - PoPP","url":"https://pops.thharko.com/feedback","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Feedback" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(feedbackJsonLd) }} />{children}</>; }
