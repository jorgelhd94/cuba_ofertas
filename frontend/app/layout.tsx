import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Providers } from "./providers";
import ScrollToTopButton from "@/components/shared/buttons/ScrollToTopButton";
import ScrollToTop from "@/components/shared/utils/ScrollToTop";

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
        <ToastContainer />
        <Providers>{children}</Providers>

        <ScrollToTopButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
