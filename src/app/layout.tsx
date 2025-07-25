import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Sudexpert Brăila - Servicii Profesionale de Sudură | 30+ Ani Experiență",
  description: "Sudexpert Brăila oferă servicii complete de sudură cu peste 30 ani experiență. Echipamente moderne, specialiști certificați, garanție completă. Contactați +40 724 207 132",
  keywords: "sudura Braila, servicii sudura, sudura profesionala, echipamente sudura, reparatii metalice, constructii metalice, sudura inox, sudura aluminiu, Braila",
  authors: [{ name: "Sudexpert Brăila" }],
  openGraph: {
    title: "Sudexpert Brăila - Servicii Profesionale de Sudură",
    description: "Peste 30 ani experiență în sudură. Servicii complete, echipamente moderne, specialiști certificați în Brăila.",
    url: "https://sudexpert.ro",
    siteName: "Sudexpert Brăila",
    images: [
      {
        url: "/welder.png",
        width: 1200,
        height: 630,
        alt: "Sudexpert Brăila - Servicii Sudură",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudexpert Brăila - Servicii Profesionale de Sudură",
    description: "Peste 30 ani experiență în sudură. Contactați +40 724 207 132",
    images: ["/welder.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sudexpert Brăila",
              "description": "Servicii profesionale de sudură cu peste 30 ani experiență în Brăila",
              "url": "https://sudexpert.ro",
              "telephone": "+40724207132",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Brăila",
                "addressCountry": "RO"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.2692",
                "longitude": "27.9574"
              },
              "openingHours": "Mo-Fr 08:00-18:00",
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "45.2692",
                  "longitude": "27.9574"
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicii de Sudură",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sudură Profesională",
                      "description": "Servicii complete de sudură pentru toate tipurile de proiecte"
                    }
                  }
                ]
              }
            })
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17382827871"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17382827871');
            `,
          }}
        />
      </head>
      <body
        className={`${nunito.className} antialiased bg-background text-foreground`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}