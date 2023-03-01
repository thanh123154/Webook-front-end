import {
  Box,
  Container,
  Flex,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

type Props = {
  sth: string;
};

export const Step1: React.FC<Props> = ({ sth }) => {
  return (
    <Container h={"55vh"} mt={100} size={1000}>
      <Flex gap={50} direction={"column"}>
        {" "}
        <Textarea
          placeholder="Make it descriptive and unique so guests will understand what you’re offering."
          label="Title"
          radius="md"
          withAsterisk
          // autosize
        />
        <Flex justify={"space-between"} gap={50}>
          {" "}
          <NumberInput
            defaultValue={0}
            placeholder="Enter"
            label="Beds"
            withAsterisk
            w={"50%"}
          />
          <NumberInput
            defaultValue={0}
            placeholder="Enter"
            label="Bedsroom"
            withAsterisk
            w={"50%"}
          />
        </Flex>
        <Flex justify={"space-between"} gap={50}>
          {" "}
          <NumberInput
            defaultValue={0}
            placeholder="Enter"
            label="Bathrooms"
            withAsterisk
            w={"50%"}
          />
          <NumberInput
            defaultValue={0}
            placeholder="Enter"
            label="Guests"
            withAsterisk
            w={"50%"}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
