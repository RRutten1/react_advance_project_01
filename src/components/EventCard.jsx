import { Box } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  return (
    <Box
      borderWidth="10px"
      borderRadius="lg"
      p={4}
      mb={4}
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
    >
      <h2>{event.title}</h2>
      <p>Description: {event.description}</p>
      <p>Start Time: {event.startTime}</p>
      <p>End Time: {event.endTime}</p>
      <p>Categories: {event.categories ? event.categories.join(", ") : ""}</p>
      <img src={event.image} alt={event.title} />
    </Box>
  );
};
