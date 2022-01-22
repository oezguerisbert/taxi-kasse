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
const Month: FC<MonthProps> = ({ month, year }) => {
  const router = useRouter();
  const createOrDownloadPdf = async () => {
    if (typeof window !== "undefined") {
      const response = await axios.get(`/pdf?month=${month}&year=${year}&format=A4`, { responseType: "blob" });
      window.open(URL.createObjectURL(response.data));
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
