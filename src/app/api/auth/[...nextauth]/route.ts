import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const ciclista = await prisma.ciclista.findUnique({
          where: {
            correoElectronico: credentials?.correo,
          },
        });
        const masajista = await prisma.masajista.findUnique({
          where: {
            correoElectronico: credentials?.correo,
          },
        });
        const directorDeportivo = await prisma.directorDeportivo.findUnique({
          where: {
            correoElectronico: credentials?.correo,
          },
        });
      
        if (!ciclista && !masajista && !directorDeportivo) return null;
      
        const matchPassword = await bcrypt.compare(
          credentials?.password || "",
          ciclista?.contrasena ||
            masajista?.contrasena ||
            directorDeportivo?.contrasena ||
            "123456"
        );
      
        if (!matchPassword) return null;
      
        return {
            id: String(ciclista?.id || masajista?.id || directorDeportivo?.id || 0),
            name: ciclista?.nombre || masajista?.nombre || directorDeportivo?.nombre || "",
            email: ciclista?.correoElectronico || masajista?.correoElectronico || directorDeportivo?.correoElectronico || "",
            role: ciclista ? "ciclista" : masajista ? "masajista" : directorDeportivo ? "directorDeportivo" : "",
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
