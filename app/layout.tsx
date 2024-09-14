import type {Metadata} from "next";
import "./globals.css";
import {IBM_Plex_Sans} from "next/font/google"; // Add this import
import {cn} from "@/lib/utils";

import {ClerkProvider} from "@clerk/nextjs";

const IBM_Plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI powered image generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{variables: {colorPrimary: "#624cf5"}}}>
      <html lang="en">
        <body className={cn("font-IBM_Plex antialiased", IBM_Plex.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
