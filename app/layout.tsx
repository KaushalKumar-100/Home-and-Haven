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
  title: {
    default: "Home & Haven | Beautiful Ideas for a Home You Love",
    template: "%s | Home & Haven",
  },

  description:
    "Discover beautiful home decor ideas, organization tips, cozy bedroom inspiration, kitchen finds, lighting ideas, and carefully selected products for a home you love.",

  keywords: [
    "home decor",
    "home decor ideas",
    "home organization",
    "bedroom ideas",
    "kitchen organization",
    "home lighting",
    "minimalist home",
    "cozy home",
    "home products",
    "interior inspiration",
  ],

  authors: [{ name: "Home & Haven" }],

  creator: "Home & Haven",

  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "Home & Haven | Beautiful Ideas for a Home You Love",

    description:
      "Beautiful home inspiration, practical organization ideas, and thoughtfully selected home finds.",

    siteName: "Home & Haven",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
