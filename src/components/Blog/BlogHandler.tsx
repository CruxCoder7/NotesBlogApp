"use client"
import "@uploadthing/react/styles.css"

import { posts } from "@prisma/client"
import Loading from "../Loading/Loading"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { ImageFiles } from "../../app/admin/compose/page"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react"
import { UploadButton } from "../../utils/uploadthing"
import { Palanquin_Dark } from "next/font/google"

const Palanquin_DarkFont = Palanquin_Dark({
  weight: ["400", "500"],
  subsets: ["latin"],
})

export default function BlogHandler({ blog }: { blog: posts | null }) {
  const [title, setTitle] = useState<string | undefined>(blog?.title)
  const [content, setContent] = useState<string | undefined>(blog?.content)
  const [file, setFile] = useState<ImageFiles[] | undefined>([])

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  if (!session) {
    redirect("/admin")
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    const postUpdateData: Partial<posts> = {}

    postUpdateData.id = blog?.id
    if (title) postUpdateData.title = title
    if (content) postUpdateData.content = content
    if (file) postUpdateData.image = file[0]

    const headers = {
      "Content-Type": "application/json",
    }

    const data = await fetch("/api/blog/update", {
      method: "POST",
      headers,
      body: JSON.stringify(postUpdateData),
    })

    if (!data.ok) {
      alert("Internal Server Error")
    } else {
      window.location.href = "/"
    }
  }

  return (
    <div className="flex flex-col relative items-center justify-center w-full h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="lg:w-[60%] lg:md:mt-0 mt-20 flex-wrap md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-[80%] md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]"
      >
        <div className="flex flex-col justify-start">
          <h1
            className={`text-center text-white text-3xl ${Palanquin_DarkFont.className}`}
          >
            Compose Blog
          </h1>
        </div>
        <FormControl isRequired as={"div"}>
          <FormLabel className="text-white" as={"label"}>
            Title
          </FormLabel>
          <Input
            type="text"
            name="title"
            id="title"
            className="text-white mb-5"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            as={"input"}
            required
          />
          <FormLabel className="text-white mt-2">Content</FormLabel>
          <Textarea
            className="text-white mb-8"
            name="content"
            id="content"
            rows={7}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            as={"textarea"}
            resize={"none"}
          />
          <div className="flex justify-start">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                alert(`Upload Completed`)
                setFile(res)
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`)
              }}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#53b2f9] w-full mt-5 shadow-xl shadow-[#284c67]"
            variant={"solid"}
            _hover={{ bg: "#a9d3f3" }}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  )
}
