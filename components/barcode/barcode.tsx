import { Text, Accordion, Center, Box, Spinner } from "@chakra-ui/react";
import { useUserInfo } from "lib/clientFetchResources";

export const Barcode: React.FC<{}> = () => {
  const { res } = useUserInfo();

  if (!res)
    return (
      <Center
        w="100%"
        h="100%"
        backgroundColor="gray.700"
        borderColor="gray.600"
        borderRadius={15}
        borderWidth="1px"
      >
        <Spinner />
      </Center>
    );

  return (
    <Box
      p={5}
      w="100%"
      h="100%"
      backgroundColor="gray.700"
      borderColor="gray.600"
      borderRadius={15}
      borderWidth="1px"
    ></Box>
  );
};
