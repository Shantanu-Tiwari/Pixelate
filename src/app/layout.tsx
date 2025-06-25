import "~/styles/globals.css";

import { type Metadata } from "next";
import {Inter} from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Pixelate",
  description: "Draw",
  icons: [{ rel: "icon", url: "/img.png" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>{children}</body>
    </html>
  );
}
