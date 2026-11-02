import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
  themeColor: "#000000",
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
    <html lang="en" className={cn("dark font-sans", geistSans.variable, geistMono.variable)}>
      <body className="bg-black text-white antialiased selection:bg-[#333345] selection:text-white overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
