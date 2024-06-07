import "./globals.css";

// Supports weights 100-900
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/red-hat-display/700.css";

import type { Metadata } from "next";
import Head from "next/head";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "BookWave",
  description: "Create A Functional E-book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Head>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
