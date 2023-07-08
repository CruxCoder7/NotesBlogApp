import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { ChangeEventHandler, FormEventHandler } from 'react'
import { Palanquin_Dark } from "next/font/google";

const Palanquin_DarkFont = Palanquin_Dark({
    weight: ["400", "500"],
    subsets: ["latin"],
});


const NoteForm = ({ onSubmit, onInputChange }: { onSubmit: FormEventHandler<HTMLFormElement> | undefined, onInputChange: ChangeEventHandler<HTMLInputElement> | undefined }) => {
    return (
        <div className="flex flex-col relative items-center justify-center w-full h-screen">
            <form onSubmit={onSubmit} className="lg:w-[60%] lg:md:mt-0 mt-20 flex-wrap md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-[80%] md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
                <div className="flex flex-col justify-start">
                    <h1
                        className={`text-center text-white text-3xl ${Palanquin_DarkFont.className}`}
                    >
                        Compose Note
                    </h1>
                </div>
                <FormControl isRequired as={"div"}>
                    <FormLabel className="text-white" as={"label"}>
                        Subject
                    </FormLabel>
                    <Input
                        type="text"
                        name="subject"
                        id="subject"
                        className="text-white mb-5"
                        onChange={onInputChange}
                        as={"input"}
                    />
                    <FormLabel className="text-white mt-2">Topic</FormLabel>
                    <Input
                        type="text"
                        name="topic"
                        id="topic"
                        className="text-white mb-8"
                        as={"input"}
                        onChange={onInputChange}
                    />
                    <FormLabel className="text-white mt-2">Url</FormLabel>
                    <Input
                        type="text"
                        name="url"
                        id="url"
                        className="text-white mb-8"
                        as={"input"}
                        onChange={onInputChange}
                    />
                </FormControl>
                <Button
                    type="submit"
                    className="bg-[#53b2f9] w-full mt-5 shadow-xl shadow-[#284c67]"
                    variant={"solid"}
                    _hover={{ bg: "#a9d3f3" }}
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default NoteForm