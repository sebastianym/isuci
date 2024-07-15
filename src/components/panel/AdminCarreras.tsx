"use client";
import { GiMountainRoad } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TypeCarrera } from "@/interfaces/Carrera";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";
import CardCarrera from "@/components/cards/cardCarreraDelete";

function AdminCarreras() {
  const [carreras, setCarreras] = useState<TypeCarrera[]>([]);

  async function loadCarreras() {
    try {
      const res = await fetch("/api/carrera");
      const data = await res.json();
      console.log(data);
      setCarreras(data);
    } catch (error) {
      console.error("Error al obtener las carreras", error);
    }
  }

  useEffect(() => {
    loadCarreras();
  }, []);

  async function deleteCarrera(id: string) {
    try {
      const res = await fetch("/api/carrera/" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Error al eliminar la carrera");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleDeleteCarrera = async (id: string) => {
    const confirm = await confirmAlert(
      "¿Estás seguro de eliminar esta carrera?",
      "Si la carrera se elimina, no se podrá recuperar"
    );

    if (confirm) {
      const result = await deleteCarrera(id);
      if (result) {
        successAlert(
          "Carrera eliminada",
          "La carrera ha sido eliminado correctamente"
        );
        loadCarreras();
      } else {
        errorAlert(
          "Error al eliminar la carrera",
          "No se ha podido eliminar la carrera"
        );
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black text-3xl">
        Administrar carreras 🏁
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carreras.map((carrera) => (
          <CardCarrera
            key={carrera.id}
            nombre={carrera.nombre}
            tipoCarrera={carrera.tipoEtapa}
            icon={<GiMountainRoad size="30px" style={{ color: "white" }} />}
            onDelete={() => {
              handleDeleteCarrera(carrera.id.toString());
              loadCarreras();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminCarreras;
