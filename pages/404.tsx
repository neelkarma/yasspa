import { Grid, Center, VStack, Heading, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import type { NextPage } from "next";
const FourOhFour: NextPage = () => (
  <Grid minH="100vh">
    <Center>
      <VStack spacing={5}>
        <Heading size="3xl">404</Heading>
        <Text fontSize="xl">
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
