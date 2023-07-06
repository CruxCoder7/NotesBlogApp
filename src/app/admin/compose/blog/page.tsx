"use client";
import "@uploadthing/react/styles.css";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { UploadButton } from "../../../../utils/uploadthing";
import { Palanquin_Dark } from "next/font/google";
import { utapi } from "uploadthing/server";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const Palanquin_DarkFont = Palanquin_Dark({
    weight: ["400", "500"],
    subsets: ["latin"],
});

type ImageFiles = {
    fileUrl: string;
    fileKey: string;
};

export const Page = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [success, setSuccess] = useState(false);
    const [files, setFiles] = useState<ImageFiles[] | undefined>([]);

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />
    }

    if (!session) {
        redirect("/admin");
    }

    const handleSuccess = () => {
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const postData = {
            title,
            content,
            images: files && files.map((file) => file.fileUrl),
        };

        const headers = {
            "Content-Type": "application/json",
        };

        const data = await fetch("/api/blog", {
            method: "POST",
            headers,
            body: JSON.stringify(postData),
        });

        if (!data) {
            await utapi.deleteFiles(postData.images as string[]);
        } else {
            setSuccess(true);
            handleSuccess();
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/admin" });
    };

    return (
        <div className="flex flex-col mb-5 relative items-center justify-center w-full h-screen">
            <div className="absolute lg:md:top-5 lg:md:right-5 top-2 right-2">
                <Button
                    className="bg-[#f85151] mt-3"
                    variant={"solid"}
                    _hover={{ bg: "#f79f9f" }}
                    onClick={handleLogout}
                    as="button"
                    size="sm"
                >
                    Log Out
                </Button>
            </div>
            <div className="absolute lg:md:top-5 lg:md:left-5 top-2 left-2">
                <Button
                    className="bg-[#53b2f9] mt-3"
                    variant={"solid"}
                    _hover={{ bg: "#a3d3f7" }}
                    as="a"
                    href="/admin/compose/note"
                    size="sm"
                >
                    Add Notes
                </Button>
            </div>
            {success && (
                <p className="text-green-400 mt-6 mb-6 text-2xl underline">
                    Blog was created successfully!
                </p>
            )}

            <form onSubmit={submit} className="lg:w-[60%] lg:md:mt-0 mt-20 flex-wrap md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-fit md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
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
                        className="text-white mb-5"
                        onChange={(e) => setTitle(e.target.value)}
                        as={"input"}
                        required
                    />
                    <FormLabel className="text-white mt-2">Content</FormLabel>
                    <Textarea
                        className="text-white mb-8"
                        rows={7}
                        onChange={(e) => setContent(e.target.value)}
                        as={"textarea"}
                        resize={"none"}
                    />
                    <div className="flex justify-start">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                alert(`Upload Completed`);
                                setFiles(res);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
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
    );
};

export default Page;
