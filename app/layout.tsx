import type { Metadata } from "next";
import { Alexandria, Geist } from "next/font/google";
import { thamnyahFont } from "./fonts";
import "./globals.css";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/header/Header";
import NextTopLoader from "nextjs-toploader";

import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import WhatsAppLink from "@/components/global/WhatsAppLink";
import StudyRequestLink from "@/components/global/StudyRequestLink";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
  openGraph: {
    title: "ذا كابيتال سويتس - The Capital Suites",
    description:
      "خيارك المميز في المملكة العربية السعودية للضيافة المتميزة وإدارة الأصول الفندقية.",
    images: [
      {
        url: "https://thecapitalsuites.sa/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Capital Suites",
      },
    ],
    url: "https://thecapitalsuites.sa",
    siteName: "The Capital Suites",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ذا كابيتال سويتس - The Capital Suites",
    description:
      "خيارك المميز في المملكة العربية السعودية للضيافة المتميزة وإدارة الأصول الفندقية.",
    images: ["https://thecapitalsuites.sa/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cn(
        "h-full",
        "antialiased",
        alexandria.variable,
        thamnyahFont.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="">
        <NextTopLoader color="#fff" />
        <main className="relative">
          <ToastContainer />
          <Header />
          {children}
          <StudyRequestLink />
          <WhatsAppLink />
          <Footer />
        </main>
      </body>
    </html>
  );
}
