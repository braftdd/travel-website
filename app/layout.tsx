import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbis — Luxury Travel Experiences",
  description: "Curated luxury hotels, flights and packages in Thailand, UAE, America, Europe and the Maldives.",
  openGraph: {
    title: "Orbis — Luxury Travel Experiences",
    description: "Curated luxury hotels, flights and packages in Thailand, UAE, America, Europe and the Maldives.",
    images: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200&h=630&fit=crop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbis — Luxury Travel Experiences",
    description: "Curated luxury hotels, flights and packages in Thailand, UAE, America, Europe and the Maldives.",
    images: ["https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200&h=630&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-[#1B2D4F]`}>
        {children}
      </body>
    </html>
  );
}
