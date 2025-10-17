"use client";

import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useState } from "react";
import Link from "next/link";

import { useLogin, useSignup } from "@/lib/hooks/auth";

const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [isAutheticating, setIsAutheticating] = useState<boolean>(false);

  const { mutate: signup } = useSignup({
    onSuccess(userCredential) {
      console.log("User logged in:", userCredential.user.email);
      setEmail("");
      setPassword("");
    },
    onError(msg, _err) {
      console.log(msg, _err);
    },
  });

  const { mutate: login } = useLogin({
    onSuccess(userCredential) {
      console.log("User logged in:", userCredential.user.email);
      setEmail("");
      setPassword("");
    },
  });

  const handleSubmit = async () => {
    if (!email || !password || password.length < 6) return;
    setIsAutheticating(true);
    try {
      if (isRegister) {
        console.log("Signing up new user");
        signup({ email, password });
      } else {
        console.log("Logging in existing User");
        login({ email, password });
      }
    } catch (error) {
      return { "Unable to register user": error };
    } finally {
      setIsAutheticating(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4 px-4 sm:px-0">
      <h3 className={`text-3xl sm:text-4xl md:text-5xl ${fugaz.className}`}>
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p>You&#39;re one step away!</p>

      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-indigo-400"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {!isRegister ? (
        ""
      ) : (
        <input
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-indigo-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      )}

      <div className="max-w-[400px] mx-auto w-full">
        <Button
          text={isAutheticating ? "Submitting" : "Submit"}
          dark={false}
          full
          handleClick={handleSubmit}
        />
      </div>

      <p className="text-center">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          href={""}
          onClick={() => setIsRegister((prev) => !prev)}
          className="text-indigo-600"
        >
          {isRegister ? "Login" : "Signup"}
        </Link>
      </p>
    </div>
  );
}
