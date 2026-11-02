import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HEMANATHAN R — Exploring the Unknown | 3D Interactive Portfolio",
  description:
    "Integrated M.Tech CSE student at VIT Vellore. Deep Learning, Computer Vision, and Distributed Web3 Systems. An immersive 3D digital ecosystem guided by a realistic animated jellyfish.",
  keywords: [
    "Hemanathan R",
    "VIT Vellore",
    "M.Tech CSE",
    "Machine Learning",
    "Computer Vision",
    "Three.js",
    "Next.js",
    "Web3",
    "Interactive 3D Portfolio"
  ],
  authors: [{ name: "Hemanathan R" }],
  creator: "Hemanathan R",
  openGraph: {
    title: "HEMANATHAN R — Exploring the Unknown",
    description: "An immersive 3D portfolio guided by a realistic responsive jellyfish.",
    type: "website",
    locale: "en_US"
  }
};

export const viewport: Viewport = {
  themeColor: "#010309",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        spaceGrotesk.variable,
        inter.variable,
        ibmPlexMono.variable,
        "font-sans"
      )}
    >
      <body className="bg-[#010309] text-white antialiased selection:bg-cyan-300/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
