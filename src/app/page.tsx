"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Login from "@/components/auth/Login";

function Home() {
  return (
    <main className="absolute top-0 z-[-2] w-full bg-bg-white-primary">
      <Login></Login>
    </main>
  );
}

export default Home;
