import { Box, Spinner, Center } from "@chakra-ui/react";
import { useToday } from "lib/clientFetchResources";
import { Period } from "./period";
import { Break } from "./break";
import { Countdown } from "./countdown";
import { useCardColors } from "lib/theme";

export const Today: React.FC<{}> = () => {
  const { res } = useToday();
  const cardStyles = useCardColors();
  if (!res)
    return (
      <Center
        borderWidth="1px"
        borderRadius={15}
        {...cardStyles}
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
      borderWidth="1px"
      borderRadius={15}
      overflowY="scroll"
      {...cardStyles}
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
