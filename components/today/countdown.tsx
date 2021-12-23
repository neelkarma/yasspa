import { Box, Heading } from "@chakra-ui/react";
import { Today, Bell } from "types/api/today";
import { FC, useCallback, useEffect, useState } from "react";
import Head from "next/head";

export const Countdown: FC<{ data: Today }> = ({ data }) => {
  const [countdown, setCountdown] = useState(0);
  const [display, setDisplay] = useState("Loading...");
  const [nextBell, setNextBell] = useState<Bell | null>();

  const updateNextBell = useCallback(() => {
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
    setNextBell(nextBell!);
  }, [data.bells, data.date]);

  const tick = useCallback(() => {
    if (!nextBell) return updateNextBell();

    const now = Date.now();
    const [hours, minutes] = nextBell!.time.split(":");
    const bellDate = new Date(data.date);
    bellDate.setHours(Number(hours));
    bellDate.setMinutes(Number(minutes));
    const diff = bellDate.getTime() - now;

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
    setCountdown(Math.floor(diff / 1000));
  }, [
    data.date,
    data.timetable.subjects,
    data.timetable.timetable.periods,
    nextBell,
    updateNextBell,
  ]);

  const getHMS = useCallback(() => {
    const seconds = countdown % 60;
    const minutes = Math.floor((countdown / 60) % 60);
    const hours = Math.floor(countdown / 60 / 60);
    const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
    const hoursString = hours < 10 ? `0${hours}` : hours.toString();
    return [hoursString, minutesString, secondsString].join(":");
  }, [countdown]);

  useEffect(tick, [tick]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Box py={10} textAlign="center" fontWeight="extrabold">
      <Head>
        <title>
          {getHMS()} until {display} | YASSPA
        </title>
      </Head>
      <Heading fontSize="2rem">{display} in</Heading>
      <Heading fontSize="3rem">{getHMS()}</Heading>
    </Box>
  );
};
