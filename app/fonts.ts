import localFont from "next/font/local";

export const thamnyahFont = localFont({
  src: [
    {
      path: "./fonts/thmanyahserifdisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-thamnyah",
});
