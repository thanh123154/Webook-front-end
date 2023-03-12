import {
  Box,
  Container,
  Flex,
  Image,
  MultiSelect,
  SimpleGrid,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { type Editor as TinyMCEEditor } from "tinymce";

import { TextEditor } from "../../../components/text-editor";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type FileWithPath,
} from "@mantine/dropzone";

type Props = {
  sth: string;
};

export const Step2: React.FC<Props> = ({ sth }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt=""
      />
    );
  });

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
        </Flex>
        <Box>
          <Title my={10}>Your Picture</Title>
          <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
            <Text align="center">Drop images here</Text>
          </Dropzone>

          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </Box>
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
