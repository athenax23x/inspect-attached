import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const body = Archivo({ variable: "--font-body", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dirtdawn.solutions"),
  title: { default: "Dirt and Dawn — Premium Trail Running", template: "%s · Dirt and Dawn" },
  description: "Premium running and trail running apparel, equipment and accessories. Find Your Ground. Chase Your Dawn.",
  openGraph: {
    type: "website",
    siteName: "Dirt and Dawn",
    url: "https://dirtdawn.solutions",
    title: "Dirt and Dawn — Premium Trail Running",
    description: "Premium running and trail running apparel, equipment and accessories. Find Your Ground. Chase Your Dawn.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
        <StoreProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
