"use client";

import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const data = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button size="sm" variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
