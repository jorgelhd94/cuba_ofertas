import type { Metadata } from "next";
import { Providers } from "./providers";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavbarHome from "@/components/home/navbar-home/navbar-home";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Scraping",
  description: "Scraping Marketplaces With JS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Providers>
          <NavbarHome />
          {children}
        </Providers>
      </body>
    </html>
  );
}
