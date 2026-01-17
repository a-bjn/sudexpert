import Header from "@/components/header/header";
import "./globals.css";
import { Roboto, Bebas_Neue } from "next/font/google";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: ["400"],
});

export const metadata = {
  title: "Sudexpert - Electrozi și Sârmă de Sudură de Calitate Superioară",
  description: "Echipamente de sudură premium, electrozi și consumabile. Alese de profesioniști care caută excelență. Livrare rapidă în toată țara.",
  keywords: "electrozi, sârmă de sudură, echipamente sudură, consumabile sudură, Braila",
  icons: {
    icon: "/sudexpert-logo-icon.webp",
    apple: "/sudexpert-logo-icon.webp",
  },
  openGraph: {
    title: "Sudexpert - Electrozi și Sârmă de Sudură",
    description: "Echipamente de sudură premium pentru profesioniști",
    url: "https://sudexpertbraila.com",
    siteName: "Sudexpert",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${roboto.variable} ${bebasNeue.variable} antialiased`}>
        <CartProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
