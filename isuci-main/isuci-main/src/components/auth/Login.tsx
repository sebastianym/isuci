"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { loginService } from "../../../services/authentication";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [infoFormulario, setInfoFormulario] = useState({
    usuarioInput: "",
    contraseñaInput: "",
  });

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value);
    checkInfoForm();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContraseña(event.target.value);
    checkInfoForm();
  };

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    usuario.length === 0
      ? (updatedInfoForm.usuarioInput = " - Campo obligatorio")
      : (updatedInfoForm.usuarioInput = "");
    contraseña.length === 0
      ? (updatedInfoForm.contraseñaInput = " - Campo obligatoria")
      : (updatedInfoForm.contraseñaInput = "");

    setInfoFormulario(updatedInfoForm);

    if (usuario != "" && contraseña != "") {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlePetition()
    }
  };

  const handlePetition = async () => {
    if (infoFormulario.contraseñaInput === "" && infoFormulario.usuarioInput === "" && usuario && contraseña) {
      const user = await loginService({
        email: usuario,
        password: contraseña
      })
      console.log("🚀 ~ handlePetition ~ user:", user)
    }
    else {
      checkInfoForm()
    }
  }

  return (
    <div className="md:p-20 h-screen max-md:py-10  flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div className="w-full flex flex-wrap bg-bg-dark-secondary rounded-2xl">
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
          <div className="lg:w-1/2 mt-5 xl:p-20 lg:!p-12 p-12 !pb-6 max-sm:p-14 rounded-r-2xl max-lg:rounded-xl lg:order-1 order-1">
            <div className="my-5">
              <h1 className="text-3xl font-semibold xl:mb-8 mb-10 w-full py-5 text-white">
                ISUCI 🚵
              </h1>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white/80">
              Iniciar sesión
            </h2>
            <p className="mb-8 text-bg-black max-xl:text-justify text-white/50">
              A continuación ingresa tus datos para acceder al sistema.
            </p>
            <form>
              <label>
                <p className="text-white/80 font-medium">
                  Usuario
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.usuarioInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-12  pl-5 pr-3 rounded-md mb-5 mt-2 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="email"
                value={usuario}
                onChange={handleUsernameChange}
                placeholder="Ingresa tu usuario"
                onKeyPress={handleKeyPress}
                autoComplete="username"
              />
              <br />
              <label>
                <p className="text-white/80 font-medium">
                  Contraseña
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.contraseñaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-12  pl-5 pr-3 rounded-md mb-7 mt-2 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="password"
                value={contraseña}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              <br />
              <button
                className="w-full bg-bg-green-secondary hover:bg-[#3C5B6F] transition-all h-14 rounded-md text-white font-medium mb-3"
                type="button"
                onClick={handlePetition}
              >
                Iniciar sesión
              </button>
              <Link
                href={"/registro"}
                className="w-fit mb-1 mt-5 font-medium block text-gray-white"
              >
                ¿Aún no tienes una cuenta? Registrarse
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
