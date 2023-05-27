"use client"
import { Button, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from "@chakra-ui/react";


export default function BlogCard({ title, content }: { title: string, content: string }) {
    return <Card maxW='sm' bg="blue.300">
        <CardBody>
            <Stack spacing='3'>
                <Heading size='md'>{title.substring(0, 32)}
                    {title.length > 32 && <Text as={"span"}>...</Text>}
                </Heading>
                <Text>
                    {content.substring(0, 100)}
                    <Text as={"span"}>  ...</Text>
                </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button variant='ghost' colorScheme='blue' _hover={{ bg: "#8bc9f6" }}>
                Read More
            </Button>
        </CardFooter>
    </Card>
}