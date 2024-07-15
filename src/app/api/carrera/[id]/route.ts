import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

//Traer una carrera en especifico por su id
export async function GET(request: Request, { params }: Params) {
  try {
    const carrera = await prisma.carrera.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!carrera) {
      return NextResponse.json(
        {
          message: "carrera no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(carrera);
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

//Eliminar una carrera en especifico por su id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const carreraId = Number(params.id);

    const deletedCarrera = await prisma.carrera.delete({
      where: {
        id: carreraId,
      },
    });

    if (!deletedCarrera)
      return NextResponse.json(
        { message: "No se encontró la carrera" },
        { status: 404 }
      );

    return NextResponse.json(deletedCarrera);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "No se encontró la carrera" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
