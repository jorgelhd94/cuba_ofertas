import NavbarHome from "@/components/layout/NavbarMain/NavbarMain";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Providers } from "./providers";
import SideBarMain from "@/components/layout/SideBarMain/SideBarMain";

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
        <Providers>
          <div>
            <NavbarHome />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
