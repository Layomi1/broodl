"use client";

import { Fugaz_One } from "next/font/google";
import Button from "./Button";
// import Calendar from "./Calendar";

import { useRouter } from "next/navigation";
// import { demoData } from "@/utils/constants";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/dashboard");
  };

  const handleLogin = () => {
    router.push("/dashboard");
  };

  // function handleSetMood(
  //   mood: "&*@#$" | "Sad" | "Existing" | "Good" | "Elated"
  // ): void | Promise<void> {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 text-center">
      <h1 className={`text-5xl sm:text-6xl md:text-7xl ${fugaz.className}`}>
        <span className="textGradient">Broodl </span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl  md:text-2xl w-full mx-auto max-w-[600px]">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year</span>
      </p>
      <div className="grid grid-cols-2 gap-4  mx-auto">
        <Button
          text="Sign Up"
          dark={false}
          handleClick={handleSignup}
          full={false}
        />

        <Button text="Login" dark handleClick={handleLogin} full={false} />
      </div>
      {/* <Calendar completeData={demoData} demo /> */}
    </div>
  );
}
