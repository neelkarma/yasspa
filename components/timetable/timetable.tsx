import {
  Center,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { SettingsContext } from "components/contexts";
import { useTimetable, useToday } from "lib/clientFetchResources";
import { FC, useContext, useState } from "react";
import { DayLabel } from "./daylabel";
import { PeriodLabel } from "./periodlabel";

export const Timetable: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { res } = useTimetable();
  const { res: todayRes } = useToday();
  const { debug } = useContext(SettingsContext);
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  if (res && debug) console.log("timetable", res);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton /> {/*TODO: How to make closing the modal cleaner? */}
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
                    <DayLabel
                      isToday={
                        day.dayname ===
                        todayRes.data.timetable.timetable.dayname
                      }
                    >
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
            <Center>
              <Spinner />
            </Center>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
