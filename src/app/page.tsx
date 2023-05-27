import BlogCard from "@/components/BlogCard";
import { Palanquin_Dark, Kanit } from "next/font/google"
import { prisma } from "../db";

const Palanquin_DarkFont = Palanquin_Dark({ weight: ["400", "500"], subsets: ["latin"] })

export default async function Home() {

  const blogs = await prisma.posts.findMany()

  return (
    <>
      <main className="min-h-screen w-full bg-[#1e272e] items-center p-4">
        <h1 className={`text-3xl text-white text-center mt-5 ${Palanquin_DarkFont.className}`}>Blogs</h1>
        <div className="flex flex-wrap mt-32 gap-32 justify-center mb-3">
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} />;
          })}
        </div>
      </main>
    </>
  )
}
