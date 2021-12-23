import { Spinner } from "@chakra-ui/react";
import { useToday } from "lib/clientFetchResources";
import { Period } from "./period";
import { Break } from "./break";
import { Countdown } from "./countdown";
import { CenterCard, Card } from "components/card";
import { TimetableButton } from "components/timetable/timetablebutton";

export const Today: React.FC<{}> = () => {
  const { res } = useToday();
  if (!res)
    return (
      <CenterCard
        h={{ sm: undefined, lg: "100%" }}
        w={{ md: "100%", lg: "32rem" }}
      >
        <Spinner size="lg" />
      </CenterCard>
    );
  console.log(res);
  return (
    <Card
      className="hide-scrollbar"
      overflowY="scroll"
      w={{ md: "100%", lg: "32rem" }}
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
          return (
            <Period
              data={res.data}
              period={bell.period as "1" | "2" | "3" | "4" | "5"}
              key={index}
            />
          );

        return (
          <Break
            data={res.data}
            type={bell.period as "R" | "MTL1" | "MTL2"}
            key={index}
          />
        );
      })}
      <TimetableButton />
    </Card>
  );
};
