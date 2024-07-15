import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

//Traer una escuadra en especifico por su id
export async function GET(request: Request, { params }: Params) {
  try {
    const escuadra = await prisma.escuadra.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!escuadra) {
      return NextResponse.json(
        {
          message: "escuadra no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(escuadra);
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

//Eliminar una escuadra en especifico por su id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const escuadraId = Number(params.id);

    const deletedEscuadra = await prisma.escuadra.delete({
      where: {
        id: escuadraId,
      },
    });

    if (!deletedEscuadra)
      return NextResponse.json(
        { message: "No se encontró la carrera" },
        { status: 404 }
      );

    return NextResponse.json(deletedEscuadra);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "No se encontró la escuadra" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
