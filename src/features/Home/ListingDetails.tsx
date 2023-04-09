import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Avatar } from "../../assets/imgs";
import { Flag, Person } from "../../assets/svgs";
import { Amenity } from "./Components/Amenity";
import { Overview } from "./Components/Overview";
import { PicSection } from "./Components/PicSection";
import { Reserve } from "./Components/Reserve";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { type ListingAndUserData } from "../../types";
import moment from "moment";

export const ListingDetails = () => {
  const router = useRouter();
  const listingDetail = router.query["listing-detail"] as string[] | undefined;
  const productId = listingDetail ? listingDetail[1] : undefined;

  const [dataListing, setDataListing] = useState<ListingAndUserData>();

  const date = moment(dataListing?.host.createdAt);
  const formattedDate = date.format("MMMM YYYY");

  const {
    data: listing,
    isLoading,
    refetch,
  } = api.listing.getListingById.useQuery(
    { id: productId || "" },

    { enabled: !!productId, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (listing) {
      setDataListing(listing);
    }
  }, [listing]);

  console.log(dataListing, "data listing");
  return (
    <Container mt={0} py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
      <LoadingOverlay visible={isLoading} />
      <Flex mb={68} justify={"space-between"}>
        {" "}
        <Title fz={48}>{dataListing?.name} </Title>
      </Flex>

      <PicSection dataPic={dataListing?.gallery} />

      <Flex mt={64} justify={"space-between"}>
        {" "}
        <Box maw={694}>
          {" "}
          <Title mb={24}>Entire rental unit</Title>
          <Flex opacity={0.7} gap={30}>
            <Group>
              <Person />
              {dataListing?.guests} Guests
            </Group>
            <Group>
              <Flag />
              {dataListing?.bedsrooms} Bedrooms
            </Group>
            <Group>
              <Flag /> {dataListing?.bathrooms} Bathrooms
            </Group>
          </Flex>
          <Box mt={40}>
            <Text fz={16} c={"#7D7C84"} mb={16}>
              Hosted by:
            </Text>

            <Group>
              <AspectRatio w={48} ratio={1}>
                <Image src={Avatar} alt="" fill />
              </AspectRatio>

              <Flex h={52} direction={"column"} justify={"space-between"}>
                <Title fw={600} fz={16}>
                  {dataListing?.host.name}
                </Title>

                <Text c={"#7D7C84"}>Joined in {formattedDate}</Text>
              </Flex>
            </Group>
          </Box>
          {/* overview hay review */}
          <Box mt={48}>
            <Group>
              <Button c={"white"} bg={"black"}>
                Overview
              </Button>

              <Button variant="default">40+ Review</Button>
            </Group>

            <Overview info={dataListing?.detail} />
          </Box>
          <Amenity dataFood={["test 1", "test2", "test3"]} />
        </Box>
        {/* reverse  */}
        <Reserve
          listingId={dataListing?.id}
          place={dataListing?.province}
          longTermPrice={dataListing?.priceLongTerm}
          shortTermPrice={dataListing?.priceShortTerm}
        />
      </Flex>
    </Container>
  );
};
