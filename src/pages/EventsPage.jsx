import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Input, Select } from "@chakra-ui/react";
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
      <h1>All Events</h1>
      <SearchBar value={searchTerm} onChange={handleSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />

      {filteredEvents.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
          <EventCard event={event} />
        </Link>
      ))}

      <Link to="/add-event">
        <Button colorScheme="blue">Add Event</Button>
      </Link>
    </Box>
  );
};
