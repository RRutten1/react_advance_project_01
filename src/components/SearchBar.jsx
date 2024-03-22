import { Input } from "@chakra-ui/react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search events..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      mb={4}
    />
  );
};
