import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Manage your cookie preferences on the Proof of Problem Protocol website.",
};

const cookiesJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Cookie Policy - PoPP","url":"https://pops.thharko.com/cookies","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesJsonLd) }} />{children}</>;
}
