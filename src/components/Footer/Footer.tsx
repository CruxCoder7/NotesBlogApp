"use client"
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import LogoImg from "../../../public/logo.png"


const Logo = (props: any) => {
    return (
        <Link href="/">
            <Image
                src={LogoImg}
                alt="logo"
                height={60}
            >
            </Image>
        </Link>
    );
};

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('#2b343b', 'gray.900')}
            color={useColorModeValue('white', 'gray.200')}
            className='h-fit'>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Logo />
                <Text>Made with ❤️ by Akash.</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/akash-rangesh-3bb445249/'}>
                        <FaLinkedin />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'https://www.instagram.com/akash._.77'} >
                        <FaInstagram />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}