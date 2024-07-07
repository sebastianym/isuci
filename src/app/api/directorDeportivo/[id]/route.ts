import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

//Traer un director especifico por su id
export async function GET(request: Request, { params }: Params) {
  try {
    const director = await prisma.directorDeportivo.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!director) {
      return NextResponse.json(
        {
          message: "director no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(director);
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

//Eliminar un director especifico por su id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const directorId = Number(params.id);

    const deletedDirector = await prisma.directorDeportivo.delete({
      where: {
        id: directorId,
      },
    });

    if (!deletedDirector)
      return NextResponse.json(
        { message: "No se encontró el director" },
        { status: 404 }
      );

    return NextResponse.json(deletedDirector);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "No se encontró el director" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
