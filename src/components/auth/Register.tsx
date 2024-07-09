"use client";

import Link from "next/link";
import bcrypt from "bcryptjs";
import { Pais } from "@/interfaces/Paises";
import { ChangeEvent, useState, useEffect } from "react";
import { successAlert, errorAlert } from "@/libs/functions/popUpAlert";
import { useRouter } from "next/navigation";
import ThemeButton from "../Button/ThemeButton";

function Register() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("1234");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [rol, setRol] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [contextura, setContextura] = useState("");
  const [paises, setPaises] = useState<Pais[]>([]);
  const [nacionalidad, setNacionalidad] = useState("");
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [infoFormulario, setInfoFormulario] = useState({
    nombreInput: "",
    cedulaInput: "",
    correoInput: "",
    generoInput: "",
    edadInput: "",
    experienciaInput: "",
    rolInput: "",
    especialidadInput: "",
    contexturaInput: "",
    nacionalidadInput: "",
  });

  const router = useRouter();

  function crearContraseña() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    setContrasena("1234");
  }

  async function crearCiclista(
    nombre: string,
    cedula: string,
    correoElectronico: string,
    genero: string,
    edad: string,
    experiencia: string,
    especialidad: string,
    contextura: string,
    nacionalidad: string
  ) {
    crearContraseña();
    var hash = await bcrypt.hashSync(contrasena, 10);
    const res = await fetch("/api/ciclista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        cedula,
        correoElectronico,
        contrasena: hash,
        genero,
        edad: parseInt(edad),
        experiencia: parseInt(experiencia),
        especialidad,
        contextura,
        nacionalidad,
      }),
    });
    const data = await res.json();
    return data;
  }

  async function crearDirector(
    nombre: string,
    cedula: string,
    correoElectronico: string,
    genero: string,
    edad: string,
    nacionalidad: string
  ) {
    crearContraseña();
    var hash = await bcrypt.hashSync("1234", 10);
    const res = await fetch("/api/directorDeportivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        cedula,
        correoElectronico,
        contrasena: hash,
        genero,
        edad: parseInt(edad),
        nacionalidad,
      }),
    });
    const data = await res.json();
    return data;
  }

  async function crearMasajista(
    nombre: string,
    cedula: string,
    correoElectronico: string,
    genero: string,
    edad: string,
    experiencia: string
  ) {
    crearContraseña();
    var hash = await bcrypt.hash("1234", 10);
    console.log(hash);
    const res = await fetch("/api/masajista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        cedula,
        correoElectronico,
        contrasena: hash,
        genero,
        edad: parseInt(edad),
        experiencia: parseInt(experiencia),
      }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  // async function enviarEmail(correoElectronico: string, contrasena: string) {
  //   const res = await fetch("/api/email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       correoElectronico,
  //       contrasena,
  //     }),
  //   });
  //   const data = await res.json();
  //   return data;
  // }

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

  useEffect(() => {
    fetchPaises();
  }, []);

  const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleCedulaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };

  const handleCorreoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCorreoElectronico(event.target.value);
  };

  const handleGeneroChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenero(event.target.value);
  };

  const handleEdadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEdad(event.target.value);
  };

  const handleExperienciaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExperiencia(event.target.value);
  };

  const handleRolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRol(event.target.value);
  };

  const handleEspecialidadChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEspecialidad(event.target.value);
  };

  const handleContexturaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setContextura(event.target.value);
  };

  const handleNacionalidadChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNacionalidad(event.target.value);
  };

  function emailIsValid(correoElectronico: string) {
    return /\S+@\S+\.\S+/.test(correoElectronico);
  }

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    nombre === ""
      ? (updatedInfoForm.nombreInput = " - Campo obligatorio")
      : (updatedInfoForm.nombreInput = "");
    cedula === "" || cedula.length !== 10
      ? (updatedInfoForm.cedulaInput = " - Campo no válido")
      : (updatedInfoForm.cedulaInput = "");
    correoElectronico === "" || emailIsValid(correoElectronico) === false
      ? (updatedInfoForm.correoInput = " - Correo no válido")
      : (updatedInfoForm.correoInput = "");
    genero === ""
      ? (updatedInfoForm.generoInput = " - Campo obligatorio")
      : (updatedInfoForm.generoInput = "");
    edad === "" || parseInt(edad) < 18 || parseInt(edad) > 80
      ? (updatedInfoForm.edadInput = " - Edad no válida")
      : (updatedInfoForm.edadInput = "");
    experiencia === "" ||
    parseInt(experiencia) < 0 ||
    parseInt(experiencia) > 50 ||
    parseInt(experiencia) > parseInt(edad) - 15
      ? (updatedInfoForm.experienciaInput = " - Experiencia no válida")
      : (updatedInfoForm.experienciaInput = "");
    rol === ""
      ? (updatedInfoForm.rolInput = " - Campo obligatorio")
      : (updatedInfoForm.rolInput = "");
    especialidad === ""
      ? (updatedInfoForm.especialidadInput = " - Campo obligatorio")
      : (updatedInfoForm.especialidadInput = "");
    contextura === ""
      ? (updatedInfoForm.contexturaInput = " - Campo obligatorio")
      : (updatedInfoForm.contexturaInput = "");
    nacionalidad === ""
      ? (updatedInfoForm.nacionalidadInput = " - Campo obligatorio")
      : (updatedInfoForm.nacionalidadInput = "");
    setInfoFormulario(updatedInfoForm);

    if (
      nombre !== "" &&
      cedula !== "" &&
      cedula.length === 10 &&
      correoElectronico !== "" &&
      emailIsValid(correoElectronico) === true &&
      genero !== "" &&
      edad !== "" &&
      parseInt(edad) > 17 &&
      parseInt(edad) < 81 &&
      experiencia !== "" &&
      parseInt(experiencia) > 0 &&
      parseInt(experiencia) < 50 &&
      parseInt(experiencia) < parseInt(edad) - 15 &&
      rol !== "" &&
      nacionalidad !== ""
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
      if (rol === "1") {
        const dataCiclista = await crearCiclista(
          nombre,
          cedula,
          correoElectronico,
          genero,
          edad,
          experiencia,
          especialidad,
          contextura,
          nacionalidad
        );
        if (
          dataCiclista === "El correo ya está registrado" ||
          dataCiclista === "La cédula ya está registrada"
        ) {
          errorAlert("Error al registrar usuario", dataCiclista);
          return;
        } else {
          successAlert(
            "Usuario registrado",
            "Se enviará al correo la información de acceso"
          );
          //await enviarEmail(correoElectronico, contrasena);
          router.push("/");
        }
      } else if (rol === "2") {
        const dataMasajista = await crearMasajista(
          nombre,
          cedula,
          correoElectronico,
          genero,
          edad,
          experiencia
        );
        if (
          dataMasajista === "El correo ya está registrado" ||
          dataMasajista === "La cédula ya está registrada"
        ) {
          errorAlert("Error al registrar usuario", dataMasajista);
          return;
        } else {
          successAlert(
            "Usuario registrado",
            "Se enviará al correo la información de acceso"
          );
          // const dataEmail = await enviarEmail(correoElectronico, contrasena);
          console.log(dataMasajista);
          // console.log(dataEmail);
          router.push("/");
        }
      } else if (rol === "3") {
        const dataDirector = await crearDirector(
          nombre,
          cedula,
          correoElectronico,
          genero,
          edad,
          nacionalidad
        );
        if (
          dataDirector === "El correo ya está registrado" ||
          dataDirector === "La cédula ya está registrada"
        ) {
          errorAlert("Error al registrar usuario", dataDirector);
          return;
        } else {
          successAlert(
            "Usuario registrado",
            "Se enviará al correo la información de acceso"
          );
          // await enviarEmail(correoElectronico, contrasena);
          router.push("/");
        }
      }
    }
  };

  return (
    <div className="md:p-20 h-screen bg-back-back dark:bg-gray-dark max-md:py-10  flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div className="w-full flex flex-wrap bg-background dark:bg-bg-dark-secondary rounded-2xl">
          <div className="hidden lg:block lg:w-1/2 lg:h-auto w-full h-52 relative lg:rounded-l-2xl max-lg:rounded-xl lg:order-2 order-2 max-lg:mt-5">
            <div
              className="absolute inset-0 lg:rounded-l-2xl rounded-b-2xl brightness-[0.8]"
              style={{
                backgroundImage: "url('/images/imagen-login.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="lg:w-1/2 xl:p-5 lg:!p-12 p-10 !pb-6 max-sm:p-14 rounded-r-2xl max-lg:rounded-xl lg:order-1 order-1">
          <div className="my-5 flex ">
              <h1 className="text-3xl font-semibold xl:mb-8 mb-10 w-full py-5 dark:text-white">
                ISUCI 🚵
              </h1>
              <div className=" xl:mb-8 mb-10 py-5 ">
              <ThemeButton backgroundColor="bg-background dark:bg-bg-dark-secondary" />
              </div>
            </div>
            <form>
              <label>
                <p className="dark:text-white/80 font-medium">
                  Nombre Completo
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.nombreInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                placeholder="Ingresa tu nombre completo"
                onKeyPress={handleKeyPress}
                autoComplete="name"
              />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Cédula de ciudadanía
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.cedulaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                type="number"
                value={cedula}
                onChange={handleCedulaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa el número de tu cedula"
                autoComplete="cedula"
              />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Correo electrónico
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.correoInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                type="email"
                value={correoElectronico}
                onChange={handleCorreoChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
              />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Genero
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.generoInput}
                  </span>
                </p>
              </label>
              <select
                onChange={handleGeneroChange}
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 dark:font-bold bg-secondary-blue dark:bg-white/30 border-none focus:outline-none text-black/90 dark:placeholder:text-white/20"
              >
                <option disabled selected>
                  -- Selecciona genero --
                </option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
              </select>
              <label>
                <p className="dark:text-white/80 font-medium">
                  Edad
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.edadInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                type="number"
                value={edad}
                onChange={handleEdadChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu edad"
                autoComplete="edad"
              />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Experiencia (años)
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.experienciaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                type="number"
                value={experiencia}
                onChange={handleExperienciaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tus años de experiencia"
                autoComplete="experiencia"
              />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Nacionalidad
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.nacionalidadInput}
                  </span>
                  {paises.map((pais) =>
                    pais.name.common === nacionalidad ? (
                      <img
                        key={pais.cca2}
                        src={pais.flags.svg}
                        alt={pais.name.common}
                        className="inline-block w-6 h-4 ml-2"
                      />
                    ) : null
                  )}
                </p>
              </label>
              {loadingPaises ? (
                <p className="dark:text-white/80 font-medium">Cargando países...</p>
              ) : (
                <select
                  onChange={handleNacionalidadChange}
                  className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                >
                  <option disabled selected>
                    -- Selecciona tu Nacionalidad --
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
                <p className="dark:text-white/80 font-medium">
                  Rol
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.rolInput}
                  </span>
                </p>
              </label>
              <select
                onChange={handleRolChange}
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
              >
                <option disabled selected>
                  -- Selecciona rol --
                </option>
                <option value="1">Ciclista</option>
                <option value="2">Masajista</option>
                <option value="3">Director deportivo</option>
              </select>

              {rol === "1" ? (
                <div>
                  <label>
                    <p className="dark:text-white/80 font-medium">
                      Especialidad
                      <span className="text-red-500 font-medium text-sm select-none">
                        {infoFormulario.especialidadInput}
                      </span>
                    </p>
                  </label>
                  <select
                    onChange={handleEspecialidadChange}
                    className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                  >
                    <option disabled selected>
                      -- Selecciona tu especialidad --
                    </option>
                    <option value="ESCALADORES">Escalador</option>
                    <option value="RODADORES">Rodadores</option>
                    <option value="SPRINTERS">Sprinters</option>
                    <option value="GREGARIOS">Gregarios</option>
                    <option value="CLASICOMANOS">Clasicomanos</option>
                    <option value="CONTRARRELOJISTA">Contrarrelojista</option>
                  </select>
                  <label>
                    <p className="dark:text-white/80 font-medium">
                      Contextura
                      <span className="text-red-500 font-medium text-sm select-none">
                        {infoFormulario.contexturaInput}
                      </span>
                    </p>
                  </label>
                  <select
                    onChange={handleContexturaChange}
                    className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-secondary-blue dark:bg-white/10 border-none focus:outline-none dark:text-white/50 placeholder:text-gray-800 dark:placeholder:text-white/20"
                  >
                    <option disabled selected>
                      -- Selecciona tu contextura --
                    </option>
                    <option value="MUY_DELGADA">Muy delgada</option>
                    <option value="DELGADA">Delgada</option>
                    <option value="MEDIA">Media</option>
                  </select>
                </div>
              ) : null}
              <button
                className="w-full bg-primary-yellow hover:bg-secundary-yellow dark:bg-bg-green-secondary dark:hover:bg-[#3C5B6F] transition-all h-10 rounded-md dark:text-white font-medium mb-3"
                type="button"
                onClick={handleLogin}
              >
                Registrarme
              </button>
              <Link
                href={"/"}
                className="w-fit mt-1 font-medium block text-gray-700 dark:text-gray-white"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
