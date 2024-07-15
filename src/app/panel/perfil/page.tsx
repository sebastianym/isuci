"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import Perfil from "@/components/panel/Perfil";
import Dashboard from "@/components/panel/Dashboard";
function inscribirseCarrera() {
  return (
    <ProtectedRoute allowedRoles={["DIRECTOR_DEPORTIVO", "CICLISTA", "MASAJISTA"]}>
      <Dashboard>
        <Perfil />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default inscribirseCarrera;
