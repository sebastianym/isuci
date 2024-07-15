"use client";

import React, { useState } from "react";
import Principal from "@/components/panel/Principal";
import Dashboard from "@/components/panel/Dashboard";
function Panel() {
  return (
    <Dashboard>
      <Principal />
    </Dashboard>
  );
}

export default Panel;
