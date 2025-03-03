"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import AdminCiclistas from "@/components/panel/AdminCiclistas";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarCiclistas() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard>
        <AdminCiclistas />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default AdministrarCiclistas;
