import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsappButton from "../components/buttons/whatsapp";
import LenisProvider from "../components/layout/lenisprovider";
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
  title: {
    default: "CoWorkIn | Coworking spaces and Enterprises solutions",
    template: "%s | CoWorkIn",
  },
  description: "Premium shared environments and private suites optimized for scaling builders and deep focus.",
  keywords: [
    "coworking space",
    "virtual office jaipur",
    "private office",
    "meeting rooms",
    "shared office space",
    "flexible workspace",
    "enterprise solutions",
    "coworking jaipur",
    "office for rent jaipur",
    "CoWorkIn Jaipur"
  ],
  authors: [{ name: "CoWorkIn Space Solutions", url: "https://co-work-in.vercel.app" }],
  creator: "CoWorkIn",
  publisher: "CoWorkIn",
  openGraph: {
    title: "CoWorkIn | Coworking spaces, Virtual spaces and Enterprises solutions",
    description: "Premium shared environments and private suites optimized for scaling builders and deep focus.",
    url: "https://co-work-in.vercel.app",
    siteName: "CoWorkIn",
    images: [
      {
        url: "/images/CoWorkIn.png",
        width: 1200,
        height: 630,
        alt: "CoWorkIn Premium Shared Environments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoWorkIn | Premium Shared Workspace Solutions",
    description: "Premium shared environments and private suites optimized for scaling builders and deep focus.",
    images: ["/images/CoWorkIn.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
        <WhatsappButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
