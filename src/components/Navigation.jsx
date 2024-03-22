import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex as="nav" justify="center" p="4" bg="blue.500" color="white">
      <Button
        variant="ghost"
        colorScheme="white"
        fontWeight="bold"
        fontSize="xl"
      >
        <Link to="/">Events</Link>
      </Button>
      <Button
        variant="ghost"
        colorScheme="white"
        fontWeight="bold"
        fontSize="xl"
      >
        <Link to="/event/1">Event</Link>
      </Button>
    </Flex>
  );
};
