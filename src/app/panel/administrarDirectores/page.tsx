"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import AdminDirectores from "@/components/panel/AdminDirectores";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarDirectores() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard>
        <AdminDirectores />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default AdministrarDirectores;
