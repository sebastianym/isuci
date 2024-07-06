"use client";

import React, { useState } from "react";
import RegisterTeam from "@/components/auth/RegisterTeam";
import Dashboard from "@/components/panel/Dashboard";
function Panel() {
  return (
    <Dashboard>
      <RegisterTeam />
    </Dashboard>
  );
}

export default Panel;
