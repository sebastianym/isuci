"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import VerEscuadraInfo from "@/components/panel/VerEscuadra";
import Dashboard from "@/components/panel/Dashboard";
function verEscuadra() {
  return (
    <ProtectedRoute allowedRoles={["DIRECTOR_DEPORTIVO"]}>
      <Dashboard>
        <VerEscuadraInfo />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default verEscuadra;
