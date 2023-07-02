"use client"
import "@uploadthing/react/styles.css"
import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { UploadDropzone, UploadButton } from "../../../../utils/uploadthing"
import { Palanquin_Dark } from "next/font/google"
import { utapi } from "uploadthing/server";
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Palanquin_DarkFont = Palanquin_Dark({ weight: ["400", "500"], subsets: ["latin"] })

type ImageFiles = {
    fileUrl: string
    fileKey: string,
}

export const Page = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [files, setFiles] = useState<ImageFiles[] | undefined>([])

    const { data: session, status } = useSession()

    if (!session) {
        redirect("/admin")
    }

    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const postData = {
            title,
            content,
            images: files && files.map((file) => file.fileUrl)
        };

        const headers = {
            "Content-Type": "application/json",
        };

        const data = await fetch("/api/blog", {
            method: "POST",
            headers,
            body: JSON.stringify(postData)
        })

        if (!data) {
            await utapi.deleteFiles(postData.images as string[])
        }
    }

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/admin" });
    }

    return (
        <div className="flex relative items-center justify-center w-full h-screen">
            <div className="absolute top-0 right-0">
                <Button
                    type="submit"
                    className="bg-[#f85151] mt-3"
                    variant={"solid"}
                    _hover={{ bg: "#f79f9f" }}
                    onClick={handleLogout}
                    as="button"
                >
                    Log Out
                </Button>
            </div>
            <form className="lg:w-[60%] md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-fit md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
                <div className="flex flex-col justify-start">
                    <h1 className={`text-center text-white text-3xl ${Palanquin_DarkFont.className}`}>Compose Blog</h1 >
                </div>
                <FormControl isRequired as={"div"}>
                    <FormLabel className="text-white" as={"label"}>Title</FormLabel>
                    <Input type='text' className="text-white mb-5" onChange={(e) => setTitle(e.target.value)} as={"input"} />
                    <FormLabel className="text-white mt-2">Content</FormLabel>
                    <Textarea className="text-white mb-8" rows={7} onChange={(e) => setContent(e.target.value)} as={"textarea"} resize={'none'} />
                    <div className="flex justify-start w-full h-full">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                alert(`Upload Completed`)
                                setFiles(res)
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`)
                            }}
                        />
                    </div>
                </FormControl>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-[#53b2f9] mt-3"
                        variant={"solid"}
                        _hover={{ bg: "#a9d3f3" }}
                        onClick={submit}
                        as="button"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default Page;
