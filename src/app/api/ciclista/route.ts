import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
interface Params {
  params: { id: string };
}

//Traer todos los ciclistas
export async function GET(request: Request, { params }: Params) {
  try {
    const ciclistas = await prisma.ciclista.findMany();
    return NextResponse.json(ciclistas);
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

//Crear un ciclista
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
      nacionalidad,
      tiempoAcumuladoCarrera,
      especialidad,
      contextura,
    } = await request.json();
    const nuevoCiclista = await prisma.ciclista.create({
      data: {
        nombre,
        cedula,
        correoElectronico,
        contrasena,
        genero,
        edad,
        experiencia,
        nacionalidad,
        tiempoAcumuladoCarrera,
        especialidad,
        contextura,
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
