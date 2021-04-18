import React from "react";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";

const Landing: React.FC<{}> = () => {
  return (
    <Box>
      <Grid minH="100vh">
        <Center>
          <VStack spacing={5}>
            {/* TODO: Add logo here */}
            <Heading size="3xl">YASSPA</Heading>
            <Text fontSize="xl">
              Welcome to YASSPA, yet another SBHS Student Portal alternative.
            </Text>
            <Link href="/auth/login" _hover={undefined}>
              <Button colorScheme="blue" size="lg">
                Log In
              </Button>
            </Link>
          </VStack>
        </Center>
      </Grid>
    </Box>
  );
};

export default Landing;
