"use client";
import { GiMountainRoad } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TypeCarrera } from "@/interfaces/Carrera";
import { TypeDirector } from "@/interfaces/DirectorDeportivo";
import { useSession } from "next-auth/react";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";
import CardCarrera from "@/components/cards/CardCarreraInscribirse";

function InscribirseCarrera() {
  const [carreras, setCarreras] = useState<TypeCarrera[]>([]);
  const [escuadraId, setEscuadraId] = useState<number | null>(null);
  const { data: session, status } = useSession();

  async function loadCarreras() {
    try {
      const res = await fetch("/api/carrera");
      const data = await res.json();
      setCarreras(data);
    } catch (error) {
      console.error("Error al obtener las carreras", error);
    }
  }

  async function loadPerfil() {
    if (!session) return;
    try {
      const res = await fetch(`/api/directorDeportivo/${session.user.id}`);
      const data: TypeDirector = await res.json();
      setEscuadraId(data.escuadraId);
    } catch (error) {
      console.error("Error al obtener el perfil del director deportivo", error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      loadPerfil();
      loadCarreras();
    }
  }, [status]);

  async function inscribirse(escuadraId: number, carreraId: string) {
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
    return data;
  }

  const handleIncribirseCarrera = async (carreraId: string) => {
    if (!escuadraId) return;

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
        // Actualiza la lista de carreras después de inscribirse
        setCarreras(carreras.filter((carrera) => carrera.id.toString() !== carreraId));
      } else {
        errorAlert(
          "Error al inscribirte a la carrera",
          "No se ha podido inscribir la escuadra a la carrera"
        );
      }
    }
  };

  const carrerasFiltradas = carreras.filter((carrera) => {
    return (
      carrera.disponible === "SI" &&
      !carrera.escuadras.some((e) => e.id === escuadraId)
    );
  });

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black text-3xl">
        Inscripción carreras 🏁
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carrerasFiltradas.map((carrera) => (
          <CardCarrera
            key={carrera.id}
            nombre={carrera.nombre}
            tipoCarrera={carrera.tipoEtapa}
            icon={<GiMountainRoad size="30px" style={{ color: "white" }} />}
            onAdd={() => {
              handleIncribirseCarrera(carrera.id.toString());
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default InscribirseCarrera;
