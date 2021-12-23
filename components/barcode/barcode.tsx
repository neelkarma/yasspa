import { Spinner } from "@chakra-ui/react";
import { Card, CenterCard } from "components/card";
import { useUserInfo } from "lib/clientFetchResources";

export const Barcode: React.FC<{}> = () => {
  const { res } = useUserInfo();

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  return <Card></Card>;
};
