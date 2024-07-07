"use client";

import React, { useState } from "react";
import AdminUsers from "@/components/panel/AdminUsers";
import Dashboard from "@/components/panel/Dashboard";
function AdministrarUsuarios() {
  return (
    <Dashboard>
      <AdminUsers />
    </Dashboard>
  );
}

export default AdministrarUsuarios;
