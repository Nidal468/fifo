import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { config } from "@/config/key";
import { Nav } from "@/components/nav/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.title,
  description: config.titleFull,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={inter.className}>
          <Nav/>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
