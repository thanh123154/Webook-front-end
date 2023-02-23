import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { BoxListing } from "./Components/BoxListing";

export const Listing = () => {
  const [value, onChange] = useState("react");
  const data = [
    { label: "Popular neaby", value: "Popular neaby" },
    { label: "Islands", value: "Islands" },
    { label: "Lake", value: "Lake" },
    { label: "Beach", value: "Beach" },
  ];
  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
      <SegmentedControl
        fullWidth
        data={data}
        value={value}
        onChange={onChange}
      />
      <Grid mt={50}>
        <Grid.Col span={3}>
          <BoxListing title="dasdas" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};
