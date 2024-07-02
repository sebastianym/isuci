import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

//Traer todos los masajistas
export async function GET(request: Request, { params }: Params) {
  try {
    const masajistas = await prisma.masajista.findMany();
    return NextResponse.json(masajistas);
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

//Crear un masajista
export async function POST(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      cedula,
      correoElectronico,
      contrasena,
      genero,
      edad,
      experiencia,
    } = await request.json();
    const nuevoCiclista = await prisma.masajista.create({
      data: {
        nombre,
        cedula,
        correoElectronico,
        contrasena,
        genero,
        edad,
        experiencia,
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
