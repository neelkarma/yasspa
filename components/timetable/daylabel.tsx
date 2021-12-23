import { GridItem } from "@chakra-ui/react";
import { useMutedTextColor } from "lib/theme";
import { FC } from "react";

export const DayLabel: FC<{ isToday?: boolean }> = ({ children, isToday }) => {
  const mutedTextColor = useMutedTextColor();
  return (
    <GridItem color={isToday ? "blue.300" : mutedTextColor} textAlign="center">
      {children}
    </GridItem>
  );
};
