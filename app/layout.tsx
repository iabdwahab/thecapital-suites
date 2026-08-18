import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import { thamnyahFont } from "./fonts";
import "./globals.css";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/header/Header";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ذا كابيتال سويتس - The Capital Suites",
  description:
    "خيارك المميز في المملكة العربية السعودية للضيافة المتميزة وإدارة الأصول الفندقية.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${thamnyahFont.variable} h-full antialiased `}
    >
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="">
        <main className="relative">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
