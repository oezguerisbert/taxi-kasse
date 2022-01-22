import { Container, Heading } from "@chakra-ui/react";
import Year from "app/core/components/YearCard";
import { years } from "app/core/constants";
import { BlitzPage } from "blitz";

const Home: BlitzPage = () => {
  return (
    <Container centerContent py={10}>
      <Heading>Taxi-Kasse</Heading>
      {Object.keys(years).map((year) => (
        <Year key={year} year={year} />
      ))}
    </Container>
  );
};

Home.suppressFirstRenderFlicker = true;

export default Home;
