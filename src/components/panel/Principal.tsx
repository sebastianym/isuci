"use client";

function HomePage() {
  return (
    <div className="py-10 flex justify-center items-center m-3">
      <div className="w-full max-xl:w-full container">
        <h1 className="text-center text-5xl font-bold mb-4 text-black/80">
          Bienvenido al Sistema de Información de la Union Cycliste
          Internationale (ISUCI)
        </h1>
        <p className="my-10 text-lg text-justify">
          Este software ha sido desarrollado para consolidar y gestionar toda la
          información relacionada con los equipos y ciclistas de la UCI a nivel
          mundial. Aquí podrás registrar, actualizar y consultar datos de
          ciclistas, masajistas, y directores deportivos, así como simular
          carreras y generar reportes detallados.
        </p>
        <p className="text-justify text-lg mb-4">
          Nuestro objetivo es ofrecer una solución integral para la
          administración y análisis de los equipos de ciclismo, facilitando la
          toma de decisiones y mejorando la organización de las competencias.
        </p>
        <p className="text-center font-semibold mt-8">
          © 2024 Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
