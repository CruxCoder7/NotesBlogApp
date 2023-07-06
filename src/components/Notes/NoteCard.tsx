"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function NoteCard({
  subject,
  topic,
  url
}: {
  subject: string;
  topic: string;
  url: string
}) {
  return (
    <Card minW="xs" maxW="xs" minH="56" bg="blue.300" className="drop-shadow-2xl">
      <CardBody>
        <Stack>
          <Heading size="md">
            {subject}
          </Heading >
          <Text>{topic}</Text>
        </Stack >
      </CardBody >
      <Divider />
      <CardFooter className="mt-4">
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
      </CardFooter>
    </Card >
  );
}
