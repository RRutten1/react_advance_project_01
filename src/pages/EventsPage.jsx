import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Input, Select } from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterEvents(searchTerm, e.target.value);
  };

  const filterEvents = (searchTerm, selectedCategory) => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categories.includes(selectedCategory)
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <Box p={4}>
      <h1>All Events</h1>
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearch}
        mb={4}
      />
      <Select value={selectedCategory} onChange={handleCategoryChange} mb={4}>
        <option value="">All Categories</option>
        {/* Populate with fetched categories */}
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
      {filteredEvents.map((event) => (
        <Link key={event.id} to={`/events/${event.id}`}>
          <Box
            borderWidth="1px"
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
            <p>
              Categories: {event.categories ? event.categories.join(", ") : ""}
            </p>
            <img src={event.image} alt={event.title} />
          </Box>
        </Link>
      ))}
      <Link to="/add-event">
        <Button colorScheme="blue">Add Event</Button>
      </Link>
    </Box>
  );
};
