// d:\Physo\physiocare-plus\src\app\layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhysioCare Plus | Premium Physiotherapy & EMR Systems",
  description: "Experience premium clinical physical therapies, sports rehabilitation, manual manipulation, and personalized in-home recovery solutions.",
  keywords: ["Physiotherapy Clinic", "Sports Injury Rehab", "Dry Needling", "Manual Therapy", "Home Visit Physiotherapy", "EMR"],
  authors: [{ name: "PhysioCare Plus Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col background text-foreground bg-grid-pattern">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
