import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ذا كابيتال سويتس - The Capital Suites",
  description:
    "خيارك المميز في المملكة العربية السعودية للضيافة المتميزة وإدارة الأصول الفندقية.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
      </body>
    </html>
  );
}
