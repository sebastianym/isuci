"use client";

import { useEffect } from "react";
import Register from "@/components/auth/Register";

function SignUp() {
  return (
    <main className="absolute top-0 z-[-2] w-full bg-neutral-950">
      <Register></Register>
    </main>
  );
}

export default SignUp;