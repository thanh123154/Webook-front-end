import {
  Container,
  Grid,
  LoadingOverlay,
  SegmentedControl,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BoxListing } from "./Components/BoxListing";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import { type ListingData } from "../../types";
import { nanoid } from "nanoid";

export const Listing = () => {
  const [value, onChange] = useState("react");
  const [listing, setListing] = useState<ListingData[]>([]);

  const { data: session } = useSession();
  const {
    data: allListing,
    isLoading,
    refetch,
  } = api.listing.getAllListing.useQuery();

  useEffect(() => {
    if (allListing) {
      setListing(allListing);
    }
  }, [allListing]);

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
      <LoadingOverlay visible={isLoading} />
      <SegmentedControl
        fullWidth
        data={data}
        value={value}
        onChange={onChange}
      />
      <Grid mt={50}>
        {listing.map((item) => (
          <Grid.Col key={nanoid()} span={3}>
            <BoxListing
              dataListing={item}
              title={item.name}
              location={item.destination}
              dataPic={item.gallery}
              longTermPrice={item.priceLongTerm}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

const data = [
  { label: "Popular neaby", value: "Popular neaby" },
  { label: "Islands", value: "Islands" },
  { label: "Lake", value: "Lake" },
  { label: "Beach", value: "Beach" },
];
