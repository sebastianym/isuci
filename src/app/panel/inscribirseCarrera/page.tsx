"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import CreateCarrera from "@/components/panel/inscribirseCarrera";
import Dashboard from "@/components/panel/Dashboard";
function InscribirseCarrera() {
  return (
    <ProtectedRoute allowedRoles={["DIRECTOR_DEPORTIVO"]}>
      <Dashboard>
        <CreateCarrera />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default InscribirseCarrera;
