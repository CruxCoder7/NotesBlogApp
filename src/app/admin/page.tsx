"use client"
import { useSession } from "next-auth/react"
import {
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { Palanquin_Dark } from "next/font/google"
const Palanquin_DarkFont = Palanquin_Dark({ weight: ["400", "500"], subsets: ["latin"] })


export default function Page() {
    const session = useSession()
    console.log(session);

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form action="" className="lg:w-[50%] md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-[60%] md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
                <div className="flex flex-col justify-start">
                    <h1 className={`text-center text-white text-3xl ${Palanquin_DarkFont.className}`}>Admin Login</h1 >
                </div>
                <FormControl isRequired>
                    <FormLabel className="text-white">Email address</FormLabel>
                    <Input type='email' className="text-white" />
                    <FormLabel className="text-white mt-2">Password</FormLabel>
                    <Input type='password' className="text-white" />
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
        </div >
    )
}