import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsappButton from "../components/buttons/whatsapp";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://co-work-in.vercel.app"),
  title: "CoWorkIn | Coworking spaces, Virtual spaces and Enterprises solutions",
  description: "Premium shared environments and private suites optimized for scaling builders and deep focus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <WhatsappButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
