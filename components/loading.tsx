import { FC } from "react";
import { Center, Spinner } from "@chakra-ui/react";

export const Loading: FC<{}> = () => (
  <Center minH="100vh">
    <Spinner />
  </Center>
);
