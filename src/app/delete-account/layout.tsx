import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Delete your PoPP account — instructions and process for permanently removing your account and associated data from the Proof of Problem Protocol.",
  keywords: ["delete account", "remove account", "account deletion", "data removal"],
  alternates: { canonical: "/delete-account" },
  robots: { index: false, follow: false },
};

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Delete Account" }]} />{children}</>; }
