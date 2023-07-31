"use client"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import { GrUpdate } from "react-icons/gr"
import { AiFillDelete } from "react-icons/ai"

export default function BlogCard({
  title,
  content,
  id,
  mutate,
}: {
  title: string
  content: string
  id: string
  mutate: boolean
}) {
  const handleDelete = async () => {
    const postDeleteData = { id }

    const headers = {
      "Content-Type": "application/json",
    }

    const data = await fetch("/api/blog/delete", {
      method: "POST",
      headers,
      body: JSON.stringify(postDeleteData),
    })

    if (!data.ok) {
      alert("Internal Server Error")
    } else {
      window.location.reload()
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card
        minW="xs"
        maxW="sm"
        bg="blue.300"
        className="sm:w-[50%] hover:shadow-lg hover:shadow-[#429de3]"
      >
        <CardBody>
          <Stack spacing="3">
            <Heading size="md">
              {title.substring(0, 32)}
              {title.length > 32 && <Text as={"span"}>...</Text>}
            </Heading>
            <Text>
              {content.substring(0, 100)}
              <Text as={"span"}>{content.length > 100 && "..."}</Text>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex justifyContent={"space-between"} className="w-full">
            <Button
              variant="ghost"
              colorScheme="blue"
              _hover={{ bg: "#8bc9f6" }}
              as={"a"}
              href={`/blog/${id}`}
            >
              Read More
            </Button>
            <div className="">
              {mutate && (
                <>
                  <Button
                    variant={"ghost"}
                    _hover={{ bg: "#6aee86" }}
                    as={"a"}
                    href={`/blog/update/${id}`}
                  >
                    <GrUpdate />
                  </Button>
                  <Button
                    variant={"ghost"}
                    _hover={{ bg: "#ee6a6a" }}
                    onClick={onOpen}
                  >
                    <AiFillDelete />
                  </Button>
                </>
              )}
            </div>
          </Flex>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"#586874"}>
          <ModalHeader>Do you want to delete this blog?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              className="text-white"
              _hover={{ bg: "gray.400" }}
            >
              Close
            </Button>
            <Button
              className="bg-red-600"
              onClick={handleDelete}
              _hover={{ bg: "red.600" }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
