import { Text, Heading, Spinner } from "@chakra-ui/react";
import { CenterCard, Card } from "components/card";
import { SettingsContext } from "components/settingscontext";
import { useAwardScheme, useUserInfo } from "lib/clientFetchResources";
import { useContext } from "react";

export const Barcode: React.FC<{}> = () => {
  const { res } = useUserInfo();
  const { debug } = useContext(SettingsContext);

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  if (debug) console.log("profile user data", res);

  return <Card>{res.data.studentId}</Card>;
};
