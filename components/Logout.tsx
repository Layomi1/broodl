import { useAuth } from "@/context/auth-context";
import React from "react";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function Logout() {
  const { logout, currentUser } = useAuth();

  const pathname = usePathname();

  const handleLogout = async () => {
    await logout;
    window.location.href = "/login";
  };

  if (!currentUser || pathname === "/login") return;
  if (pathname === "/") {
    return (
      <Button
        text="Go to dashboard"
        dark={false}
        full={false}
        handleClick={() => (window.location.href = "/dashboard")}
      />
    );
  }
  return (
    <div>
      <Button
        text={"Logout"}
        dark={false}
        full={false}
        handleClick={handleLogout}
      />
    </div>
  );
}
