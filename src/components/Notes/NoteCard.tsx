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
import { AiFillDelete } from "react-icons/ai"
import { GrUpdate } from "react-icons/gr"

export default function NoteCard({
  subject,
  topic,
  url,
  mutate,
  id,
}: {
  subject: string
  topic: string
  url: string
  mutate: boolean
  id: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    const noteDeleteData = { id }

    const headers = {
      "Content-Type": "application/json",
    }

    const data = await fetch("/api/note/delete", {
      method: "POST",
      headers,
      body: JSON.stringify(noteDeleteData),
    })

    if (!data.ok) {
      alert("Internal Server Error")
    } else {
      window.location.reload()
    }
  }
  
  return (
    <>
      <Card
        minW="xs"
        maxW="xs"
        minH="56"
        bg="blue.300"
      >
        <CardBody>
          <Stack>
            <Heading size="md">{subject}</Heading>
            <Text>{topic}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter className="mt-4">
          <Flex justifyContent={"space-between"} className="w-full">
            <Button
              variant="ghost"
              colorScheme="blue"
              _hover={{ bg: "#8bc9f6" }}
              as={"a"}
              href={url}
              target="_blank"
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
                    href={`/notes/update/${id}`}
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
          <ModalHeader>Do you want to delete this note?</ModalHeader>
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
