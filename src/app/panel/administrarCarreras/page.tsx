"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import CreateCarrera from "@/components/panel/AdminCarreras";
import Dashboard from "@/components/panel/Dashboard";
function administrarCarreras() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Dashboard>
        <CreateCarrera />
      </Dashboard>
    </ProtectedRoute>
  );
}

export default administrarCarreras;
