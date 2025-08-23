"use client";
import CountUp from "react-countup";

const Counter = ({ end, duration }) => {
  return <CountUp end={end} duration={duration} className="counter" />;
};

export default Counter;
