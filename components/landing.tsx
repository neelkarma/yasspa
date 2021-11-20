import React from "react";
import { Button } from "@chakra-ui/button";
import {
  Center,
  Grid,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export const Landing: React.FC<{}> = () => (
  <Grid minH="100vh">
    <Center>
      <VStack spacing={5}>
        {/* TODO: Add logo here */}
        <Heading size="3xl">YASSPA</Heading>
        <Text fontSize="xl">
          Welcome to YASSPA, yet another SBHS Student Portal alternative.
        </Text>
        <Alert status="warning">
          <AlertIcon />
          <strong>
            Warning: Things are still very much in development and you should
            not be using this. I&apos;m warning you, things are going to break.{" "}
          </strong>
        </Alert>
        {/* eslint-disable-next-line */}
        <a href="/api/auth/login">
          <Button colorScheme="blue" size="lg">
            Log In
          </Button>
        </a>
      </VStack>
    </Center>
  </Grid>
);
