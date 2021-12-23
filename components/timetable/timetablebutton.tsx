import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { Timetable } from "./timetable";

export const TimetableButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button w="100%" h="3.5rem" fontSize="xl" mt={3} onClick={onOpen}>
        View Full Timetable
      </Button>
      <Timetable isOpen={isOpen} onClose={onClose} />
    </>
  );
};
