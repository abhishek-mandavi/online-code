import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider
} from '@clerk/nextjs';

import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CODE-IT",
  description: "An online code editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body 
         className={`${geistSans.variable} ${geistMono.variable} antialiased
         min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
