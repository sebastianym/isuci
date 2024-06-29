"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { successAlert } from "@/libs/functions/popUpAlert";

function RegisterTeam() {
  const [nombreEscuadra, setNombreEscuadra] = useState("");
  const [paises, setPaises] = useState([]);
  const [paisOrigen, setPaisOrigen] = useState("");
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [infoFormulario, setInfoFormulario] = useState({
    nombreEscuadraInput: "",
    paisOrigenInput: "",
  });

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        console.error("Error al obtener los países", error);
      } finally {
        setLoadingPaises(false);
      }
    };

    fetchPaises();
  }, []);

  const handleNombreEscuadraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombreEscuadra(event.target.value);
  };

  const handlePaisOrigenChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaisOrigen(event.target.value);
  };

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    nombreEscuadra === ""
      ? (updatedInfoForm.nombreEscuadraInput = " - Campo obligatorio")
      : (updatedInfoForm.nombreEscuadraInput = "");
    paisOrigen === ""
      ? (updatedInfoForm.paisOrigenInput = " - Campo obligatorio")
      : (updatedInfoForm.paisOrigenInput = "");
    setInfoFormulario(updatedInfoForm);
    if (nombreEscuadra !== "" && paisOrigen !== "") {
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
    if(inputValidation){
      successAlert("Escuadra registrada", "La escuadra ha sido registrada con éxito");
    }
  };

  return (
    <div className="md:p-20 max-md:py-10  flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-semibold xl:mb-2 mb-4 w-full py-1 text-white">
            Registro Escuadras
          </h1>
        </div>
        <form>
          <label>
            <p className="text-white/80 font-medium">
              Nombre Escuadra
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.nombreEscuadraInput}
              </span>
            </p>
          </label>
          <input
            className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
            type="text"
            value={nombreEscuadra}
            onChange={handleNombreEscuadraChange}
            placeholder="Ingresa el nombre de la escuadra"
            onKeyPress={handleKeyPress}
            autoComplete="name"
          />
          <label>
            <p className="text-white/80 font-medium">
              País de Origen
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.paisOrigenInput}
              </span>
              {paises.map((pais) =>
                pais.name.common === paisOrigen ? (
                  <img
                    key={pais.cca2}
                    src={pais.flags?.svg || ""}
                    alt={pais.name.common}
                    className="inline-block w-6 h-4 ml-2"
                  />
                ) : null
              )}
            </p>
          </label>
          {loadingPaises ? (
            <p className="text-white/80 font-medium">Cargando países...</p>
          ) : (
            <select
              onChange={handlePaisOrigenChange}
              className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
            >
              <option disabled selected>
                -- Selecciona un país --
              </option>
              {paises.map((pais) =>
                typeof pais !== "object" || pais === null ? null : (
                  <option key={pais.cca2} value={pais.name.common}>
                    {pais.name.common}
                  </option>
                )
              )}
            </select>
          )}
          <button
            className="w-full bg-bg-green-secondary hover:bg-[#3C5B6F] transition-all h-10 rounded-md text-white font-medium mb-3"
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

export default RegisterTeam;
