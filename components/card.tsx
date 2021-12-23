import { Box, BoxProps, Center, CenterProps } from "@chakra-ui/react";
import { useCardColors } from "lib/theme";
import { FC } from "react";

export const Card: FC<BoxProps> = ({ children, ...props }) => {
  const cardStyles = useCardColors();
  return (
    <Box
      p={5}
      w="100%"
      h="100%"
      borderRadius={15}
      borderWidth="1px"
      {...cardStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

export const CenterCard: FC<CenterProps> = ({ children, ...props }) => {
  const cardStyles = useCardColors();
  return (
    <Center
      p={5}
      w="100%"
      h="100%"
      borderRadius={15}
      borderWidth="1px"
      {...cardStyles}
      {...props}
    >
      {children}
    </Center>
  );
};
