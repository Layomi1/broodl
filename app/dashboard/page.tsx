"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import Login from "@/components/Login";

export default function DashboardPage() {
  const [isAutheticated, setIsAutheticated] = useState(true);

  let children = <Login />;

  if (isAutheticated) {
    children = <Dashboard />;
  }

  return <Main>{children}</Main>;
}
