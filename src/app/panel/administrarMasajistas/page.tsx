"use client";

import React, { useState } from "react";
import AdminMasajista from "@/components/panel/AdminMasajistas";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarMasajistas() {
  return (
    <Dashboard>
      <AdminMasajista />
    </Dashboard>
  );
}

export default AdministrarMasajistas;
