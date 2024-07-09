"use client";

import { useState, useEffect } from "react";
import { TypeDirector } from "@/interfaces/DirectorDeportivo";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";

function AdminDirectores() {
  const [directores, setDirectores] = useState<TypeDirector[]>([]);

  async function loadDirectores() {
    try {
      const res = await fetch("/api/directorDeportivo");
      const data = await res.json();
      console.log(data);
      setDirectores(data);
    } catch (error) {
      console.error("Error al obtener los directores deportivos", error);
    }
  }

  useEffect(() => {
    loadDirectores();
    console.log(directores);
  }, []);

  async function deleteDirector(id: string) {
    try {
      const res = await fetch("/api/directorDeportivo/" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Error al eliminar el director");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleDeleteDirector = async (id: string) => {
    const confirm = await confirmAlert(
      "¿Estás seguro de eliminar este director?",
      "Si el director pertenece a una escuadra, la escuadra podrá ser eliminada y todos los datos de la misma se perderán."
    );

    if (confirm) {
      const result = await deleteDirector(id);
      if (result) {
        successAlert(
          "Director eliminado",
          "El director ha sido eliminado correctamente"
        );
        loadDirectores();
      } else {
        errorAlert(
          "Error al eliminar director",
          "No se ha podido eliminar el director"
        );
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black dark:text-white text-3xl">
        Administrar directores deportivos 👨‍💼
      </h2>
      <table className="w-full table-auto bg-secondary-blue dark:bg-bg-dark-secondary rounded-lg shadow-md">
        <thead>
          <tr className="bg-back-back dark:bg-neutral-950 text-black/200 dark:text-white">
            <th className="p-4 text-xl">Nombre</th>
            <th className="p-4 text-xl">Cédula</th>
            <th className="p-4 text-xl">Escuadra</th>
            <th className="p-4 text-xl">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director.id} className="text-center">
              <td className="p-4 border-b border-black dark:border-gray-100 text-black/80 dark:text-white/80 font-semibold">
                {director.nombre}
              </td>
              <td className="p-4 border-b border-black dark:border-gray-100 text-black/80 dark:text-white/80 font-semibold">
                {director.cedula}
              </td>
              <td className="p-4 border-b border-black dark:border-gray-100 text-black/80 dark:text-white/80 font-semibold">
                {director.escuadraId ? "Sí" : "No"}
              </td>
              <td className="p-4 border-b border-black dark:border-gray-200">
                <button
                  onClick={() => handleDeleteDirector(director.id.toString())}
                  className="bg-red-500 text-black dark:text-white font-semibold px-4 py-2 rounded hover:bg-red-700"
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

export default AdminDirectores;
