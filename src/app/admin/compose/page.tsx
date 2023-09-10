"use client"
import BlogForm from "@/components/Blog/BlogForm"
import Loading from "@/components/Loading/Loading"
import NoteForm from "@/components/Notes/NoteForm"
import { Button } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export type ImageFiles = {
  fileUrl: string
  fileKey: string
}

function Page() {
  const [formType, setFormType] = useState<"note" | "blog" | null>("blog")
  const [formData, setFormData] = useState<any>({})
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState<ImageFiles[] | undefined>([])

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  if (!session) {
    redirect("/admin")
  }

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    if (formType === "blog") {
      const postData = {
        title: formData.title,
        content: formData.content,
        image: file && file[0],
      }
      const headers = {
        "Content-Type": "application/json",
      }
      const data = await fetch("/api/blog", {
        method: "POST",
        headers,
        body: JSON.stringify(postData),
      })

      if (!data.ok && file) {
        const imgData = {
          fileKey: file[0].fileKey,
        }

        await fetch("/api/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imgData),
        })

        alert("Internal Server Error")
      } else {
        setSuccess(true)
        handleSuccess()
      }
    }
    if (formType === "note") {
      const noteData = {
        subject: formData.subject,
        topic: formData.topic,
        url: formData.url,
      }
      const headers = {
        "Content-Type": "application/json",
      }
      const data = await fetch("/api/note", {
        method: "POST",
        headers,
        body: JSON.stringify(noteData),
      })
      if (!data) throw new Error("Internal Server Error")
      setSuccess(true)
      handleSuccess()
    }
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormData((prevData: any) => ({ ...prevData, [name]: value }))
  }

  const renderForm = () => {
    if (formType === "note") {
      return (
        <NoteForm
          onSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      )
    } else if (formType === "blog") {
      return (
        <BlogForm
          onSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
          setFile={setFile}
        />
      )
    }
    return null
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin" })
  }

  return (
    <>
      <title>Compose</title>
      <div className="flex flex-col items-center min-h-screen mt-10 mb-5">
        <div className="absolute lg:md:top-0 lg:md:right-5 top-0 right-2">
          <Button
            className="bg-[#f85151] mt-3"
            variant={"solid"}
            _hover={{ bg: "#f79f9f" }}
            onClick={handleLogout}
            as="button"
            size={{ base: "xs", md: "sm" }}
          >
            Log Out
          </Button>
        </div>
        <div className="tabs">
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            onClick={() => setFormType("blog")}
          />
          <label className={"tab"} htmlFor="radio-2">
            Blog
          </label>
          <input
            type="radio"
            id="radio-3"
            name="tabs"
            onClick={() => setFormType("note")}
          />
          <label className="tab" htmlFor="radio-3">
            Note
          </label>
          <span className="glider"></span>
        </div>
        {success && (
          <p className="text-green-400 mt-6 mb-6 text-2xl underline">
            {formType === "blog"
              ? "Blog was created successfully!"
              : "Note was created successfully!"}
          </p>
        )}
        {renderForm()}
      </div>
    </>
  )
}

export default Page
