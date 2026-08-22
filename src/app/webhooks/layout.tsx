import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "PoPP webhooks — subscribe to real-time event notifications for problem submissions, validations, governance votes, and reward distributions via configurable webhook endpoints.",
  keywords: ["PoPP webhooks", "event notifications", "real-time events", "webhook integration", "protocol events"],
  alternates: { canonical: "/webhooks" },
  openGraph: { title: "Webhooks — PoPP", description: "Subscribe to real-time PoPP protocol events via configurable webhooks.", url: "/webhooks" },
  twitter: { title: "Webhooks — PoPP", description: "Subscribe to real-time PoPP protocol events via webhooks." },
};

export default function WebhooksLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Webhooks" }]} />{children}</>; }
