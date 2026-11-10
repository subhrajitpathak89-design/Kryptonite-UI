import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// Body font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Fallback for the heading font (Calendas Plus) until its files are in public/fonts
const instrumentSerif = Instrument_Serif({
  variable: "--font-heading-fallback",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kryptonite UI",
  description: "Modern, animated React + Tailwind components you can copy into your project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark scroll-smooth ${poppins.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
