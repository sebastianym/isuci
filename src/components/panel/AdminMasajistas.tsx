"use client";

import { useState, useEffect } from "react";
import { TypeMasajista } from "@/interfaces/Masajista";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";

function AdminMasajista() {
  const [masajistas, setMasajistas] = useState<TypeMasajista[]>([]);

  async function loadMasajistas() {
    try {
      const res = await fetch("/api/masajista");
      const data = await res.json();
      console.log(data);
      setMasajistas(data);
    } catch (error) {
      console.error("Error al obtener los masajistas", error);
    }
  }

  useEffect(() => {
    loadMasajistas();
  }, []);

  async function deleteMasajista(id: string) {
    try {
      const res = await fetch("/api/masajista/" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Error al eliminar el masajista");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleDeleteMasajista = async (id: string) => {
    const confirm = await confirmAlert(
      "¿Estás seguro de eliminar este masajista?",
      "Si el masajista pertenece a una escuadra, será eliminado de la misma y la escuadra podría ser inhabilitada para competir por falta de masajista."
    );

    if (confirm) {
      const result = await deleteMasajista(id);
      if (result) {
        successAlert(
          "Masajista eliminado",
          "El masajista ha sido eliminado correctamente"
        );
        loadMasajistas();
      } else {
        errorAlert(
          "Error al eliminar masajista",
          "No se ha podido eliminar el masajista"
        );
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black text-3xl">
        Administrar masajistas 💆
      </h2>
      <table className="w-full table-auto  bg-bg-dark-secondary rounded-lg shadow-md">
        <thead>
          <tr className="bg-neutral-950 text-white">
            <th className="p-4 text-xl">Nombre</th>
            <th className="p-4 text-xl">Cédula</th>
            <th className="p-4 text-xl">Escuadra</th>
            <th className="p-4 text-xl">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {masajistas.map((masajista) => (
            <tr key={masajista.id} className="text-center">
              <td className="p-4 border-b border-gray-100 text-black/80 font-semibold">
                {masajista.nombre}
              </td>
              <td className="p-4 border-b border-gray-100 text-black/80 font-semibold">
                {masajista.cedula}
              </td>
              <td className="p-4 border-b border-gray-100 text-black/80 font-semibold">
                {masajista.escuadraId ? "Sí" : "No"}
              </td>
              <td className="p-4 border-b border-gray-200">
                <button
                  onClick={() => handleDeleteMasajista(masajista.id.toString())}
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

export default AdminMasajista;
