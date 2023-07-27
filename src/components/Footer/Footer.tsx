"use client"
import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { FaInstagram, FaLinkedin, FaBook, FaCode } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai";
import LogoImg from "../../../public/logo.png"
import { signOut, useSession } from "next-auth/react"

const Logo = (props: any) => {
  return (
    <Link href="/">
      <Image src={LogoImg} alt="logo" height={60}></Image>
    </Link>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      target="_blank"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin" })
  }

  const { data: session } = useSession()

  return (
    <Box
      bg={useColorModeValue("#2b343b", "gray.900")}
      color={useColorModeValue("white", "gray.200")}
      className="h-fit border-t-2 border-t-gray-700"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "row", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Stack direction={"column"} spacing={6}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <FaBook />
            <Text className="px-2 text-center"> by Abdullah Sheriff </Text>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <FaCode />
            <Text className="px-2 text-center">with ❤️ by Akash</Text>
          </Flex>
        </Stack>
        <Stack direction={"column"} spacing={{ base: "6", md: "4" }}>
          <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"} gap="1">

            <SocialButton
              label={"Email"}
              href={"mailto:sheriffabdullahcontact@gmail.com"}
            >
              <AiOutlineMail />
            </SocialButton>

          </Flex>
          <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"} gap="1">
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/in/akash-rangesh-3bb445249/"}
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/akash._.77"}
            >
              <FaInstagram />
            </SocialButton>
          </Flex>
        </Stack>
        {/* 
        {session && (
          <Button variant={"link"} color={"white"} onClick={handleLogout}>
            Log out
          </Button>
        )} */}

      </Container>
    </Box>
  )
}
