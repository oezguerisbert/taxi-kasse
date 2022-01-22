import { Box, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";

interface YearProps {
  year: string;
}

const Year: FC<YearProps> = ({ year }) => {
  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center">
      <Link
        p={8}
        px={40}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("gray.200", "gray.800")}
        fontSize="4xl"
        color={useColorModeValue("gray.800", "white")}
        fontWeight="700"
        _hover={{
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        href={`/${year}`}
      >
        {year}
      </Link>
    </Flex>
  );
};

export default Year;
