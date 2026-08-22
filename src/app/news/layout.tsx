import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "PoPP news — latest announcements, protocol updates, partnership news, and community highlights from the Proof of Problem Protocol ecosystem.",
  keywords: ["PoPP news", "protocol announcements", "partnership news", "community updates"],
  alternates: { canonical: "/news" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
