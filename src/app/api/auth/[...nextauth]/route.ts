import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../../db"
import bcrypt from "bcrypt"

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
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
