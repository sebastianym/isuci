"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoBicycle } from "react-icons/io5";
import { TbMassage } from "react-icons/tb";
import { TypeDirector } from "@/interfaces/DirectorDeportivo";
import { TypeEscuadra } from "@/interfaces/Escuadra";
import Card from "@/components/cards/Card";

function ViewEscuadra() {
  const [escuadra, setEscuadra] = useState<TypeEscuadra | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [informacionPerfil, setInformacionPerfil] =
    useState<TypeDirector | null>(null);
  const [escuadraId, setEscuadraId] = useState<number | null>(null);

  const router = useRouter();

  const loadPerfil = async () => {
    try {
      let res;
      switch (rol) {
        case "DIRECTOR_DEPORTIVO":
          res = await fetch(`/api/directorDeportivo/${id}`);
          break;
        default:
          throw new Error("El rol no es de director");
      }

      if (!res.ok) {
        throw new Error("No se pudo cargar la información del perfil");
      }

      const data = await res.json();
      setInformacionPerfil(data);
      setEscuadraId(data.escuadraId);
    } catch (error) {
      console.log(error);
    }
  };

  const loadEscuadra = async (escuadraId: number | null) => {
    if (escuadraId === null) return;
    try {
      const res = await fetch(`/api/escuadra/${escuadraId}`);
      const data = await res.json();
      if (data) {
        setEscuadra(data);
      }
    } catch (error) {
      console.error("Error al obtener la escuadra", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/");
    } else {
      setRol(session.user.role);
      setId(parseInt(session.user.id));
    }
  }, [session, status, router]);

  useEffect(() => {
    if (id !== null && rol !== null) {
      loadPerfil();
    }
  }, [id, rol]);

  useEffect(() => {
    if (escuadraId !== null) {
      loadEscuadra(escuadraId);
    }
  }, [escuadraId]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="py-2 flex justify-center items-center m-3">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-bold xl:mb-2 mb-4 w-full py-1 text-black">
            Información de la Escuadra
          </h1>
        </div>
        <div>
          <label>
            <p className="text-black font-medium">Nombre Escuadra</p>
          </label>
          <p className="w-full h-10 rounded-md mb-3 mt-1 border-none text-black/80">
            {escuadra?.nombre}
          </p>
          <label>
            <p className="text-black font-medium">País de Origen</p>
          </label>
          <p className="w-full h-10 rounded-md mb-3 mt-1 border-none text-black/80">
            {escuadra?.paisOrigen}
          </p>
          <label>
            <p className="text-black font-medium">Ciclistas</p>
          </label>
          <div className="w-full my-3 max-h-60 overflow-y-auto mb-2 scrollbar-hide">
            {escuadra?.ciclistas?.map((ciclista) => (
              <Card
                key={ciclista.id}
                nombre={ciclista.nombre}
                especialidad={ciclista.especialidad || ""}
                icon={<IoBicycle size="30px" style={{ color: "white" }} />}
              />
            ))}
          </div>
          <label>
            <p className="text-black font-medium">Masajista</p>
          </label>
          {escuadra?.masajista ? (
            <div className="flex items-center justify-between py-3 mb-2 bg-gray-100 rounded-md">
              <Card
                key={escuadra?.masajista.id}
                nombre={escuadra?.masajista.nombre}
                especialidad={""}
                icon={<TbMassage size="30px" style={{ color: "white" }} />}
              />
            </div>
          ) : (
            <p>No hay masajista seleccionado</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEscuadra;
