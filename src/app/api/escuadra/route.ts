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
    const { nombre, paisOrigen, ciclistasSeleccionados, masajistaSeleccionado, directorDeportivo } = await request.json();

    const escuadraExistente = await prisma.escuadra.findFirst({
      where: {
        nombre,
      },
    });

    if (escuadraExistente) throw new Error("El nombre de la escuadra ya existe");

    // Calcular el tiempo acumulado de los ciclistas
    const tiempoAcumulado = ciclistasSeleccionados.reduce(
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
          connect: ciclistasSeleccionados.map((ciclista: { id: number }) => ({
            id: ciclista.id,
          })),
        },
        masajista: {
          connect: {
            id: masajistaSeleccionado.id,
          },
        },
        directorDeportivo: {
          connect: {
            id: directorDeportivo,
          },
        }
      },
    });

    return NextResponse.json(nuevaEscuadra);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
  }
}
