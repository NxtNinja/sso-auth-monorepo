"use client";

import { useEffect, useState } from "react";
import LogoutBtn from "@/components/LogoutBtn";

export default function Page() {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
        console.log("Data from API:", data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{message}</h1>
        <LogoutBtn />
      </div>
    </div>
  );
}
