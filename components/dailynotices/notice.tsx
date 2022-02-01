import {
  AccordionItem,
  AccordionButton,
  VStack,
  Text,
  HStack,
  Tag,
  Spacer,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

export const Notice: React.FC<{
  title: string;
  author: string;
  content: string;
  years: string;
}> = ({ title, author, content, years }) => (
  <AccordionItem>
    <AccordionButton>
      <VStack alignItems="left">
        <Text fontSize="1.3rem">{title}</Text>
        <HStack>
          <Tag colorScheme="cyan">{years}</Tag>
          <Text color="gray.400">{author}</Text>
        </HStack>
      </VStack>
      <Spacer />
      <AccordionIcon fontSize={30} />
    </AccordionButton>
    <AccordionPanel
      dangerouslySetInnerHTML={{ __html: content }}
    ></AccordionPanel>
  </AccordionItem>
);
