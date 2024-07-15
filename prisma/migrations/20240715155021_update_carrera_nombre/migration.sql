/*
  Warnings:

  - Added the required column `nombre` to the `Carrera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrera" ADD COLUMN     "nombre" TEXT NOT NULL;
