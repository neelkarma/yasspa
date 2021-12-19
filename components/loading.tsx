import { FC } from "react";
import { Box, Grid, Center, Spinner } from "@chakra-ui/react";

export const Loading: FC<{}> = () => (
  <Box>
    <Grid minH="100vh">
      <Center>
        <Spinner />
      </Center>
    </Grid>
  </Box>
);
