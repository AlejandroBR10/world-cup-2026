import { useState, useEffect } from "react";
import type { TimeLeft } from "../interfaces/time-left.interface";

const TARGET_DATE = new Date("2026-06-11T00:00:00");

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    over: false,
  };
}

export function useCountdown(target: Date = TARGET_DATE): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}