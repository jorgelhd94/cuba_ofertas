import type { Metadata } from "next";
import { Providers } from "./providers";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavbarHome from "@/components/home/navbar-home/navbar-home";
import NextTopLoader from 'nextjs-toploader';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPY-SM23",
  description: "Scraping Marketplace With JS and Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
      <NextTopLoader />
        <Providers>
          <NavbarHome />
          {children}
        </Providers>
      </body>
    </html>
  );
}
