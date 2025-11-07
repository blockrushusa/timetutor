import "~/styles/globals.css";

import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Time Tutor",
  description:
    "Practice reading and converting 24-hour time with an interactive quiz that keeps score and cheers you on.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
