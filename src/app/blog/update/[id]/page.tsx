import { prisma } from "../../../../db"
import BlogHandler from "@/components/Blog/BlogHandler"

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await prisma.posts.findFirst({
    where: {
      id: params.id,
    },
  })

  return (
    <>
      <title>Update Blog</title>
      <BlogHandler blog={blog} />
    </>
  )
}
