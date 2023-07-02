"use client"

import "@uploadthing/react/styles.css"

import { UploadDropzone, UploadButton, Uploader, uploadFiles } from "../../utils/uploadthing"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res)
                    alert("Upload Completed")
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`)
                }}
            />
        </main>
    )
}
