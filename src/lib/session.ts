import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { prisma } from "../db"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const admin = await prisma.admin.findFirst({
          where: {
            email,
          },
        })

        if (admin) {
          const decrypted_pwd = await bcrypt.compare(password, admin.password)
          if (decrypted_pwd) {
            return admin
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 18000,
  },
  jwt: {
    maxAge: 18000,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session
}
