import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { errorAlert } from "@/libs/functions/popUpAlert";

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

    const ciclistaCorreo = await prisma.ciclista.findUnique({
      where: {
        correoElectronico,
      },
    });

    const masajistaCorreo = await prisma.masajista.findUnique({
      where: {
        correoElectronico,
      },
    });

    const directorDeportivoCorreo = await prisma.directorDeportivo.findUnique({
      where: {
        correoElectronico,
      },
    });

    if (ciclistaCorreo || masajistaCorreo || directorDeportivoCorreo)
      throw new Error("El correo ya está registrado");

    const ciclistaCedula = await prisma.ciclista.findUnique({
      where: {
        cedula,
      },
    });

    const masajistaCedula = await prisma.masajista.findUnique({
      where: {
        cedula,
      },
    });

    const directorDeportivoCedula = await prisma.directorDeportivo.findUnique({
      where: {
        cedula,
      },
    });

    if (ciclistaCedula || masajistaCedula || directorDeportivoCedula)
      throw new Error("La cédula ya está registrada");

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
      return error
    }
  }
}
