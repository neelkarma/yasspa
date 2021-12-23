import { Grid, Center, VStack, Heading, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";
import type { NextPage } from "next";
const FourOhFour: NextPage = () => (
  <Grid minH="100vh" p={5}>
    <Head>
      <title>404 | YASSPA</title>
    </Head>
    <Center>
      <VStack spacing={5}>
        <Heading size="3xl">404</Heading>
        <Text fontSize="xl" textAlign="center">
          Whoops! Looks like that page doesn&apos;t exist.
        </Text>
        <NextLink href="/">
          <Button colorScheme="blue" size="lg">
            Head back to safety
          </Button>
        </NextLink>
      </VStack>
    </Center>
  </Grid>
);
export default FourOhFour;
