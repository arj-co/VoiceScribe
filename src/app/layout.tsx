import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceScribe — A Practice Space for Your Voice",
  description:
    "A real-time speech coaching tool for anyone who wants to speak with more confidence. Practice interviews, presentations, or everyday speaking — and track your improvement over time.",
  keywords: [
    "speech therapy",
    "public speaking",
    "dysfluency",
    "speech practice",
    "voice coaching",
  ],
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=IBM+Plex+Mono:ital,wght@0,500;0,600;0,700;1,500;1,600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
