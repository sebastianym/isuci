import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

//Traer un masajista especifico por su id
export async function GET(request: Request, { params }: Params) {
  try {
    const masajista = await prisma.masajista.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!masajista) {
      return NextResponse.json(
        {
          message: "masajista no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(masajista);
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

//Eliminar un masajista especifico por su id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const masajistaId = Number(params.id);

    const deletedMasajista = await prisma.masajista.delete({
      where: {
        id: masajistaId,
      },
    });

    if (!deletedMasajista)
      return NextResponse.json(
        { message: "No se encontró el masajista" },
        { status: 404 }
      );

    return NextResponse.json(deletedMasajista);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "No se encontró el masajista" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
