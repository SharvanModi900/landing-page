import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "NFT Viewer",
  description: "PoPP NFT Viewer — view and manage problem verification NFTs, achievement badges, and collectible proof-of-contribution tokens.",
  keywords: ["PoPP NFT", "verification NFTs", "achievement badges", "proof-of-contribution"],
  alternates: { canonical: "/nft-viewer" },
};

const nftviewerJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"NFT Viewer - PoPP","url":"https://pops.thharko.com/nft-viewer","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function NftViewerLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "NFT Viewer" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nftviewerJsonLd) }} />{children}</>; }
