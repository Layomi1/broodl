"use client";

import Link from "next/link";

import { fugaz } from "@/utils/constants";
import Logout from "./Logout";

export default function Header() {
  return (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"} className="">
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
          Broodl
        </h1>
      </Link>
      <Logout />
    </header>
  );
}
