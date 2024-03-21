import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Box,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useToast();

  useEffect(() => {
    // Fetch event details based on eventId
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
          // Set initial form data to event details
          setFormData(eventData);
        } else {
          console.error("Error fetching event details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: "Event updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEditMode(false);
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <Box p={4}>
      <Heading>{event.title}</Heading>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Save
          </Button>
        </form>
      ) : (
        <>
          <Text>Description: {event.description}</Text>
          <Text>Start Time: {event.startTime}</Text>
          <Text>End Time: {event.endTime}</Text>
          <Text>
            Categories: {event.categories ? event.categories.join(", ") : ""}
          </Text>
          <Text>
            Created by: {event.creator ? event.creator.name : "Unknown"}
          </Text>
          <Image src={event.image} alt={event.title} />
          <Button colorScheme="blue" onClick={handleEditClick}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};
