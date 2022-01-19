import {
  GridItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useCardHoverColor, useMutedTextColor } from "lib/theme";
import { FC, memo } from "react";

export const PeriodLabel: FC<{
  short: string;
  long: string;
  teacher: string;
  room: string | null;
  isHovered?: boolean;
  onMouseOver: (short: string) => void;
}> = memo(({ short, long, teacher, room, isHovered, onMouseOver }) => {
  const hoverColor = useCardHoverColor();
  const mutedTextColor = useMutedTextColor();
  const showDot = !!teacher || !!room;

  return (
    <Popover>
      <PopoverTrigger>
        <GridItem
          onMouseOver={() => onMouseOver(short)}
          backgroundColor={isHovered ? hoverColor : undefined}
          transitionDuration="100ms"
          transitionTimingFunction="ease-out"
          textAlign="center"
          borderRadius="5px"
          cursor="pointer"
          userSelect="none"
          p={{ base: undefined, md: 1 }}
        >
          {short}
        </GridItem>
      </PopoverTrigger>
      <PopoverContent maxW="max-content" p={1}>
        <PopoverBody textAlign="center">
          <Text fontWeight="bold">{long}</Text>
          <Text color={mutedTextColor}>
            {teacher}
            {showDot ? <> &middot; </> : null}
            {room ? `Room ${room}` : null}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
