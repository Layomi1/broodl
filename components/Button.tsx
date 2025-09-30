"use client";

import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

type ButtonProps = {
  text: string;
  dark: boolean;
  handleClick: () => void;
};
export default function Button(props: ButtonProps) {
  const { text, dark = false, handleClick } = props;
  return (
    <button
      onClick={handleClick}
      className={`rounded-full  border-solid w-fit border-indigo-600 overflow-hidden border-2 duration-200 hover:opacity-60  ${
        dark ? "text-white bg-indigo-600" : "text-indigo-600"
      }`}
    >
      <p
        className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className}`}
      >
        {text}{" "}
      </p>
    </button>
  );
}
