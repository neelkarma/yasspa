import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";

export const Filter: React.FC<{
  onChange: (input: string) => void;
}> = ({ onChange }) => (
  <InputGroup>
    <InputLeftElement pointerEvents="none">
      <IoFilterOutline />
    </InputLeftElement>
    <Input
      variant="filled"
      placeholder="Filter"
      onChange={(e) => onChange(e.target.value)}
    />
  </InputGroup>
);
