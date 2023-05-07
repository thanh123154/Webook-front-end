import { Accordion, Box, Title } from "@mantine/core";

import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { amenityListings } from "../../../constants/AmenityListing";

type Props = {
  dataFood: string | undefined;
};

export const Amenity: React.FC<Props> = ({ dataFood }) => {
  const [resultArray, setResultArray] = useState<{ value: string; icon: JSX.Element | null }[]>([]);

  useEffect(() => {
    if (dataFood) {
      const parsedArray = JSON.parse(dataFood) as string[];

      setResultArray(
        parsedArray.map((value) => {
          const matchingItem = amenityListings.find((item) => item.value === value);
          return matchingItem
            ? { value: matchingItem.value, icon: matchingItem.icon }
            : { value, icon: null };
        })
      );
    }
  }, [dataFood]);

  return (
    <Box mt={32}>
      <Title mb={16}>What this place offers</Title>

      <Accordion chevron={""} variant="contained">
        {resultArray.map((item) => (
          <Accordion.Item key={nanoid()} value={nanoid()}>
            <Accordion.Control icon={item.icon}>
              <Title fz={18}>{item.value}</Title>
            </Accordion.Control>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};
