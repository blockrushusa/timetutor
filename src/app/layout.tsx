import "~/styles/globals.css";

import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";

const siteUrl = "https://timetutor.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Time Tutor | 24-hour & Timezone Conversion Quiz",
    template: "%s | Time Tutor",
  },
  description:
    "Sharpen your ability to switch between 24-hour and 12-hour clocks and translate meetings across time zones with Time Tutor’s responsive quiz, sound cues, and customizable skins.",
  keywords: [
    "time tutor",
    "24 hour clock",
    "12 hour clock",
    "military time converter",
    "time conversion quiz",
    "learn to tell time",
    "next.js education app",
    "timezone converter",
    "world clock quiz",
    "new york to london time",
  ],
  authors: [{ name: "blockrush" }],
  openGraph: {
    title: "Time Tutor | 24-hour & Timezone Conversion Quiz",
    description:
      "Practice turning 24-hour clocks into their 12-hour counterparts, translate times between world cities, and personalize the look with 12 vivid skins.",
    url: siteUrl,
    siteName: "Time Tutor",
    images: [
      {
        url: `${siteUrl}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Time Tutor quiz preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blockrush",
    title: "Time Tutor | Convert 24-hour & Timezones",
    description:
      "Interactive quiz for practicing 24h ➜ 12h time conversions and timezone shifts with scoring, sounds, and theme skins.",
    images: [`${siteUrl}/og-cover.png`],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
