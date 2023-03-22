import { Box, Spoiler, Text, Title } from "@mantine/core";

import { type StaticImageData } from "next/image";

import React from "react";

type Props = {
  dataPic?: Array<StaticImageData>;
};

export const Review: React.FC<Props> = ({ dataPic }) => {
  return (
    <Box mt={24}>
      <Title>40+ reviews</Title>
    </Box>
  );
};
