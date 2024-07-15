import { CarreraEscuadra, Ciclista, Masajista } from "@prisma/client";

export interface TypeEscuadra {
  id: number;
  nombre: string;
  paisOrigen: string;
  tiempoAcumulado: number;
  habilitada: string;
  ciclistas: Ciclista[];
  masajista: Masajista;
  carreras: CarreraEscuadra[];
}
