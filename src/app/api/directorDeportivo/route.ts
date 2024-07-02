import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

//Traer todos los directores deportivos
export async function GET(request: Request, { params }: Params) {
  try {
    const directores = await prisma.directorDeportivo.findMany();
    return NextResponse.json(directores);
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

//Crear un director deportivo
export async function POST(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      cedula,
      correoElectronico,
      contrasena,
      genero,
      edad,
      nacionalidad,
    } = await request.json();
    const nuevoCiclista = await prisma.directorDeportivo.create({
      data: {
        nombre,
        cedula,
        correoElectronico,
        contrasena,
        genero,
        edad,
        nacionalidad,
      },
    });
    return NextResponse.json(nuevoCiclista);
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
