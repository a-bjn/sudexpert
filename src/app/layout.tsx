import type { Metadata } from "next";
import { Ubuntu } from '@next/font/google';
import "./globals.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const ubuntu = Ubuntu({
  subsets: ['latin'], // Use appropriate subsets (e.g., 'latin')
  weight: ['400', '700'], // Specify font weights
  variable: '--font-ubuntu', // Optional: Define a CSS variable
});

export const metadata: Metadata = {
  title: "Sudexpert - Mobile First",
  description: "A mobile-first website for Sudexpert built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${ubuntu.variable} ${ubuntu.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
