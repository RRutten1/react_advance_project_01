import React from "react";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
    >
      <Image
        src={event.image}
        alt={event.title}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h2" size="md" mb={2}>
          {event.title}
        </Heading>
        <Text fontSize="sm" mb={2}>
          Description: {event.description}
        </Text>
        <Text fontSize="sm" mb={2}>
          Start Time: {event.startTime}
        </Text>
        <Text fontSize="sm" mb={2}>
          End Time: {event.endTime}
        </Text>
        <Text fontSize="sm" mb={2}>
          Categories: {event.categories ? event.categories.join(", ") : ""}
        </Text>
      </Box>
    </Box>
  );
};
