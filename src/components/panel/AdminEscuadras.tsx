"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Pais } from "@/interfaces/Paises";
import { TypeEscuadra } from "@/interfaces/Escuadra";
import { TypeCiclista } from "@/interfaces/Ciclista";
import { TypeMasajista } from "@/interfaces/Masajista";
import CardSelect from "@/components/cards/CardSelect";
import CardDelete from "@/components/cards/CardDelete";
import { successAlert, errorAlert } from "@/libs/functions/popUpAlert";
import { TbMassage } from "react-icons/tb";
import { IoBicycle } from "react-icons/io5";
import { useRouter } from "next/navigation";

function AdminEscuadras() {
  const [escuadras, setEscuadras] = useState<TypeEscuadra[]>([]);
  const [nombreEscuadra, setNombreEscuadra] = useState("");
  const [ciclistas, setCiclistas] = useState<TypeCiclista[]>([]);
  const [masajistas, setMasajistas] = useState<TypeMasajista[]>([]);
  const [masajistaSeleccionado, setMasajistaSeleccionado] =
    useState<TypeMasajista | null>(null);
  const [directorDeportivo, setDirectorDeportivo] = useState<TypeMasajista[]>(
    []
  );
  const [ciclistasSeleccionados, setCiclistasSeleccionados] = useState<
    TypeCiclista[]
  >([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisOrigen, setPaisOrigen] = useState("");
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [infoFormulario, setInfoFormulario] = useState({
    nombreEscuadraInput: "",
    paisOrigenInput: "",
    ciclistaInput: "",
    especialidadCiclistaInput: "",
    masajistaInput: "",
    masajistaUniqueInput: "",
  });

  const router = useRouter();

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

  async function loadEscuadra() {
    try {
      const res = await fetch("/api/escuadra");
      const data = await res.json();
      console.log(data);
      setCiclistas(data);
    } catch (error) {
      console.error("Error al obtener los ciclistas", error);
    }
  }

  async function loadCiclistas() {
    try {
      const res = await fetch("/api/ciclista");
      const data = await res.json();
      console.log(data);
      setCiclistas(data);
    } catch (error) {
      console.error("Error al obtener los ciclistas", error);
    }
  }

  async function loadMasajistas() {
    try {
      const res = await fetch("/api/masajista");
      const data = await res.json();
      console.log(data);
      setMasajistas(data);
    } catch (error) {
      console.error("Error al obtener los masajistas", error);
    }
  }

  async function crearEscuadra(
    nombre: string,
    paisOrigen: string,
    ciclistasSeleccionados: TypeCiclista[],
    masajistaSeleccionado: TypeMasajista | null
  ) {
    const res = await fetch("/api/escuadra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        paisOrigen,
        ciclistasSeleccionados,
        masajistaSeleccionado,
        directorDeportivo,
      }),
    });
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchPaises();
    loadCiclistas();
    loadMasajistas();
    console.log(ciclistas);
    console.log(masajistas);
  }, []);

  const handleNombreEscuadraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombreEscuadra(event.target.value);
  };

  const handlePaisOrigenChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaisOrigen(event.target.value);
  };

  const checkCiclistasSeleccionados = () => {
    const tiposCiclistas = [
      "ESCALADORES",
      "RODADORES",
      "SPRINTERS",
      "GREGARIOS",
      "CLASICOMANOS",
      "CONTRARRELOJISTA",
    ];
    const ciclistasSeleccionadosTipos = ciclistasSeleccionados.map(
      (ciclista) => ciclista.especialidad
    );
    const tiposFaltantes = tiposCiclistas.filter(
      (tipo) => !ciclistasSeleccionadosTipos.includes(tipo)
    );
    return tiposFaltantes.length === 0;
  };

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    nombreEscuadra === ""
      ? (updatedInfoForm.nombreEscuadraInput = " - Campo obligatorio")
      : (updatedInfoForm.nombreEscuadraInput = "");
    paisOrigen === ""
      ? (updatedInfoForm.paisOrigenInput = " - Campo obligatorio")
      : (updatedInfoForm.paisOrigenInput = "");
    ciclistasSeleccionados.length < 6
      ? (updatedInfoForm.ciclistaInput = " - Los ciclistas no son suficientes")
      : (updatedInfoForm.ciclistaInput = "");
    checkCiclistasSeleccionados() === false
      ? (updatedInfoForm.especialidadCiclistaInput =
          " - No hay suficientes ciclistas de cada especialidad")
      : (updatedInfoForm.especialidadCiclistaInput = "");
    masajistaSeleccionado === null
      ? (updatedInfoForm.masajistaInput = " - Se debe seleccionar un masajista")
      : (updatedInfoForm.masajistaInput = "");
    setInfoFormulario(updatedInfoForm);
    if (
      nombreEscuadra !== "" &&
      paisOrigen !== "" &&
      ciclistasSeleccionados.length >= 6 &&
      checkCiclistasSeleccionados() === true &&
      masajistaSeleccionado !== null
    ) {
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
      const dataEscuadra = await crearEscuadra(
        nombreEscuadra,
        paisOrigen,
        ciclistasSeleccionados,
        masajistaSeleccionado
      );
      if (dataEscuadra === "El nombre de la escuadra ya existe") {
        errorAlert("Error al registrar la escuadra", dataEscuadra);
        return;
      }
      successAlert(
        "Escuadra registrada",
        "La escuadra ha sido registrada con éxito"
      );
      location.reload();
    }
  };

  return (
    <div className="py-2 flex justify-center items-center m-3">
      <div className="w-full max-xl:w-full container">
        <div>
          <h1 className="text-3xl font-bold xl:mb-2 mb-4 w-full py-1 text-black">
            Registro Escuadras
          </h1>
        </div>
        <form>
          <label>
            <p className="text-black font-medium">
              Nombre Escuadra
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.nombreEscuadraInput}
              </span>
            </p>
          </label>
          <input
            className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-black/10 border-none focus:outline-none text-black/80 placeholder:text-black/50"
            type="text"
            value={nombreEscuadra}
            onChange={handleNombreEscuadraChange}
            placeholder="Ingresa el nombre de la escuadra"
            onKeyPress={handleKeyPress}
            autoComplete="name"
          />
          <label>
            <p className="text-black font-medium">
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
            <p className="text-black font-medium">Cargando países...</p>
          ) : (
            <select
              onChange={handlePaisOrigenChange}
              className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 font-bold bg-black/10 border-none focus:outline-none text-black/80 placeholder:text-black/50"
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
          <label>
            <p className="text-black font-medium">
              Ciclistas seleccionados
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.ciclistaInput}
              </span>
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.especialidadCiclistaInput}
              </span>
            </p>
          </label>
          {
            <div className="w-full max-h-60 overflow-y-auto mb-2 scrollbar-hide">
              {ciclistasSeleccionados.map((ciclistaSeleccionado) => (
                <CardDelete
                  key={ciclistaSeleccionado.id}
                  nombre={ciclistaSeleccionado.nombre}
                  especialidad={ciclistaSeleccionado.especialidad}
                  cedula={ciclistaSeleccionado.cedula}
                  icon={<IoBicycle size="30px" style={{ color: "white" }} />}
                  onDelete={() => {
                    setCiclistas([...ciclistas, ciclistaSeleccionado]);
                    setCiclistasSeleccionados(
                      ciclistasSeleccionados.filter(
                        (c) => c.id !== ciclistaSeleccionado.id
                      )
                    );
                  }}
                />
              ))}
            </div>
          }
          <label>
            <p className="text-black font-medium">
              Masajista seleccionado
              <span className="text-red-500 font-medium text-sm select-none">
                {infoFormulario.masajistaInput}
              </span>
            </p>
          </label>
          {
            <div className="w-full">
              {masajistaSeleccionado ? (
                <CardDelete
                  key={masajistaSeleccionado.id}
                  nombre={masajistaSeleccionado.nombre}
                  especialidad={"Masajista"}
                  cedula={masajistaSeleccionado.cedula}
                  icon={<TbMassage size="30px" style={{ color: "white" }} />}
                  onDelete={() => {
                    setMasajistas([...masajistas, masajistaSeleccionado]);
                    setMasajistaSeleccionado(null);
                  }}
                />
              ) : null}
            </div>
          }
          <label>
            <p className="text-black font-medium">Ciclistas disponibles</p>
          </label>
          <div className="w-full max-h-60 overflow-y-auto mb-2 scrollbar-hide">
            {ciclistas
              .filter((ciclista) => ciclista.escuadraId === null)
              .map((ciclista) => (
                <CardSelect
                  key={ciclista.id}
                  nombre={ciclista.nombre}
                  especialidad={ciclista.especialidad}
                  cedula={ciclista.cedula}
                  icon={<IoBicycle size="30px" style={{ color: "white" }} />}
                  onAdd={() => {
                    setCiclistasSeleccionados([
                      ...ciclistasSeleccionados,
                      ciclista,
                    ]);
                    setCiclistas(ciclistas.filter((c) => c.id !== ciclista.id));
                  }}
                />
              ))}
          </div>
          {masajistaSeleccionado === null ? (
            <div>
              <label>
                <p className="text-black font-medium">Masajistas disponibles</p>
              </label>
              <div className="w-full max-h-60 overflow-y-auto mb-2 scrollbar-hide">
                {masajistas
                  .filter((masajista) => masajista.escuadraId === null)
                  .map((masajista) => (
                    <CardSelect
                      key={masajista.id}
                      nombre={masajista.nombre}
                      especialidad={"Masajista"}
                      cedula={masajista.cedula}
                      icon={
                        <TbMassage size="30px" style={{ color: "white" }} />
                      }
                      onAdd={() => {
                        setMasajistaSeleccionado(masajista);
                        setMasajistas(
                          masajistas.filter((c) => c.id !== masajista.id)
                        );
                      }}
                    />
                  ))}
              </div>
            </div>
          ) : null}
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

export default AdminEscuadras;
