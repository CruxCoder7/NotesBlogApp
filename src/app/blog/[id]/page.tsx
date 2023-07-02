import { prisma } from "../../../db";
import { Palanquin_Dark } from "next/font/google"
import Image from "next/image";

const Palanquin_DarkFont = Palanquin_Dark({ weight: ["400", "500"], subsets: ["latin"] })

export default async function Page({ params }: { params: { id: string } }) {
    const data = await prisma.posts.findFirst({
        where: {
            id: params.id
        }
    })

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className={`text-white text-4xl md:text-5xl flex items-center justify-center h-fit w-full text-center mb-3  ${Palanquin_DarkFont.className} `}>
                {data?.title as string}
            </h1>
            <Image src={data?.images[0] as string} alt="img" width={300} height={100} className=" object-cover" />

            <div className="flex flex-col items-center h-fit lg:w-[70%] w-full border md:text-2xl lg:text-lg border-blue-400 p-5 mt-6 whitespace-pre-wrap">
                <div className="text-white" >
                    {data?.content as string}
                </div>
            </div>
        </div>
    );
}