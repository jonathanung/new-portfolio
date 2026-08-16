import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jonathan Ung | Systems & AI Infrastructure Engineer",
  description: "Jonathan Ung builds developer tools, real-time platforms, GPU pipelines, and production automotive software.",
  openGraph: {
    title: "Jonathan Ung | Systems & AI Infrastructure Engineer",
    description: "Developer tools, real-time platforms, GPU pipelines, and production automotive software.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jonathan Ung | Systems & AI Infrastructure Engineer",
    description: "Developer tools, real-time platforms, GPU pipelines, and production automotive software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
