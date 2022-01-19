import { GridItem } from "@chakra-ui/react";
import { useMutedTextColor } from "lib/theme";
import { FC, memo } from "react";

export const DayLabel: FC<{ isToday?: boolean }> = memo(
  ({ children, isToday }) => {
    const mutedTextColor = useMutedTextColor();
    return (
      <GridItem
        color={isToday ? "blue.300" : mutedTextColor}
        textAlign="center"
        p={{ base: undefined, md: 1 }}
      >
        {children}
      </GridItem>
    );
  }
);
