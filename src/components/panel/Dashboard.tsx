"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import React, { ReactNode } from "react";
import { FaUsers, FaBicycle } from "react-icons/fa";
import { IoBicycle, IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiMountainRoad } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { TbMassage } from "react-icons/tb";
import { TypeDirector } from "@/interfaces/DirectorDeportivo";

interface DashboardProps {
  children: ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const [informacionPerfil, setInformacionPerfil] =
    useState<TypeDirector | null>(null);
  const [hasEscuadra, setHasEscuadra] = useState<boolean>(false);
  const { data: session, status } = useSession();

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
      setHasEscuadra(data.escuadraId);
    } catch (error) {
      console.log(error);
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

  if (status === "loading") {
    return;
  }

  if (!session) {
    return null;
  }

  const isAdmin = session.user.role === "ADMIN";
  const isDirectorDeportivo = session.user.role === "DIRECTOR_DEPORTIVO";

  return (
    <div className="flex h-screen shadow-xl">
      <div className="w-96 bg-white lg:flex flex-col hidden">
        <div className="flex-grow ">
          <p className="py-10 pl-8 text-4xl font-extrabold border-b-2 border-gray-300">
            ISUCI 🚵
          </p>
          <nav className="flex flex-col space-y-2">
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "hidden" : ""
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/perfil")}
              >
                <CgProfile size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Tu perfil
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/simulacion")}
              >
                <IoBicycle size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Simulación
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isDirectorDeportivo && !hasEscuadra ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8 "
                onClick={() => router.push("/panel/crearEscuadra")}
              >
                <FaUsers size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Crea tu escuadra
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isDirectorDeportivo && hasEscuadra ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8 "
                onClick={() => router.push("/panel/verEscuadra")}
              >
                <FaUsers size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Ver escuadra
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/crearCarrera")}
              >
                <GiMountainRoad size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Crear carrera
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/administrarCiclistas")}
              >
                <FaBicycle size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Administrar ciclistas
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/administrarMasajistas")}
              >
                <TbMassage size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Administrar masajistas
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/administrarDirectores")}
              >
                <FiUsers size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Administrar directores
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isAdmin ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/administrarCarreras")}
              >
                <GiMountainRoad size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Administrar carreras
                </p>
              </div>
            </div>
            <div
              className={`hover:bg-[#478CCF] py-6 hover:cursor-pointer ${
                isDirectorDeportivo ? "" : "hidden"
              }`}
            >
              <div
                className="flex items-center text-black/70 pl-8"
                onClick={() => router.push("/panel/inscribirseCarrera")}
              >
                <GiMountainRoad size={"30px"} />
                <p className="mr-1 text-2xl font-bold px-2 rounded-sm">
                  Inscripción carreras
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col flex-grow py-1">
        <header className="bg-white p-9 flex justify-between lg:justify-end items-center border-b-2 border-gray-300">
          <div className="flex items-center lg:hidden">
            <IoMenu size={"40px"} />
            <p className="py-10 pl-8 text-4xl font-extrabold lg:border-b-2 border-gray-900">
              ISUCI 🚵
            </p>
          </div>
          <div
            className="flex items-center p-2 bg-red-500 rounded hover:cursor-pointer hover:bg-red-600"
            onClick={() => signOut()}
          >
            <p className="mr-1 text-xl font-bold px-2 rounded-sm text-white">
              Cerrar sesión
            </p>
          </div>
        </header>
        <main className="w-full h-full bg-bg-white-primary">{children}</main>
      </div>
    </div>
  );
}

export default Dashboard;
