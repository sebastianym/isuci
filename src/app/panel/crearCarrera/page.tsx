"use client";

import React, { useState } from "react";
import CreateCarrera from "@/components/panel/CrearCarrera";
import Dashboard from "@/components/panel/Dashboard";
function CrearCarrera() {
  return (
    <Dashboard>
      <CreateCarrera />
    </Dashboard>
  );
}

export default CrearCarrera;
