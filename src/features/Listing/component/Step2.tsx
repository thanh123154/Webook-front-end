import {
  Box,
  Container,
  Flex,
  MultiSelect,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { type Editor as TinyMCEEditor } from "tinymce";

import { TextEditor } from "../../../components/text-editor";

type Props = {
  sth: string;
};

export const Step2: React.FC<Props> = ({ sth }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  return (
    <Container
      pb={100}
      h={"60vh"}
      sx={{ overflow: "auto" }}
      mt={50}
      px={120}
      size={1400}
    >
      {" "}
      <Flex gap={50} direction={"column"}>
        {" "}
        <Textarea
          placeholder="Make it descriptive and unique so guests will understand what you’re offering."
          label="Description"
          radius="md"
          withAsterisk
          // autosize
        />
        <Flex justify={"space-between"} gap={50}>
          {" "}
          <MultiSelect
            data={data}
            label="Amenity"
            placeholder="Pick all amenity you have"
            clearable
            w={"100%"}
          />
          {/* <MultiSelect
            data={data}
            label="service"
            placeholder="Pick all that you like"
            w={"50%"}
          /> */}
        </Flex>
        <Box>
          {" "}
          <Title mb={10}>Detail</Title>
          <TextEditor editorRef={editorRef} />
        </Box>
      </Flex>
    </Container>
  );
};

const data = [
  { value: "react", label: "Fridge" },
  { value: "ng", label: "Pc" },
  { value: "svelte", label: "Room service" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];
