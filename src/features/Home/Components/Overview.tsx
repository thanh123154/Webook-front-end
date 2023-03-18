import { Box, Spoiler, Text } from "@mantine/core";

import { type StaticImageData } from "next/image";

import React from "react";

type Props = {
  dataPic?: Array<StaticImageData>;
};

export const Overview: React.FC<Props> = ({ dataPic }) => {
  return (
    <Box mt={24}>
      <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Hide">
        <Text>
          The ultimate luxury glamping resort experience in a world-class diving
          location within the beautiful surroundings of Northwest Bali.
          <br />
          <br />
          On a quiet peninsula beside a blissful white-sand beach, this
          eco-friendly, tented, boutique retreat. From here, you can enjoy a
          spellbinding vista that extends across the gentle waters of
          Banyuwedang Bay to the lowland forests of the West Bali National Park,
          taking in a mangrove-entwined coastline and the tiny uninhabited
          island of Menjangan On a quiet peninsula beside a blissful white-sand
          beach, this eco-friendly, tented, boutique retreat. From here, you can
          enjoy a spellbinding vista that extends across the gentle waters of
          Banyuwedang Bay to the lowland forests of the West Bali National Park,
          taking in a mangrove-entwined coastline and the tiny uninhabited
          island of Menjangan...
        </Text>
      </Spoiler>
    </Box>
  );
};
