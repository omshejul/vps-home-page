import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureVPN - Global VPN Servers | Fast & Secure Connection",
  description:
    "Connect to high-speed VPN servers in India, USA, and Europe. Secure your internet with military-grade encryption, no-logs policy, and 24/7 support.",
  keywords:
    "VPN, secure internet, privacy, encryption, WireGuard, India VPN, USA VPN, EU VPN, fast VPN, secure connection",
  authors: [{ name: "SecureVPN" }],

  robots: "index, follow",
  openGraph: {
    title: "SecureVPN - Global VPN Servers",
    description:
      "Secure, fast VPN servers across India, USA, and Europe. Military-grade encryption with real-time server monitoring.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureVPN - Global VPN Servers",
    description:
      "Secure, fast VPN servers with real-time monitoring and military-grade encryption.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
