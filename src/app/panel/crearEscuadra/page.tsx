"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import RegisterTeam from "@/components/auth/RegisterTeam";
import Dashboard from "@/components/panel/Dashboard";
function Panel() {
  return (
    <ProtectedRoute allowedRoles={["DIRECTOR_DEPORTIVO"]}>
      <Dashboard>
        <RegisterTeam />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default Panel;
