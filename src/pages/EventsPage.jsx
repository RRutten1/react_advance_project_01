import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";

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

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterEvents(value, selectedCategory);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    filterEvents(searchTerm, value);
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
      <Heading as="h1" fontSize="4xl" fontWeight="bold" mb={4}>
        All Events
      </Heading>
      <SearchBar value={searchTerm} onChange={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <Link to="/add-event">
        <Button colorScheme="blue" mb={4}>
          Add Event
        </Button>
      </Link>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {filteredEvents.map((event) => (
          <GridItem key={event.id}>
            <Link to={`/event/${event.id}`}>
              <EventCard event={event} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
