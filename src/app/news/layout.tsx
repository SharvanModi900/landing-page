import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "PoPP news — latest announcements, protocol updates, partnership news, and community highlights from the Proof of Problem Protocol ecosystem.",
  keywords: ["PoPP news", "protocol announcements", "partnership news", "community updates"],
  alternates: { canonical: "/news" },
};

const newsJsonLd = {"@context":"https://schema.org","@type":"CollectionPage","name":"News - PoPP","url":"https://pops.thharko.com/news","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function NewsLayout({ children }: { children: React.ReactNode }) { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }} />{children}</>; }
