import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "View the PoPP leaderboard — see top validators, reporters, and contributors ranked by reputation score, problem verifications, and community impact.",
  keywords: [
    "PoPP leaderboard",
    "top validators",
    "contributor rankings",
    "reputation score",
    "community leaders",
    "PoPP rankings",
  ],
  alternates: { canonical: "/leaderboard" },
  openGraph: {
    title: "Leaderboard — PoPP",
    description:
      "See top validators, reporters, and contributors ranked by reputation and community impact.",
    url: "/leaderboard",
  },
  twitter: {
    title: "Leaderboard — PoPP",
    description: "Top validators and contributors ranked by reputation and community impact.",
  },
};

const leaderboardJsonLd = {"@context":"https://schema.org","@type":"ItemList","name":"Leaderboard - PoPP","url":"https://pops.thharko.com/leaderboard","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Leaderboard" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(leaderboardJsonLd) }} />{children}</>;
}
