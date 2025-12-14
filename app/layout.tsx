import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer"; // 💡 เพิ่ม import นี้
const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});
const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});
export const metadata: Metadata = {
title: "Spotify Clone",
description: "A music streaming clone powered by Next.js and Prisma",
};
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body className={${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50}>
<div className="flex h-screen flex-col">
{/* Main Content Area (Sidebar + Children Pages) */}
<div className="flex flex-1">
<Sidebar />
<main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-zinc-900">
{children}
</main>
</div>
{/* Music Player Footer (แก้ไขตรงนี้) */}
<footer className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-800 border-t border-zinc-700 z-50">
<MusicPlayer />
</footer>
</div>
</body>
</html>
);
}