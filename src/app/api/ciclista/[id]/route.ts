import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

//Traer un ciclista especifico por su id
export async function GET(request: Request, { params }: Params) {
  try {
    const ciclista = await prisma.ciclista.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!ciclista) {
      return NextResponse.json(
        {
          message: "ciclista no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(ciclista);
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

//Eliminar un ciclista especifico por su id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const ciclistaId = Number(params.id);

    const deletedCiclista = await prisma.ciclista.delete({
      where: {
        id: ciclistaId,
      },
    });

    if (!deletedCiclista)
      return NextResponse.json(
        { message: "No se encontró el ciclista" },
        { status: 404 }
      );

    return NextResponse.json(deletedCiclista);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "No se encontró el ciclista" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
