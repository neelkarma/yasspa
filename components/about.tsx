import {
  Code,
  Heading,
  Link,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMutedTextColor } from "lib/theme";
import { FC } from "react";
import { IoInformationCircle } from "react-icons/io5";

export const AboutButton: FC<{
  version: { hash: string | null; date: string };
}> = ({ version }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <About isOpen={isOpen} version={version} onClose={onClose} />
      <MenuItem onClick={onOpen}>
        <IoInformationCircle
          style={{
            fontSize: "1.2rem",
            marginRight: "10px",
          }}
        />
        <span>About</span>
      </MenuItem>
    </>
  );
};

export const About: FC<{
  isOpen: boolean;
  version: {
    hash: string | null;
    date: string;
  };
  onClose: () => void;
}> = ({ isOpen, version, onClose }) => {
  const mutedTextColor = useMutedTextColor();
  const { hash, date } = version;
  const dateFormatted = new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={10} textAlign="center">
          <VStack>
            <Heading size="2xl">YASSPA</Heading>
            <Text fontSize="xl">
              Made with ❤️ by{" "}
              <Code fontSize="lg">
                <Link href="https://iamkneel.tk" isExternal>
                  iamkneel
                </Link>
              </Code>
            </Text>
            <Text color={mutedTextColor}>
              {hash ? (
                <>
                  Built from commit{" "}
                  <Link
                    href={`https://www.github.com/neelkarma/yasspa/commit/${hash}`}
                    fontFamily="mono"
                    fontWeight="bold"
                    isExternal
                  >
                    #{hash.substring(0, 6)}
                  </Link>{" "}
                  at {dateFormatted}
                </>
              ) : (
                `Built at ${dateFormatted}`
              )}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
