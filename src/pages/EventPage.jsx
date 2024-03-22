import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { EventDetails } from "../components/EventDetails";
import { EventEditForm } from "../components/EventEditForm";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
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

  const handleSave = async (e) => {
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
        window.location.href = "/events"; // Redirect to events page
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

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Event deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.href = "/events"; // Redirect to events page
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(event);
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <Box p={4}>
      <Heading>{event.title}</Heading>
      {editMode ? (
        <EventEditForm
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <EventDetails event={event} />
          <DeleteButton onClick={handleDeleteClick} />
          <EditButton onClick={() => setEditMode(true)} />
        </>
      )}
    </Box>
  );
};
