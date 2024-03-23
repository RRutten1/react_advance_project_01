import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex as="nav" justify="center" p="4" bg="blue.500" color="white">
      <Button
        variant="ghost"
        colorScheme="white"
        fontWeight="bold"
        fontSize="xl"
        _hover={{ textDecoration: "underline" }}
      >
        <Link to="/">
          <Text textDecoration="none">Events</Text>
        </Link>
      </Button>
      <Button
        variant="ghost"
        colorScheme="white"
        fontWeight="bold"
        fontSize="xl"
        _hover={{ textDecoration: "underline" }}
      >
        <Link to="/event/1">
          <Text textDecoration="none">Event</Text>
        </Link>
      </Button>
    </Flex>
  );
};
