"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { successAlert, errorAlert } from "@/libs/functions/popUpAlert";
import { useRouter } from "next/navigation";

function crearCarrera() {
  const [nombreCarrera, setNombreCarrera] = useState("");
  const [tipoEtapa, setTipoEtapa] = useState("");
  const [infoFormulario, setInfoFormulario] = useState({
    nombreCarreraInput: "",
    tipoEtapaInput: "",
  });

  const router = useRouter();

  async function crearCarrera(tipoEtapa: string) {
    const res = await fetch("/api/carrera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombreCarrera,
        tipoEtapa,
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  const handleNombreCarreraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombreCarrera(event.target.value);
  };

  const handleGeneroChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTipoEtapa(event.target.value);
  };

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    nombreCarrera === ""
      ? (updatedInfoForm.nombreCarreraInput = " - Campo obligatorio")
      : (updatedInfoForm.nombreCarreraInput = "");
    tipoEtapa === ""
      ? (updatedInfoForm.tipoEtapaInput = " - Campo obligatorio")
      : (updatedInfoForm.tipoEtapaInput = "");
    setInfoFormulario(updatedInfoForm);
    if (nombreCarrera !== "" && tipoEtapa !== "") {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const inputValidation = checkInfoForm();
    if (inputValidation) {
      await crearCarrera(tipoEtapa);
      successAlert(
        "Carrera registrada con éxito",
        "La carrera ha sido registrada con éxito"
      );
    }
  };

  return (
    <div className="py-2 flex justify-center items-center m-3">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-bold xl:mb-2 mb-4 w-full py-1 text-black">
            Crear carrera 🏁
          </h1>
        </div>
        <form>
          <label>
            <p className="text-black font-medium">
              Nombre Carrera
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.nombreCarreraInput}
              </span>
            </p>
          </label>
          <input
            className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-black/10 border-none focus:outline-none text-black/80 placeholder:text-black/50"
            type="text"
            value={nombreCarrera}
            onChange={handleNombreCarreraChange}
            placeholder="Ingresa el nombre de la carrera"
            onKeyPress={handleKeyPress}
            autoComplete="name"
          />
          <label>
            <p className="text-black font-medium">
              Tipo de carrera
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.tipoEtapaInput}
              </span>
            </p>
          </label>
          <select
            onChange={handleGeneroChange}
            className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 font-bold bg-black/10 border-none focus:outline-none text-black/80 placeholder:text-black/50"
          >
            <option disabled selected>
              -- Selecciona un tipo --
            </option>
            <option value="MONTANA">Montaña</option>
            <option value="LLANO_CON_CURVAS">Llano con curvas</option>
            <option value="SEMI_LLANO">Semi llano</option>
            <option value="UN_SOLO_DIA">Un solo día</option>
            <option value="LLANO_EN_RECTA">Llano en recta</option>
          </select>
          <button
            className="w-full bg-bg-green-secondary hover:bg-[#4535C1] transition-all h-10 rounded-md text-white font-medium mb-3"
            type="button"
            onClick={handleLogin}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default crearCarrera;
