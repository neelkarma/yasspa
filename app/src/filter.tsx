import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";

const Filter: React.FC<{
  onChange: (input: string) => void;
}> = ({ onChange }) => {
  const [input, setInput] = useState("");
  useEffect(() => onChange(input), [input]);
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<IoFilterOutline />} />
      <Input
        variant="filled"
        placeholder="Filter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </InputGroup>
  );
};

export default Filter;
