import { Box, Heading } from "@chakra-ui/react";
import { Today, Bell } from "lib/clientFetchResources";
import { FC, useEffect, useState } from "react";

export const Countdown: FC<{ data: Today }> = ({ data }) => {
  const [countdown, setCountdown] = useState(0);
  const [display, setDisplay] = useState("Loading...");

  const initCountdown = () => {
    const now = Date.now();
    let nextBell: Bell;
    let nextBellDiff = Infinity;
    for (const bell of data.bells) {
      if (bell.period == "0") continue;
      const [hours, minutes] = bell.time.split(":");
      const bellDate = new Date(data.date);
      bellDate.setHours(Number(hours));
      bellDate.setMinutes(Number(minutes));
      const diff = bellDate.getTime() - now;
      if (diff < 0) break;
      if (diff < nextBellDiff) {
        nextBellDiff = diff;
        nextBell = bell;
      }
    }
    console.log(nextBell!.period);
    if (nextBell!.period === "RC") {
      setDisplay("Roll Call");
    } else {
      setDisplay(
        data.timetable.subjects[
          //@ts-ignore
          data.timetable.timetable.periods[nextBell.period].year +
            data.timetable.timetable.periods["1"].title
        ].title
      );
    }
    setCountdown(Math.floor(nextBellDiff / 1000));
  };

  const getHMS = () => {
    const seconds = countdown % 60;
    const minutes = Math.floor((countdown / 60) % 60);
    const hours = Math.floor(countdown / 60 / 60);
    const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
    const hoursString = hours < 10 ? `0${hours}` : hours.toString();
    return [hoursString, minutesString, secondsString].join(":");
  };

  useEffect(initCountdown, [
    data.bells,
    data.date,
    data.timetable.subjects,
    data.timetable.timetable.periods,
  ]);
  useEffect(() => {
    const interval = setInterval(() => setCountdown((x) => x - 1), 1000);
    return () => clearInterval(interval);
  });

  if (countdown < 0) initCountdown();

  return (
    <Box py={10} textAlign="center" fontWeight="extrabold">
      <Heading fontSize="2rem">{display} in</Heading>
      <Heading fontSize="3rem">{getHMS()}</Heading>
    </Box>
  );
};
