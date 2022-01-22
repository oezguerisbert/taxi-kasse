import { Button, Container, Flex, Heading, IconButton, Link, SimpleGrid, Spacer } from "@chakra-ui/react";
import Month from "app/core/components/MonthCard";
import { years } from "app/core/constants";
import axios from "axios";
import { BlitzPage, useParam } from "blitz";
import HomeIcon from "../core/components/HomeIcon";

const Year: BlitzPage = () => {
  const year = useParam("year", "string");
  // const router = useRouter();
  const createOrDownloadPDF = async () => {
    if (typeof window !== "undefined") {
      const response = await axios.get(`/pdf?year=${year}&format=A4`, { responseType: "blob" });
      window.open(URL.createObjectURL(response.data));
    }
  };
  const fullYear = Array.from({ length: 12 });
  if (year && Object.keys(years).includes(year)) {
    return (
      <Container centerContent py={10}>
        <Flex w="full" alignContent="center" justifyContent="center">
          <Link href="/">
            <IconButton icon={<HomeIcon />} aria-label="Zurück" />
          </Link>
          <Spacer />
          <Heading>Taxi-Kasse {year}</Heading>
          <Spacer />
        </Flex>
        <Button my={2} onClick={createOrDownloadPDF} colorScheme="blue">
          Gesamt Jahr PDF
        </Button>
        <SimpleGrid columns={[2, null, 3]} spacing={0} p={0} columnGap={0}>
          {typeof years[year] === "boolean" &&
            fullYear.map((_, index) => <Month key={index} month={index + ""} year={year} />)}
        </SimpleGrid>
      </Container>
    );
  } else {
    return (
      <Container centerContent py={10}>
        Dieses Jahr wurde noch nicht erstellt, neu erstellen?
      </Container>
    );
  }
};

Year.suppressFirstRenderFlicker = true;

export default Year;
