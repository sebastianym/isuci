"use client";
import { GiMountainRoad } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TypeCarrera } from "@/interfaces/Carrera";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";
import CardCarrera from "@/components/cards/CardCarreraInscribirse";

function InscribirseCarrera() {
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

  async function inscribirse(escuadraId: string, carreraId: string) {
    const res = await fetch("/api/carreraEscuadra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        escuadraId,
        carreraId,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  const handleIncribirseCarrera = async (escuadraId: string, carreraId: string) => {
    const confirm = await confirmAlert(
      "¿Estás seguro de inscribirte a esta carrera?",
      "Si te inscribes, no podrás deshacer esta acción"
    );

    if (confirm) {
      const result = await inscribirse(escuadraId, carreraId);
      if (result) {
        successAlert(
          "Inscripción correcta",
          "Tu escuadra se ha inscrito correctamente a la carrera"
        );
        loadCarreras();
      } else {
        errorAlert(
          "Error al inscribirte a la carrera",
          "No se ha podido inscribir la escuadra a la carrera"
        );
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black text-3xl">
        Inscripción carreras 🏁
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carreras
          .filter((carrera) => carrera.disponible === "SI") // Filtrar carreras habilitadas
          .map((carrera) => (
            <CardCarrera
              key={carrera.id}
              nombre={carrera.nombre}
              tipoCarrera={carrera.tipoEtapa}
              icon={<GiMountainRoad size="30px" style={{ color: "white" }} />}
              onAdd={() => {
                handleIncribirseCarrera("1",carrera.id.toString());
                loadCarreras();
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default InscribirseCarrera;
