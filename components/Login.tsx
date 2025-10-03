"use client";

import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const handleSubmit = () => {};

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-3xl sm:text-4xl md:text-5xl ${fugaz.className}`}>
        Log In / Register
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-indigo-400"
        type="email"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-indigo-400"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] mx-auto w-full">
        <Button text="Submit" dark={false} full handleClick={handleSubmit} />
      </div>
    </div>
  );
}
