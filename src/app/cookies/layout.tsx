import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Manage your cookie preferences on the Proof of Problem Protocol website.",
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
