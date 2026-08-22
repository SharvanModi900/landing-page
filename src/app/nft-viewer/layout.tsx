import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "NFT Viewer",
  description: "PoPP NFT Viewer — view and manage problem verification NFTs, achievement badges, and collectible proof-of-contribution tokens.",
  keywords: ["PoPP NFT", "verification NFTs", "achievement badges", "proof-of-contribution"],
  alternates: { canonical: "/nft-viewer" },
};

export default function NftViewerLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "NFT Viewer" }]} />{children}</>; }
