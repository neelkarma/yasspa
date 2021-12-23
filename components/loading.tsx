import { FC } from "react";
import { Grid, Center, Spinner } from "@chakra-ui/react";

export const Loading: FC<{}> = () => (
  <Grid minH="100vh">
    <Center>
      <Spinner />
    </Center>
  </Grid>
);
