import {
  GridItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCardHoverColor, useMutedTextColor } from "lib/theme";
import { FC, memo } from "react";

const MotionText = motion<TextProps>(Text);

export const FreePeriodLabel: FC<{
  isHovered?: boolean;
  onMouseOver: (short: string) => void;
}> = memo(({ isHovered, onMouseOver }) => {
  const hoverColor = useCardHoverColor();
  const mutedTextColor = useMutedTextColor();

  return (
    <Popover>
      <PopoverTrigger>
        <GridItem
          onMouseOver={() => onMouseOver("-")}
          backgroundColor={isHovered ? hoverColor : undefined}
          transitionDuration="100ms"
          transitionTimingFunction="ease-out"
          textAlign="center"
          borderRadius="5px"
          cursor="pointer"
          userSelect="none"
          p={{ base: undefined, md: 1 }}
        >
          -
        </GridItem>
      </PopoverTrigger>
      <PopoverContent maxW="max-content" p={1}>
        <PopoverBody textAlign="center">
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
          >
            Free Period
          </MotionText>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
