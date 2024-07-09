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
CREATE TABLE "Ciclista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "edad" INTEGER NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "tiempoAcumuladoCarrera" INTEGER DEFAULT 0,
    "especialidad" "Especialidad",
    "contextura" "Contextura",
    "escuadraId" INTEGER,

    CONSTRAINT "Ciclista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Masajista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "edad" INTEGER NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "escuadraId" INTEGER,

    CONSTRAINT "Masajista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectorDeportivo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "edad" INTEGER NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "escuadraId" INTEGER,

    CONSTRAINT "DirectorDeportivo_pkey" PRIMARY KEY ("id")
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
    "tiempoAcumulado" INTEGER NOT NULL,
    "ganadorId" INTEGER,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ciclista_cedula_key" ON "Ciclista"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Ciclista_correoElectronico_key" ON "Ciclista"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Masajista_cedula_key" ON "Masajista"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Masajista_correoElectronico_key" ON "Masajista"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Masajista_escuadraId_key" ON "Masajista"("escuadraId");

-- CreateIndex
CREATE UNIQUE INDEX "DirectorDeportivo_cedula_key" ON "DirectorDeportivo"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "DirectorDeportivo_correoElectronico_key" ON "DirectorDeportivo"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "DirectorDeportivo_escuadraId_key" ON "DirectorDeportivo"("escuadraId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_correoElectronico_key" ON "Administrador"("correoElectronico");

-- AddForeignKey
ALTER TABLE "Ciclista" ADD CONSTRAINT "Ciclista_escuadraId_fkey" FOREIGN KEY ("escuadraId") REFERENCES "Escuadra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Masajista" ADD CONSTRAINT "Masajista_escuadraId_fkey" FOREIGN KEY ("escuadraId") REFERENCES "Escuadra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectorDeportivo" ADD CONSTRAINT "DirectorDeportivo_escuadraId_fkey" FOREIGN KEY ("escuadraId") REFERENCES "Escuadra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrera" ADD CONSTRAINT "Carrera_ganadorId_fkey" FOREIGN KEY ("ganadorId") REFERENCES "Ciclista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
