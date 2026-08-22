import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "PoPP Community Events",
  "organizer": { "@type": "Organization", "name": "Proof of Problem Protocol" },
  "description": "Community meetups, hackathons, governance assemblies, and conference appearances.",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode"
};

export const metadata: Metadata = {
  title: "Events",
  description: "PoPP events — community meetups, hackathons, governance assemblies, and conference appearances. Join the global movement for decentralized truth validation.",
  keywords: ["PoPP events", "community meetups", "hackathons", "governance assemblies", "blockchain conferences"],
  alternates: { canonical: "/events" },
  openGraph: { title: "Events — PoPP", description: "Community meetups, hackathons, and governance assemblies.", url: "/events" },
  twitter: { title: "Events — PoPP", description: "Community meetups, hackathons, and governance assemblies." },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Events" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />{children}</>; }
