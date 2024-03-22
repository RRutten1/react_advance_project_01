import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

export const EventEditForm = ({ formData, onChange, onSave, onCancel }) => {
  return (
    <form onSubmit={onSave}>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={onChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Start Time</FormLabel>
        <Input
          type="text"
          name="startTime"
          value={formData.startTime}
          onChange={onChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>End Time</FormLabel>
        <Input
          type="text"
          name="endTime"
          value={formData.endTime}
          onChange={onChange}
        />
      </FormControl>
      <Button colorScheme="blue" type="submit" mr={2}>
        Save
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </form>
  );
};
