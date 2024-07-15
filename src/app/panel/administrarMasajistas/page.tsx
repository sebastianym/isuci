"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import AdminMasajista from "@/components/panel/AdminMasajistas";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarMasajistas() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard>
        <AdminMasajista />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default AdministrarMasajistas;
