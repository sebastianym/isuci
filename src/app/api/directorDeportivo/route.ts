import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

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

    var hash = await bcrypt.hashSync(contrasena, 10);

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

    const nuevoDirector = await prisma.directorDeportivo.create({
      data: {
        nombre,
        cedula,
        correoElectronico,
        contrasena: hash,
        genero,
        edad,
        nacionalidad,
      },
    });
    return NextResponse.json(nuevoDirector);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
  }
}
