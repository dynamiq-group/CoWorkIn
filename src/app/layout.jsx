import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsappButton from "../components/buttons/whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoWorkIn | Coworking spaces, Virtual spaces and Enterprises solutions",
  description: "Premium shared environments and private suites optimized for scaling builders and deep focus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
