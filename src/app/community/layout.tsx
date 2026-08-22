import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the PoPP community — connect with validators, reporters, and governance participants. Access Discord, forums, events, and contributor resources to help build decentralized truth validation.",
  keywords: [
    "PoPP community",
    "join community",
    "civic contributors",
    "PoPP Discord",
    "community governance",
    "open source community",
  ],
  alternates: { canonical: "/community" },
  openGraph: {
    title: "Community — PoPP",
    description:
      "Join the PoPP community — connect with validators, reporters, and governance participants.",
    url: "/community",
  },
  twitter: {
    title: "Community — PoPP",
    description: "Join the PoPP community — connect with validators, reporters, and contributors.",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Community" }]} />{children}</>;
}
