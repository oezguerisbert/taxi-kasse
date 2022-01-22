import React, { FC } from "react";
import { format, getDay, getDaysInMonth } from "date-fns";
import { de } from "date-fns/locale";

interface MonthKasseProps {
  month: string;
  year: string;
}

const MonthKasse: FC<MonthKasseProps> = ({ month, year }) => {
  const monthYearStamp = new Date(+year, +month);
  const daysOfMonth = Array.from({ length: getDaysInMonth(monthYearStamp) }).map((_, day) => {
    const theDay = new Date(+year, +month, day + 1);
    return {
      dayName: format(theDay, "EEE", { locale: de }),
      monthNameCut: format(theDay, "dd. MMM", { locale: de }),
    };
  });
  const thdStyles = {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    fontWeight: "bold",
    overflow: "hidden",
    padding: "10px 5px",
    textAlign: "center",
    verticalAlign: "top",
    wordBreak: "normal",
  } as const;

  const tdStyles = (big: boolean = false) =>
    ({
      boxSizing: "border-box",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: "1px",
      borderTop: "none",
      borderBottom: "none",
      fontFamily: "Arial, sans-serif",
      fontSize: "8pt",
      overflow: "hidden",
      height: "auto",
      minWidth: big ? "80px" : "auto",
      padding: "4px 3px",
      alignContent: "center",
      textAlign: "left",
      verticalAlign: "top",
      wordBreak: "normal",
    } as const);

  return (
    <div
      style={{
        width: "100%",
        pageBreakAfter: +month < 11 ? "left" : "avoid",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0, borderColor: "black" }}>
        <thead>
          <tr>
            <th style={thdStyles} colSpan={2}>
              Monat
            </th>
            <th style={thdStyles} colSpan={4}>
              {format(monthYearStamp, "MMMM", { locale: de })} {format(monthYearStamp, "yyyy", { locale: de })}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={thdStyles} colSpan={2}>
              DATUM
            </td>
            <td style={thdStyles}>Gesamt km</td>
            <td style={thdStyles}>Besetzt km</td>
            <td style={thdStyles}>Tour</td>
            <td style={thdStyles}>Tageskasse</td>
          </tr>
          {daysOfMonth.map(({ dayName, monthNameCut }, index) => {
            return (
              <tr key={index} style={{ borderBottom: "1px solid black" }}>
                <td style={tdStyles()}>{dayName}</td>
                <td style={tdStyles()}>{monthNameCut}</td>
                <td style={tdStyles(true)}></td>
                <td style={tdStyles(true)}></td>
                <td style={tdStyles(true)}></td>
                <td style={tdStyles(true)}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonthKasse;
