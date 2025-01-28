"use client";

import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const data = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      console.log("Data from API:", data.json());

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
