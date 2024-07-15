"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { successAlert, errorAlert } from "@/libs/functions/popUpAlert";
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
      console.log(session.user.role);
      setId(parseInt(session.user.id));
    }
  };

  const loadCiclista = async () => {
    try {
      const res = await fetch(`/api/ciclista/${id}`);
      const data = await res.json();
      setInformacionPerfil(data);
    } catch (error) {
      errorAlert("Error", "No se pudo cargar la información del ciclista");
    }
  };

  const loadDirector = async () => {
    try {
      const res = await fetch(`/api/directorDeportivo/${id}`);
      const data = await res.json();
      setInformacionPerfil(data);
      console.log(data);
    } catch (error) {
      errorAlert("Error", "No se pudo cargar la información del director");
    }
  };

  const loadMasajista = async () => {
    try {
      const res = await fetch(`/api/masajista/${id}`);
      const data = await res.json();
      setInformacionPerfil(data);
    } catch (error) {
      errorAlert("Error", "No se pudo cargar la información del masajista");
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="py-2 flex justify-center items-center m-3">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-bold xl:mb-2 mb-4 w-full py-1 text-black">
            Tu perfil 🙋‍♂️
          </h1>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-lg font-bold">Nombre Completo</p>
              <p>{informacionPerfil?.nombre}</p>
            </div>
            <div className="flex">
              <p className="text-lg font-bold">Cédula de ciudadanía</p>
              <p>{informacionPerfil?.cedula}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-bold">Correo electrónico</p>
              <p>{informacionPerfil?.correoElectronico}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-bold">Genero</p>
              <p>{informacionPerfil?.genero}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-bold">Edad</p>
              <p>{informacionPerfil?.edad}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-lg font-bold">Experiencia (años)</p>
              <p>{informacionPerfil?.experiencia}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
