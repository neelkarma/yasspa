import { Center, Box, Spinner } from "@chakra-ui/react";
import { useUserInfo } from "lib/clientFetchResources";
import { useCardColors } from "lib/theme";

export const Profile: React.FC<{}> = () => {
  const { res } = useUserInfo();
  const cardStyles = useCardColors();

  if (!res)
    return (
      <Center
        w="100%"
        h="100%"
        borderRadius={15}
        borderWidth="1px"
        {...cardStyles}
      >
        <Spinner />
      </Center>
    );

  return (
    <Box
      p={5}
      w="100%"
      h="100%"
      {...cardStyles}
      borderRadius={15}
      borderWidth="1px"
    ></Box>
  );
};