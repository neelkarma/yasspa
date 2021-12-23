import { Text, Accordion, Spinner } from "@chakra-ui/react";
import { Notice } from "./notice";
import { useDailyNotices } from "lib/clientFetchResources";
import Fuse from "fuse.js";
import { useMutedTextColor } from "lib/theme";
import { Card, CenterCard } from "components/card";
import { useContext } from "react";
import { SettingsContext } from "components/settingscontext";

export const DailyNotices: React.FC<{ filter: string }> = ({ filter }) => {
  const { res } = useDailyNotices();
  const { debug } = useContext(SettingsContext);
  const mutedTextColor = useMutedTextColor();

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  if (debug) console.log("daily notices", res);

  if (res.data.notices.length <= 0)
    return (
      <CenterCard>
        <Text color={mutedTextColor}>No notices for today!</Text>
      </CenterCard>
    );

  const fuse = new Fuse(res.data.notices, {
    keys: ["title", "authorName", "content", "displayYears"],
  });

  if (filter.length <= 0)
    return (
      <Card>
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
      </Card>
    );

  const results = fuse.search(filter);
  if (results.length <= 0)
    return (
      <CenterCard>
        <Text color="gray.500">No results.</Text>
      </CenterCard>
    );

  return (
    <Card>
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
    </Card>
  );
};
