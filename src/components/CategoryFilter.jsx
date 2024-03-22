import { Select } from "@chakra-ui/react";

export const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <Select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      mb={4}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
