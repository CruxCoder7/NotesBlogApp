"use client"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { signIn, useSession } from "next-auth/react"
import { Palanquin_Dark } from "next/font/google"
import { useState } from "react"
import { redirect } from "next/navigation"
import Loading from "@/components/Loading/Loading"

const Palanquin_DarkFont = Palanquin_Dark({
  weight: ["400", "500"],
  subsets: ["latin"],
})

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/compose",
      redirect: true,
    })
  }

  const { data: session, status } = useSession()
  if (status === "loading") {
    return <Loading />
  }

  if (session) {
    redirect("/admin/compose")
  }

  return (
    <>
      <title>Admin</title>
      <div className="flex items-center justify-center w-full h-screen">
        <form
          onSubmit={submit}
          className="lg:w-[50%] md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-[60%] md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]"
        >
          <div className="flex flex-col justify-start">
            <h1
              className={`text-center text-white text-3xl ${Palanquin_DarkFont.className}`}
            >
              Admin Login
            </h1>
          </div>
          <FormControl isRequired>
            <FormLabel className="text-white">Email address</FormLabel>
            <Input
              type="email"
              className="text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel className="text-white mt-2">Password</FormLabel>
            <Input
              type="password"
              className="text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#53b2f9] mt-3"
              variant={"solid"}
              _hover={{ bg: "#a9d3f3" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
