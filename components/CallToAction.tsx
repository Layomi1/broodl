"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "@/context/auth-context";
export default function CallToAction() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleSignup = () => {
    router.push("/dashboard");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center">
      {currentUser ? (
        <div className="max-w-[700px] w-full mx-auto px-10">
          <Button
            text="Go to Dashboard"
            dark
            handleClick={handleDashboard}
            full
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mx-auto">
          <Button
            text="Sign Up"
            dark={false}
            handleClick={handleSignup}
            full={false}
          />

          <Button text="Login" dark handleClick={handleLogin} full={false} />
        </div>
      )}
    </div>
  );
}
