"use client";

import React, { useState } from "react";
import AdminCiclistas from "@/components/panel/AdminCiclistas";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarCiclistas() {
  return (
    <Dashboard>
      <AdminCiclistas />
    </Dashboard>
  );
}

export default AdministrarCiclistas;
