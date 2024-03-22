import { Text, Image, Button } from "@chakra-ui/react";

export const EventDetails = ({ event, onEditClick }) => {
  return (
    <>
      <Text>Description: {event.description}</Text>
      <Text>Start Time: {event.startTime}</Text>
      <Text>End Time: {event.endTime}</Text>
      <Text>
        Categories: {event.categories ? event.categories.join(", ") : ""}
      </Text>
      <Text>Created by: {event.creator ? event.creator.name : "Unknown"}</Text>
      <Image src={event.image} alt={event.title} />
      <Button colorScheme="blue" onClick={onEditClick}>
        Edit
      </Button>
    </>
  );
};
