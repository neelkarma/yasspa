import { Box, Spinner, Center } from "@chakra-ui/react";
import { useToday } from "lib/clientFetchResources";
import { Period } from "./period";
import { Break } from "./break";
import { Countdown } from "./countdown";

export const Today: React.FC<{}> = () => {
  const { res, error } = useToday();
  if (!res)
    return (
      <Center
        borderColor="gray.600"
        borderWidth="1px"
        borderRadius={15}
        backgroundColor="gray.700"
        h={{ sm: undefined, lg: "100%" }}
        w={{ md: "100%", lg: "32rem" }}
        p={5}
      >
        <Spinner size="lg" />
      </Center>
    );
  console.log(res);
  return (
    <Box
      className="hide-scrollbar"
      borderColor="gray.600"
      borderWidth="1px"
      borderRadius={15}
      overflowY="scroll"
      backgroundColor="gray.700"
      w={{ md: "100%", lg: "32rem" }}
      p={5}
    >
      <Countdown data={res.data} />
      {res.data.bells.map((bell, index) => {
        if (
          ["0", "RC", "EoD"].some((ignoredBell) => bell.period === ignoredBell)
        )
          return;
        if (
          ["1", "2", "3", "4", "5"].some(
            (periodBell) => bell.period === periodBell
          )
        )
          //@ts-ignore
          return <Period data={res.data} period={bell.period} key={index} />;

        return (
          <Break
            data={res.data}
            type={bell.period as "R" | "MTL1" | "MTL2"}
            key={index}
          />
        );
      })}
    </Box>
  );
};
