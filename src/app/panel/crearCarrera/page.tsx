"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import CreateCarrera from "@/components/panel/CrearCarrera";
import Dashboard from "@/components/panel/Dashboard";
function CrearCarrera() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard>
        <CreateCarrera />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default CrearCarrera;
