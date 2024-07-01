"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/auth/Login";

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="absolute top-0 z-[-2] w-full bg-neutral-950">
      <Login></Login>
    </main>
  );
}

export default Home;
