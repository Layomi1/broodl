import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/components/QueryProvider";
import { AuthProvider } from "@/context/auth-context";
import Header from "@/components/Header";
import { fugaz } from "@/utils/constants";

const opensans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Broodl",
  description: "Tracking your daily mood everyday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p
        className={`text-indigo-500  
            ${fugaz.className}`}
      >
        Built by Layomi 💛
      </p>
    </footer>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800
          ${opensans.className}`}
      >
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
            {footer}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
