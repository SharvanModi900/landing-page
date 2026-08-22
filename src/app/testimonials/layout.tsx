import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read testimonials from the PoPP community — hear from validators, reporters, and contributors about their experience with decentralized problem validation and civic impact.",
  keywords: [
    "PoPP testimonials",
    "user stories",
    "community feedback",
    "validator experiences",
    "contributor stories",
    "civic tech reviews",
  ],
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Testimonials — PoPP",
    description:
      "Hear from PoPP community members about their experience with decentralized problem validation.",
    url: "/testimonials",
  },
  twitter: {
    title: "Testimonials — PoPP",
    description: "Community stories from validators, reporters, and contributors.",
  },
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@type": "Organization", "name": "Proof of Problem Protocol" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "author": { "@type": "Organization", "name": "PoPP Community" },
  "reviewBody": "Community testimonials from validators, reporters, and contributors about their experience with decentralized problem validation."
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      {children}
    </>
  );
}
