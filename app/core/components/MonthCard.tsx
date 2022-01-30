import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "blitz";
import React, { FC } from "react";

interface MonthProps {
  month: string;
  year: string;
}
const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const isDev = process.env.NODE_ENV === "development";

const Month: FC<MonthProps> = ({ month, year }) => {
  const router = useRouter();
  const createOrDownloadPdf = async () => {
    if (typeof window !== "undefined") {
      const response = await axios.get(
        isDev ? `/pdf?month=${month}&year=${year}&format=A4` : `/pdfs/${year}/${month}.pdf`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${month}.pdf`;
      link.click();
    }
  };

  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center" onClick={createOrDownloadPdf}>
      <Button w="full" p={10} fontSize="xl" fontWeight="bold">
        {monthNames[month]}
      </Button>
    </Flex>
  );
};

export default Month;
