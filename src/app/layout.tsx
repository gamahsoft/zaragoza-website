import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrototypeBanner } from "@/components/prototype-banner";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zaragoza.example"),
  title: { default: "Zaragoza Restaurant & Bar | Houston, Texas", template: "%s | Zaragoza Restaurant & Bar" },
  description: "Preview Zaragoza Restaurant & Bar, a Spanish-inspired restaurant and bar concept for Houston, Texas.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#071b2b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <div id="top" className="top-target" tabIndex={-1} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <PrototypeBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
