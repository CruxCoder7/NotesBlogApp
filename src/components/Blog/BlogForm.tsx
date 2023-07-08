import "@uploadthing/react/styles.css";
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React, { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction } from 'react'
import { UploadButton } from '../../utils/uploadthing';
import { Palanquin_Dark } from "next/font/google";
import { ImageFiles } from "../../app/admin/compose/page";

const Palanquin_DarkFont = Palanquin_Dark({
    weight: ["400", "500"],
    subsets: ["latin"],
});

const BlogForm = ({ onSubmit, onInputChange, setFile }: { onSubmit: FormEventHandler<HTMLFormElement> | undefined, onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined, setFile: Dispatch<SetStateAction<ImageFiles[] | undefined>> }) => {
    return (
        <div className="flex flex-col relative items-center justify-center w-full h-screen">
            <form onSubmit={onSubmit} className="lg:w-[60%] lg:md:mt-0 mt-20 flex-wrap md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-[80%] md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
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
                        onChange={onInputChange}
                        as={"input"}
                        required
                    />
                    <FormLabel className="text-white mt-2">Content</FormLabel>
                    <Textarea
                        className="text-white mb-8"
                        name="content"
                        id="content"
                        rows={7}
                        onChange={onInputChange}
                        as={"textarea"}
                        resize={"none"}
                    />
                    <div className="flex justify-start">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                alert(`Upload Completed`);
                                setFile(res);
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
    )
}

export default BlogForm