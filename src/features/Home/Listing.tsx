import { Container, Grid, LoadingOverlay } from "@mantine/core";
import React from "react";
import { BoxListing } from "./Components/BoxListing";
import { api } from "../../utils/api";
import { nanoid } from "nanoid";
import { useSearchListing } from "../../hooks/useSearchListing";

export const Listing = () => {
  const { checkIn, checkOut, guest, latitude, longitude } = useSearchListing(
    (state) => state.value
  );

  const { data: allListing, isLoading } = api.listing.getAllListing.useQuery(
    {
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalGuests: guest,
      latitude,
      longitude,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(allListing, "all listing");
  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
      <LoadingOverlay visible={isLoading} />

      <Grid mt={50}>
        {allListing?.map((item) => (
          <Grid.Col key={nanoid()} span={3}>
            <BoxListing
              dataListing={item}
              title={item.name}
              location={item.address}
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
