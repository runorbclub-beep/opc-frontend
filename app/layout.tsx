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
  title: "OPC 一人公司 - Open Problem & Collaboration",
  description: "OPC 单人创业启动清单与协同开发平台：从想法到产品的完整闭环，市场验证 + 技术协作 + 众筹支持。",
  keywords: ["OPC", "一人公司", "Vibecoding", "AI创业", "单人创业"],
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
