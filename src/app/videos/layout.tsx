import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Videos",
  description: "PoPP video library — watch protocol tutorials, community presentations, demo walkthroughs, and conference talks about decentralized problem validation.",
  keywords: ["PoPP videos", "protocol tutorials", "demo walkthroughs", "conference talks", "video tutorials"],
  alternates: { canonical: "/videos" },
  openGraph: { title: "Videos — PoPP", description: "Watch PoPP tutorials, demos, and conference presentations.", url: "/videos" },
  twitter: { title: "Videos — PoPP", description: "Watch PoPP tutorials, demos, and conference presentations." },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Videos" }]} />{children}</>; }
