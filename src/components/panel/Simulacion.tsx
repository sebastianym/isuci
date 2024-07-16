"use client";
import { GiMountainRoad } from "react-icons/gi";
import { useState, useEffect } from "react";
import { TypeCarrera } from "@/interfaces/Carrera";
import { TypeEscuadra } from "@/interfaces/Escuadra";
import { TypeCiclista } from "@/interfaces/Ciclista";
import { useSession } from "next-auth/react";
import {
  confirmAlert,
  successAlert,
  errorAlert,
} from "@/libs/functions/popUpAlert";
import CardSimulacion from "@/components/cards/CardSimulacion";
import CardCiclista from "@/components/cards/CardSelect";

function Simulacion() {
  const [carreras, setCarreras] = useState<TypeCarrera[]>([]);
  const [selectedCarrera, setSelectedCarrera] = useState<TypeCarrera | null>(
    null
  );
  const [ciclistasSeleccionados, setCiclistasSeleccionados] = useState<{
    [escuadraId: number]: TypeCiclista | null;
  }>({});
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

  useEffect(() => {
    if (status === "authenticated") {
      loadCarreras();
    }
  }, [status]);

  const handleSimularCarrera = async (carrera: TypeCarrera) => {
    if (carrera.escuadras.length < 3) {
      return errorAlert(
        "No ha sido posible realizar la simulación",
        "No se puede simular una carrera con menos de 3 escuadras inscritas"
      );
    }
    const confirm = await confirmAlert(
      "¿Estás seguro de iniciar la simulación?",
      "Una vez iniciada, no podrás deshacer esta acción"
    );

    if (confirm) {
      setSelectedCarrera(carrera);
    }
  };

  const handleSelectCiclista = (escuadraId: number, ciclista: TypeCiclista) => {
    setCiclistasSeleccionados((prev) => ({
      ...prev,
      [escuadraId]: ciclista,
    }));
  };

  const iniciarSimulacion = () => {
    if (!selectedCarrera) return;

    const tiempos = selectedCarrera.escuadras.map((escuadra) => {
      const ciclista = ciclistasSeleccionados[escuadra.id];
      return {
        ciclista,
        tiempo: Math.floor(Math.random() * 3600),
      };
    });

    tiempos.sort((a, b) => a.tiempo - b.tiempo);

    const ganador = tiempos[0];

    successAlert(
      "Simulación finalizada",
      `El ganador es ${ganador?.ciclista?.nombre} de la escuadra con un tiempo de ${ganador.tiempo} segundos`
    );

    // Actualizar tiempos acumulados de cada ciclista y escuadra
    tiempos.forEach(({ ciclista, tiempo }) => {
      fetch(`/api/ciclista/${ciclista?.id}/updateTiempo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tiempo }),
      });

      fetch(`/api/escuadra/${ciclista?.escuadraId}/updateTiempo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tiempo }),
      });
    });

    setSelectedCarrera(null);
    setCiclistasSeleccionados({});
  };

  return (
    <div className="p-10">
      <h2 className="py-10 font-bold text-black text-3xl">
        Simulación carrera 🏁
      </h2>
      {selectedCarrera ? (
        <div>
          <h3 className="py-5 text-2xl">
            Selecciona un ciclista de cada escuadra para la simulación
          </h3>
          {selectedCarrera.escuadras.map((escuadra) => (
            <div key={escuadra.id} className="py-5">
              <h4 className="text-xl font-bold">{escuadra.nombre}</h4>
            </div>
          ))}
          <button
            className="mt-5 px-4 py-2 bg-green-500 text-white font-bold"
            onClick={iniciarSimulacion}
          >
            Iniciar Simulación
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {carreras.map((carrera) => (
            <CardSimulacion
              key={carrera.id}
              nombre={carrera.nombre}
              tipoCarrera={carrera.tipoEtapa}
              escuadras={carrera.escuadras.length}
              icon={<GiMountainRoad size="30px" style={{ color: "white" }} />}
              onAdd={() => {
                handleSimularCarrera(carrera);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Simulacion;
