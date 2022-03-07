import { Box, Flex, Spacer, Text, type TextProps } from "@chakra-ui/react";
import { useCardHoverColor, useMutedTextColor } from "lib/theme";
import { motion } from "framer-motion";

const MotionText = motion<TextProps>(Text);

export const FreePeriod: React.FC = () => {
  const mutedTextColor = useMutedTextColor();
  const cardHoverColor = useCardHoverColor();

  return (
    <Flex
      w="100%"
      px={3}
      py={4}
      borderRadius={10}
      transitionDuration="100ms"
      transitionTimingFunction="ease-out"
      _hover={{ backgroundColor: cardHoverColor }}
    >
      <Box alignSelf="center">
        <MotionText
          animate={{
            filter: "hue-rotate(360deg)",
            transition: {
              type: "tween",
              ease: "linear",
              duration: 3,
              repeat: Infinity,
            },
          }}
          background="
          linear-gradient(
            120deg,
            rgb(220, 64, 48),
            rgb(255, 206, 51),
            rgb(112, 183, 76)
          )
        "
          backgroundClip="text"
          color="transparent"
          fontWeight="bold"
          fontSize="1.3rem"
        >
          Free Period
        </MotionText>
      </Box>
      <Spacer minW="12px" />
      <Text fontSize="1.2rem" alignSelf="center">
        -
      </Text>
    </Flex>
  );
};
