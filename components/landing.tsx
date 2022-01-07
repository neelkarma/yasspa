import { FC } from "react";
import { Button } from "@chakra-ui/button";
import {
  Center,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Link from "next/link";

export const Landing: FC<{}> = () => (
  <Center minH="100vh" p={5} textAlign="center">
    <VStack spacing={5}>
      {/* TODO: Add logo here */}
      <Heading size="3xl">YASSPA</Heading>
      <Text fontSize="xl">
        Welcome to YASSPA, yet another SBHS Student Portal alternative.
      </Text>
      <Alert status="info">
        <AlertIcon />
        <strong>
          Please don&apos;t nag me about obvious bugs as I&apos;m probably aware
          of all of them. Fixes (as well as new features) will be coming
          soon&trade;.
        </strong>
      </Alert>
      <Link href="/api/auth/login" passHref>
        <Button colorScheme="blue" size="lg">
          Log In
        </Button>
      </Link>
    </VStack>
  </Center>
);
