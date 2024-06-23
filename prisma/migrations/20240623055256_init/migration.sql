-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('CICLISTA', 'MASAJISTA', 'DIRECTOR_DEPORTIVO', 'ADMIN');

-- CreateEnum
CREATE TYPE "Especialidad" AS ENUM ('ESCALADORES', 'RODADORES', 'SPRINTERS', 'GREGARIOS', 'CLASICOMANOS', 'CONTRARRELOJISTA');

-- CreateEnum
CREATE TYPE "TipoEtapa" AS ENUM ('MONTANA', 'LLANO_CON_CURVAS', 'SEMI_LLANO', 'UN_SOLO_DIA', 'LLANO_EN_RECTA');

-- CreateEnum
CREATE TYPE "CiclistaAdecuado" AS ENUM ('ESCALADORES', 'RODADORES', 'SPRINTERS', 'GREGARIOS', 'CLASICOMANOS', 'CONTRARRELOJISTA');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "Contextura" AS ENUM ('MUY_DELGADA', 'DELGADA', 'MEDIA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "edad" INTEGER NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "tiempoAcumuladoCarrera" INTEGER DEFAULT 0,
    "especialidad" "Especialidad",
    "contextura" "Contextura",
    "escuadraId" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escuadra" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisOrigen" TEXT NOT NULL,
    "tiempoAcumulado" INTEGER NOT NULL,

    CONSTRAINT "Escuadra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "tipoEtapa" "TipoEtapa" NOT NULL,
    "ciclistaAdecuado" "CiclistaAdecuado" NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_escuadraId_fkey" FOREIGN KEY ("escuadraId") REFERENCES "Escuadra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
