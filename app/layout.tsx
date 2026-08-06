import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VersionChecker } from "@/components/version-checker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPC — Open Projects & Collaboration",
  description: "AI-Powered Innovation & Collaboration Platform. From idea to product: Market Validation + Tech Collaboration + Crowdfunding.",
  keywords: ["OPC", "Open Projects", "Collaboration", "Vibecoding", "AI Startup", "Solo Founder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VersionChecker />
        {children}
      </body>
    </html>
  );
}
