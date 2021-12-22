import { Text, Accordion, Center, Box, Spinner } from "@chakra-ui/react";
import { Notice } from "./notice";
import { useDailyNotices } from "lib/clientFetchResources";
import Fuse from "fuse.js";

export const DailyNotices: React.FC<{ filter: string }> = ({ filter }) => {
  const { res } = useDailyNotices();

  if (!res)
    return (
      <Center
        w="100%"
        h="100%"
        backgroundColor="gray.700"
        borderColor="gray.600"
        borderRadius={15}
        borderWidth="1px"
      >
        <Spinner />
      </Center>
    );

  if (res.data.notices.length <= 0)
    return (
      <Center
        py={10}
        borderRadius={10}
        w="100%"
        h="100%"
        backgroundColor="gray.700"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Text color="gray.500">No notices for today!</Text>
      </Center>
    );

  const fuse = new Fuse(res.data.notices, {
    keys: ["title", "authorName", "content", "displayYears"],
  });

  if (filter.length <= 0)
    return (
      <Box
        p={5}
        w="100%"
        h="100%"
        backgroundColor="gray.700"
        borderColor="gray.600"
        borderRadius={15}
        borderWidth="1px"
      >
        <Accordion allowMultiple w="100%">
          {res.data.notices.map((notice, index) => (
            <Notice
              title={notice.title}
              author={notice.authorName}
              content={notice.content}
              years={notice.displayYears}
              key={index}
            />
          ))}
        </Accordion>
      </Box>
    );

  const results = fuse.search(filter);
  if (results.length <= 0)
    return (
      <Center
        py={10}
        borderRadius={10}
        w="100%"
        h="100%"
        backgroundColor="gray.700"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Text color="gray.500">No results.</Text>
      </Center>
    );

  return (
    <Box
      p={5}
      w="100%"
      h="100%"
      backgroundColor="gray.700"
      borderColor="gray.600"
      borderRadius={15}
      borderWidth="1px"
    >
      <Accordion allowMultiple w="100%">
        {results.map((notice, index) => (
          <Notice
            title={notice.item.title}
            author={notice.item.authorName}
            content={notice.item.content}
            years={notice.item.displayYears}
            key={index}
          />
        ))}
      </Accordion>
    </Box>
  );
};
