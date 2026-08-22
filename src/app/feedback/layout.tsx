import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share your feedback on PoPP — help us improve the protocol, suggest features, and report issues. Your input shapes the future of decentralized problem validation.",
  keywords: ["PoPP feedback", "suggest features", "report issues", "user feedback"],
  alternates: { canonical: "/feedback" },
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Feedback" }]} />{children}</>; }
