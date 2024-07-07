"use client";

import { useState, useEffect } from "react";
import { TypeCiclista } from "@/interfaces/Ciclista";
import { confirmAlert } from "@/libs/functions/popUpAlert";

function RegisterTeam() {
  const [ciclistas, setCiclistas] = useState<TypeCiclista[]>([]);

  async function loadCiclistas() {
    try {
      const res = await fetch("/api/ciclista");
      const data = await res.json();
      console.log(data);
      setCiclistas(data);
    } catch (error) {
      console.error("Error al obtener los ciclistas", error);
    }
  }

  useEffect(() => {
    loadCiclistas();
    console.log(ciclistas);
  }, []);

  return (
    <div className="p-10">
      <table className="w-full table-auto  bg-bg-dark-secondary rounded-lg shadow-md">
        <thead>
          <tr className="bg-neutral-950 text-white">
            <th className="p-4 text-xl">Nombre</th>
            <th className="p-4 text-xl">Cédula</th>
            <th className="p-4 text-xl">Especialidad</th>
            <th className="p-4 text-xl">Contextura</th>
            <th className="p-4 text-xl">Escuadra</th>
            <th className="p-4 text-xl">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ciclistas.map((ciclista) => (
            <tr key={ciclista.id} className="text-center">
              <td className="p-4 border-b border-gray-100 text-white/80 font-semibold">
                {ciclista.nombre}
              </td>
              <td className="p-4 border-b border-gray-100 text-white/80 font-semibold">
                {ciclista.cedula}
              </td>
              <td className="p-4 border-b border-gray-100 text-white/80 font-semibold">
                {ciclista.especialidad}
              </td>
              <td className="p-4 border-b border-gray-100 text-white/80 font-semibold">
                {ciclista.contextura}
              </td>
              <td className="p-4 border-b border-gray-100 text-white/80 font-semibold">
                {ciclista.escuadraId ? "Sí" : "No"}
              </td>
              <td className="p-4 border-b border-gray-200">
                <button
                  onClick={() => confirmAlert("¿Estás seguro de eliminar este ciclista?", "Si el ciclista pertenece a una escuadra, será eliminado de la misma y la escuadra podría ser inhabilitada para competir por falta de ciclistas.", "Ciclista eliminado", "El ciclista ha sido eliminado correctamente", "Error al eliminar ciclista", "No se ha podido eliminar el ciclista")}
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisterTeam;
