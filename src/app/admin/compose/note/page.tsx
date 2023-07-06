"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Palanquin_Dark } from "next/font/google";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const Palanquin_DarkFont = Palanquin_Dark({
  weight: ["400", "500"],
  subsets: ["latin"],
});


export const Page = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);

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
    const noteData = {
      subject,
      topic,
      url
    }

    const headers = {
      "Content-Type": "application/json",
    };

    const data = await fetch("/api/note", {
      method: "POST",
      headers,
      body: JSON.stringify(noteData),
    });

    console.log(data);

    if (data) {
      setSuccess(true);
      handleSuccess();
    } else {
      throw Error("Internal Server Error")
    }

  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin" });
  };

  return (
    <div className="flex flex-col relative items-center justify-center w-full mb-5 h-screen">
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
          className="bg-[#519cf8] mt-3"
          variant={"solid"}
          _hover={{ bg: "#83b8f9" }}
          as="a"
          href="/admin/compose/blog"
          size="sm"
        >
          Create Blog
        </Button>
      </div>

      {success && (
        <p className="text-green-400 mt-6 mb-6 text-2xl underline">
          Note was added successfully!
        </p>
      )}

      <form onSubmit={submit} className="lg:w-[60%]  flex-wrap md:w-[70%] w-full p-5 flex flex-col gap-8 lg:h-fit md:h-[50%] sm:h-[50%] justify-center border border-slate-300 bg-[#2b343b]">
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
            className="text-white mb-5"
            onChange={(e) => setSubject(e.target.value)}
            as={"input"}
          />
          <FormLabel className="text-white mt-2">Topic</FormLabel>
          <Input
            type="text"
            className="text-white mb-8"
            as={"input"}
            onChange={(e) => setTopic(e.target.value)}
          />
          <FormLabel className="text-white mt-2">Url</FormLabel>
          <Input
            type="text"
            className="text-white mb-8"
            as={"input"}
            onChange={(e) => setUrl(e.target.value)}
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
  );
};

export default Page;
