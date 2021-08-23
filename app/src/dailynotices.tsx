import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  VStack,
  Text,
  Tag,
  Accordion,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import { useDailyNotices } from "./fetchResources";

const Notice: React.FC<{
  title: string;
  author: string;
  content: string;
  years: string;
}> = ({ title, author, content, years }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <VStack>
          <Text fontSize="1.3rem">{title}</Text>
          <HStack>
            <Tag colorScheme="cyan">{years}</Tag>
            <Text color="gray.400">{author}</Text>
          </HStack>
        </VStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>{content}</AccordionPanel>
    </AccordionItem>
  );
};

const DailyNotices: React.FC<{ filter: string }> = ({ filter }) => {
  const { res } = useDailyNotices();
  if (!res) return null;
  console.log(res);
  return (
    <Accordion allowToggle allowMultiple w="100%">
      <Notice
        title="your mum gay"
        author="your dad"
        content="important breaking news! mom gay"
        years="7 to 9"
      />
      <Notice
        title="your mum gay"
        author="your dad"
        content="important breaking news! mom gay"
        years="7 to 9"
      />
      <Notice
        title="your mum gay"
        author="your dad"
        content="important breaking news! mom gay"
        years="7 to 9"
      />
      <Notice
        title="your mum gay"
        author="your dad"
        content="important breaking news! mom gay"
        years="7 to 9"
      />
      {/* {(() =>
        res.data.notices.map((notice) => {
          <Notice
            title={notice.title}
            author={notice.authorName}
            content={notice.content}
            years={notice.displayYears}
          />;
        }))()} */}
    </Accordion>
  );
};

export default DailyNotices;
