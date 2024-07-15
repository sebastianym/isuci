"use client";

import { useEffect } from "react";
import Register from "@/components/auth/Register";

function SignUp() {
  return (
    <main className="absolute top-0 z-[-2] w-full bg-bg-white-primary">
      <Register></Register>
    </main>
  );
}

export default SignUp;