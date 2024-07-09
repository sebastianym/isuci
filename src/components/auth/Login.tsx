"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { errorAlert } from "@/libs/functions/popUpAlert";
import { useRouter } from "next/navigation";
import ThemeButton from "../Button/ThemeButton";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [infoFormulario, setInfoFormulario] = useState({
    correoInput: "",
    contraseñaInput: "",
  });

  const router = useRouter();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContraseña(event.target.value);
  };

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    correo === ""
      ? (updatedInfoForm.correoInput = " - Campo obligatorio")
      : (updatedInfoForm.correoInput = "");
    contraseña === ""
      ? (updatedInfoForm.contraseñaInput = " - Campo obligatoria")
      : (updatedInfoForm.contraseñaInput = "");

    setInfoFormulario(updatedInfoForm);

    if (correo != "" && contraseña != "") {
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
      const res = await signIn("credentials", {
        correo: correo,
        password: contraseña,
        redirect: false,
      });
      if (res?.error) {
        errorAlert("Error al iniciar sesión", res.error);
      } else {
        router.push("/panel");
      }
    }
  };

  return (
    <div className="md:p-20 h-screen max-md:py-10 bg-palid-pink dark:bg-gray-dark flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div className="w-full flex flex-wrap bg-secondary-blue dark:bg-bg-dark-secondary rounded-2xl">
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
            <div className="my-5 flex ">
              <h1 className="text-3xl font-semibold xl:mb-8 mb-10 w-full py-5 dark:text-white">
                ISUCI 🚵
              </h1>
              <div className=" xl:mb-8 mb-10 py-5 ">
                <ThemeButton backgroundColor="bg-secondary-blue dark:bg-bg-dark-secondary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3 dark:text-white/80">
              Iniciar sesión
            </h2>
            <p className="mb-8 text-bg-black max-xl:text-justify dark:text-white/50 text-gray-800">
              A continuación ingresa tus datos para acceder al sistema.
            </p>
            <form>
              <label>
                <p className=" dark:text-white/80 font-medium">
                  Correo electrónico
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.correoInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-12  pl-5 pr-3 rounded-md mb-5 mt-2 dark:bg-white/10 bg-primary-blue border-none focus:outline-none dark:text-white/50 dark:placeholder:text-white/20 placeholder:text-gray-800"
                type="email"
                value={correo}
                onChange={handleUsernameChange}
                placeholder="Ingresa tu correo electrónico"
                onKeyPress={handleKeyPress}
                autoComplete="username"
              />
              <br />
              <label>
                <p className="dark:text-white/80 font-medium">
                  Contraseña
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.contraseñaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-12  pl-5 pr-3 rounded-md mb-5 mt-2 dark:bg-white/10 bg-primary-blue border-none focus:outline-none dark:text-white/50 dark:placeholder:text-white/20 placeholder:text-gray-800"
                type="password"
                value={contraseña}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              <br />
              <button
                className="w-full bg-Button-pred hover:bg-secundary-yellow dark:bg-bg-green-secondary dark:hover:bg-[#3C5B6F] transition-all h-14 rounded-md dark:text-white font-medium mb-3"
                type="button"
                onClick={handleLogin}
              >
                Iniciar sesión
              </button>
              <Link
                href={"/registro"}
                className="w-fit mb-1 mt-5 font-medium block text-gray-800 dark:text-gray-white"
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
