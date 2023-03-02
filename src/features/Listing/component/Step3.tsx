import {
  Box,
  Container,
  Flex,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useRef, useState } from "react";

type Props = {
  sth: string;
};

export const Step3: React.FC<Props> = ({ sth }) => {
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
        <NumberInput
          label="Long-term rental price"
          rightSection={<Box mr={50}> vnđ</Box>}
          defaultValue={1000}
          parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            value && !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
        />

        <NumberInput
          label="Short-term rental price"
          rightSection={<Box mr={50}> vnđ</Box>}
          defaultValue={1000}
          parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            value && !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
        />
      </Flex>
    </Container>
  );
};
