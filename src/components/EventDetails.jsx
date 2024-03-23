import { Text, Image, Box } from "@chakra-ui/react";

export const EventDetails = ({ event }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="3" mt="3" boxShadow="md">
      <Image src={event.image} alt={event.title} mb="4" />
      <Text>Description: {event.description}</Text>
      <Text>Start Time: {event.startTime}</Text>
      <Text>End Time: {event.endTime}</Text>
      <Text>
        Categories: {event.categories ? event.categories.join(", ") : ""}
      </Text>
      <Text>Created by: {event.creator ? event.creator.name : "Unknown"}</Text>
    </Box>
  );
};
