import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTok MY Beauty Picks",
  description: "TikTok Malaysia趋势彩妆选品平台",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className="h-full">
      <head>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <Script id="tw-config" strategy="beforeInteractive">{`
          tailwind.config = {
            theme: {
              extend: {}
            }
          }
        `}</Script>
      </head>
      <body className="min-h-full bg-[#fafaf9] text-[#1c1917] antialiased">
        {children}
      </body>
    </html>
  );
}
