import BlogCard from "@/components/Blog/BlogCard";
import { Palanquin_Dark } from "next/font/google";
import { prisma } from "../db";

const Palanquin_DarkFont = Palanquin_Dark({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const revalidate = 30 // revalidate every 30s


async function getBlogs() {
  const blogs = await prisma.posts.findMany();
  return blogs;
}

export default async function Home() {

  const blogs = await getBlogs()

  return (
    <>
      <main className="min-h-screen w-full bg-[#1e272e] items-center">
        <h1
          className={`text-4xl text-white text-center mt-5 ${Palanquin_DarkFont.className}`}
        >
          Blogs
        </h1>
        <div className="flex flex-wrap mt-32 gap-32 justify-center items-center w-full">
          {blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
              />
            );
          })}
        </div >
      </main >
    </>
  );
}
