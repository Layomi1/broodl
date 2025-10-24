"use client";

import Button from "@/components/Button";
import { useState } from "react";
import Link from "next/link";

import { useLogin, useSignup } from "@/lib/hooks/auth";
import { fugaz } from "@/utils/constants";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isAutheticating, setIsAutheticating] = useState<boolean>(false);

  function validateAndSanitizeInputs(email: string, password: string) {
    if (!email || !password) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      return null;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidEmail = emailRegex.test(trimmedEmail);
    const isValidPassword = passwordRegex.test(trimmedPassword);

    if (!isValidEmail) {
      setEmailError("Invalid email format");
      return null;
    }
    if (!isValidPassword) {
      setPasswordError(
        "Password must be at least 8 chars, include upper/lowercase, number, and special char"
      );
      return null;
    }
    return {
      email: trimmedEmail.toLowerCase(),
      password: trimmedPassword,
    };
  }

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
    const validated = validateAndSanitizeInputs(email, password);
    if (!validated) return;

    setIsAutheticating(true);
    try {
      if (isRegister) {
        signup(validated);
      } else {
        login(validated);
        console.log("logged");
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
      {emailError && (
        <p className="text-red-500 text-sm -mt-[15px]  max-w-[400px] w-full text-left">
          {emailError}
        </p>
      )}

      <>
        <input
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-indigo-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {passwordError && (
          <p className="text-red-500 text-sm -mt-[15px] max-w-[400px] w-full text-left">
            {passwordError}
          </p>
        )}
      </>

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
