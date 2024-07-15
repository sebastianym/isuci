/*
  Warnings:

  - Added the required column `disponible` to the `Carrera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrera" ADD COLUMN     "disponible" "Habilitada" NOT NULL;

-- CreateTable
CREATE TABLE "CarreraEscuadra" (
    "carreraId" INTEGER NOT NULL,
    "escuadraId" INTEGER NOT NULL,

    CONSTRAINT "CarreraEscuadra_pkey" PRIMARY KEY ("carreraId","escuadraId")
);

-- AddForeignKey
ALTER TABLE "CarreraEscuadra" ADD CONSTRAINT "CarreraEscuadra_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarreraEscuadra" ADD CONSTRAINT "CarreraEscuadra_escuadraId_fkey" FOREIGN KEY ("escuadraId") REFERENCES "Escuadra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
