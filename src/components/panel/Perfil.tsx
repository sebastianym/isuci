"use client";

import { useState, useEffect } from "react";
import { errorAlert } from "@/libs/functions/popUpAlert";
import { useRouter } from "next/navigation";
import { TypeMasajista } from "@/interfaces/Masajista";
import { TypeCiclista } from "@/interfaces/Ciclista";
import { TypeDirector } from "@/interfaces/DirectorDeportivo";
import { getSession } from "next-auth/react";

function Perfil() {
  const [id, setId] = useState<number | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const [informacionPerfil, setInformacionPerfil] = useState<
    TypeCiclista | TypeMasajista | TypeDirector | null
  >(null);
  const router = useRouter();

  const fetchSession = async () => {
    const session = await getSession();
    if (session) {
      setRol(session.user.role);
      setId(parseInt(session.user.id));
    }
  };

  const loadPerfil = async () => {
    try {
      let res;
      switch (rol) {
        case "CICLISTA":
          res = await fetch(`/api/ciclista/${id}`);
          break;
        case "DIRECTOR_DEPORTIVO":
          res = await fetch(`/api/directorDeportivo/${id}`);
          break;
        case "MASAJISTA":
          res = await fetch(`/api/masajista/${id}`);
          break;
        default:
          throw new Error("Rol no reconocido");
      }

      if (!res.ok) {
        throw new Error("No se pudo cargar la información del perfil");
      }

      const data = await res.json();
      setInformacionPerfil(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (id !== null && rol !== null) {
      loadPerfil();
    }
  }, [id, rol]);

  return (
    <div className="py-10 flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-bold xl:mb-2 mb-4 w-full py-1 text-black">
            Tu perfil 🙋‍♂️
          </h1>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex my-3">
              <p className="text-lg font-bold">Nombre Completo: </p>
              <p className="ml-2">
                {informacionPerfil?.nombre ?? "No cuenta con nombre completo"}
              </p>
            </div>
            <div className="flex my-3">
              <p className="text-lg font-bold">Cédula de ciudadanía: </p>
              <p className="ml-2">
                {informacionPerfil?.cedula ?? "No cuenta con cédula de ciudadanía"}
              </p>
            </div>
            <div className="flex my-3">
              <p className="text-lg font-bold">Correo electrónico: </p>
              <p className="ml-2">
                {informacionPerfil?.correoElectronico ?? "No cuenta con correo electrónico"}
              </p>
            </div>
            <div className="flex my-3">
              <p className="text-lg font-bold">Genero: </p>
              <p className="ml-2">
                {informacionPerfil?.genero ?? "No cuenta con género"}
              </p>
            </div>
            <div className="flex my-3">
              <p className="text-lg font-bold">Edad: </p>
              <p className="ml-2">
                {informacionPerfil?.edad ?? "No cuenta con edad"}
              </p>
            </div>
            <div className="flex my-3">
              <p className="text-lg font-bold">Experiencia (años): </p>
              <p className="ml-2">
                {informacionPerfil?.experiencia ?? "No cuenta con experiencia"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
