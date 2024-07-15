import { Escuadra } from "@prisma/client";

export interface TypeCarrera {
    id: number;
    nombre: string;
    disponible: string;
    tipoEtapa: string;
    tiempoAcumulado: string;
    ganadorId: number;
    escuadras: Escuadra[];
  }
  