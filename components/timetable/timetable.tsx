import {
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useTimetable } from "lib/clientFetchResources";
import { useMutedTextColor } from "lib/theme";
import { FC, useState } from "react";
import { DayLabel } from "./daylabel";
import { PeriodLabel } from "./periodlabel";

export const Timetable: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { res } = useTimetable();
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={5}>
          {res ? (
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(5, 1fr)"
              rowGap={2}
              columnGap={1}
            >
              {Object.values(res.data.days).map((day, i) => (
                <GridItem key={i}>
                  <Grid templateRows="repeat(6, 1fr)" rowGap={1}>
                    <DayLabel>
                      {[
                        day.dayname.slice(0, 3),
                        " ",
                        day.dayname.slice(3),
                      ].join("")}
                    </DayLabel>
                    {Object.values(day.periods).map(
                      ({ title: short, room, fullTeacher: teacher }, i) => {
                        const { title: long } = Object.values(
                          res.data.subjects
                        ).find((sub) => sub.shortTitle === short)!;

                        return (
                          <PeriodLabel
                            short={short}
                            long={long}
                            teacher={teacher}
                            room={room}
                            onMouseOver={setHoveredClass}
                            isHovered={short === hoveredClass}
                            key={i}
                          />
                        );
                      }
                    )}
                  </Grid>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Spinner />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
