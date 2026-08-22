import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Profile",
  description: "PoPP Profile — view your reputation score, contribution history, validator status, and community achievements on the Proof of Problem Protocol.",
  keywords: ["PoPP profile", "reputation score", "contribution history", "user profile"],
  alternates: { canonical: "/profile" },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />{children}</>; }
