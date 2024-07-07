"use client";

import React, { useState } from "react";
import AdminDirectores from "@/components/panel/AdminDirectores";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarDirectores() {
  return (
    <Dashboard>
      <AdminDirectores />
    </Dashboard>
  );
}

export default AdministrarDirectores;
