import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { correo, password } = credentials;

        const administrador = await prisma.administrador.findUnique({
          where: {
            correoElectronico: correo,
          },
        });
        const ciclista = await prisma.ciclista.findUnique({
          where: {
            correoElectronico: correo,
          },
        });
        const masajista = await prisma.masajista.findUnique({
          where: {
            correoElectronico: correo,
          },
        });
        const directorDeportivo = await prisma.directorDeportivo.findUnique({
          where: {
            correoElectronico: correo,
          },
        });

        const usuario = administrador || ciclista || masajista || directorDeportivo;
        if (!usuario) {
          throw new Error("No se encontró el usuario");
        }

        const matchPassword = await bcrypt.compare(
          password,
          usuario.contrasena
        );

        if (!matchPassword) {
          throw new Error("Contraseña incorrecta");
        }

        let role = "";
        if(administrador) role = "ADMIN";
        if (ciclista) role = "CICLISTA";
        if (masajista) role = "MASAJISTA";
        if (directorDeportivo) role = "DIRECTOR_DEPORTIVO";

        return { id: usuario.id.toString(), role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
