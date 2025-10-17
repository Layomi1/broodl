import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "@/components/QueryProvider";
import { AuthProvider } from "@/context/auth-context";

const opensans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
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
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"} className="">
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
          Broodl
        </h1>
      </Link>
      <div className="flex items-center justify-between">PLACEHOLDER</div>
    </header>
  );
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
            {header}
            {children}
            {footer}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
