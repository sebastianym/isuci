import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Traer todas las escuadras
export async function GET(request: Request) {
  try {
    const escuadras = await prisma.escuadra.findMany({
      include: {
        ciclistas: true,
        masajista: true,
        directorDeportivo: true,
      },
    });
    return NextResponse.json(escuadras);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

// Crear una escuadra
export async function POST(request: Request) {
  try {
    const { nombre, paisOrigen, ciclistas } = await request.json();

    // Calcular el tiempo acumulado de los ciclistas
    const tiempoAcumulado = ciclistas.reduce(
      (acc: number, ciclista: { tiempoAcumuladoCarrera: number }) => {
        return acc + (ciclista.tiempoAcumuladoCarrera || 0);
      },
      0
    );

    const nuevaEscuadra = await prisma.escuadra.create({
      data: {
        nombre,
        paisOrigen,
        tiempoAcumulado,
        habilitada: "SI",
        ciclistas: {
          connect: ciclistas.map((ciclista: { id: number }) => ({
            id: ciclista.id,
          })),
        },
      },
    });

    return NextResponse.json(nuevaEscuadra);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
