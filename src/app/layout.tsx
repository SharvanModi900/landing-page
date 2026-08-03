import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ReduxProvider from "./Provider";
import { WalletProvider } from "@/lib/wallet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proof of Problem Protocol (PoPP) - Decentralized Truth Validation",
  description: "The protocol for verifiable, decentralized problem-solving and truth validation. Turn complaints into civilization's building blocks with PoPP.",
  keywords: [
    "Proof of Problem Protocol",
    "PoPP",
    "decentralized validation",
    "truth protocol",
    "problem solving",
    "blockchain governance",
    "DAO",
    "civic technology",
    "transparency",
    "accountability"
  ],
  authors: [{ name: "Proof of Problem Protocol Team" }],
  openGraph: {
    title: "Proof of Problem Protocol (PoPP)",
    description: "The protocol for verifiable, decentralized problem-solving and truth validation.",
    type: "website",
    url: "https://proofofproblem.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Problem Protocol (PoPP)",
    description: "The protocol for verifiable, decentralized problem-solving and truth validation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <Navigation />
          <ReduxProvider>
            {children}
          </ReduxProvider>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
