"use client";

import React, { ReactNode } from "react";
import { FaUsers } from "react-icons/fa";
import { IoBicycle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiMountainRoad } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex h-screen">
      <div className="w-96 bg-gray-800 text-white flex flex-col">
        <div className="flex-grow">
          <p className="py-10 pl-8 text-4xl font-extrabold border-b-2 border-gray-900">
            ISUCI 🚵
          </p>
          <nav className="flex flex-col space-y-2">
            <div className="hover:bg-blue-700 py-6">
              <div className="flex items-center pl-8">
                <CgProfile size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Tu perfil
                </p>
              </div>
            </div>
            <div className="hover:bg-blue-700 py-6">
              <div className="flex items-center pl-8">
                <IoBicycle size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Simulación
                </p>
              </div>
            </div>
            <div className="hover:bg-blue-700 py-6">
              <div className="flex items-center pl-8">
                <FaUsers size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Crear tu escuadra
                </p>
              </div>
            </div>
            <div className="hover:bg-blue-700 py-6">
              <div className="flex items-center pl-8">
                <GiMountainRoad size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Crear carrera
                </p>
              </div>
            </div>
            <div className="hover:bg-blue-700 py-6">
              <div className="flex items-center pl-8">
                <FiUsers size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Administrar usuarios
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <header className="bg-gray-800 text-white p-9 flex justify-end items-center">
          <div className="flex items-center p-2 bg-red-500 rounded">
            <p className="mr-1 text-xl font-bold px-2 rounded-sm">
              Cerrar sesión
            </p>
          </div>
        </header>
        <main className="w-full h-full bg-bg-dark-secondary">{children}</main>
      </div>
    </div>
  );
}

export default Dashboard;
