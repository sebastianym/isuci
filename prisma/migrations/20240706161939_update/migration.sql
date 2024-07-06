/*
  Warnings:

  - Added the required column `habilitada` to the `Escuadra` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Habilitada" AS ENUM ('SI', 'NO');

-- AlterTable
ALTER TABLE "Escuadra" ADD COLUMN     "habilitada" "Habilitada" NOT NULL;
