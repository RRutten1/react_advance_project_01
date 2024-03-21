import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirect to events page after successful submission
        window.location.href = "/events";
      } else {
        console.error("Error adding event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Box p={4}>
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          mb={4}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          mb={4}
        />
        <Input
          type="text"
          name="startTime"
          placeholder="Start Time"
          value={formData.startTime}
          onChange={handleChange}
          mb={4}
        />
        <Input
          type="text"
          name="endTime"
          placeholder="End Time"
          value={formData.endTime}
          onChange={handleChange}
          mb={4}
        />
        {/* Add more inputs for categories if needed */}
        <Button colorScheme="blue" type="submit">
          Add Event
        </Button>
      </form>
    </Box>
  );
};
