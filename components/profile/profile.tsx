import { Spinner } from "@chakra-ui/react";
import { CenterCard, Card } from "components/card";
import { useUserInfo } from "lib/clientFetchResources";

export const Profile: React.FC<{}> = () => {
  const { res } = useUserInfo();

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  return <Card></Card>;
};
