import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

// Traer todas las carreras de una escuadra
export async function GET(request: Request, { params }: Params) {
  try {
    const { id: escuadraId } = params;

    const carrerasEscuadra = await prisma.carreraEscuadra.findMany({
      where: {
        escuadraId: parseInt(escuadraId),
      },
      include: {
        carrera: true,
      },
    });

    return NextResponse.json(carrerasEscuadra.map((ce) => ce.carrera));
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

// Relacionar una escuadra con una carrera
export async function POST(request: Request, { params }: Params) {
  try {
    const { escuadraId, carreraId } = await request.json();

    const nuevoCompetidor = await prisma.carreraEscuadra.create({
      data: {
        escuadraId: parseInt(escuadraId),
        carreraId: parseInt(carreraId),
      },
    });

    return NextResponse.json(nuevoCompetidor);
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
