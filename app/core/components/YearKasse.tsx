import React, { FC } from "react";
import MonthKasse from "./MonthKasse";

interface YearKasseProps {
  year: string;
}
const YearKasse: FC<YearKasseProps> = ({ year }) => {
  const months = Array.from({ length: 12 }).map((_, i) => <MonthKasse key={i} month={i + ""} year={year} />);
  return <div style={{}}>{months}</div>;
};

export default YearKasse;
