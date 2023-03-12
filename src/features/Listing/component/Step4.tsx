import { Container, Flex, Select, Textarea } from "@mantine/core";
import React from "react";

type Props = {
  sth: string;
};

export const Step4: React.FC<Props> = ({ sth }) => {
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
        <Select label="Province" placeholder="Pick one" data={data} />
        <Select label="District" placeholder="Pick one" data={data} />
        <Select label="Ward" placeholder="Pick one" data={data} />

        <Textarea
          placeholder="Enter"
          label="Detail address(optional)"
          radius="md"
          withAsterisk
          // autosize
        />
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
