import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

interface Params {
  params: { id: string };
}

//Traer todas las carreras
export async function GET(request: Request) {
  try {
    const carreras = await prisma.carrera.findMany({
      include: {
        escuadras: true,
      },
    });
    return NextResponse.json(carreras);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}

//Crear una carrera
export async function POST(request: Request, { params }: Params) {
  try {
    const { nombre, tipoEtapa } = await request.json();

    const nuevaCarrera = await prisma.carrera.create({
      data: {
        nombre,
        tipoEtapa,
        tiempoAcumulado: 0,
        disponible: "SI",
      },
    });
    return NextResponse.json(nuevaCarrera);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
  }
}
