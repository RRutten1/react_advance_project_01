import { Button } from "@chakra-ui/react";

export const EditButton = ({ onClick }) => {
  const handleEditClick = () => {
    // Call the onClick callback provided by the parent component
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button colorScheme="blue" onClick={handleEditClick}>
      Edit
    </Button>
  );
};
