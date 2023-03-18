import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Avatar } from "../../assets/imgs";
import { Flag, Person } from "../../assets/svgs";
import { Amenity } from "./Components/Amenity";
import { Overview } from "./Components/Overview";
import { PicSection } from "./Components/PicSection";
import { Reserve } from "./Components/Reserve";

type Props = {
  // dataPic: Array<StaticImageData>;
};

export const ListingDetails = () => {
  return (
    <Container mt={0} py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
      <Flex mb={68} justify={"space-between"}>
        {" "}
        <Title fz={48}>Pasir putih room </Title>
      </Flex>

      <PicSection />

      <Flex mt={64} justify={"space-between"}>
        {" "}
        <Box maw={694}>
          {" "}
          <Title mb={24}>Entire rental unit</Title>
          <Flex opacity={0.7} gap={30}>
            <Group>
              <Person />2 Guests
            </Group>
            <Group>
              <Flag />1 Bedrooms
            </Group>
            <Group>
              <Flag />1 private bath
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
                  Alfonso Dias
                </Title>

                <Text c={"#7D7C84"}>Joined in March 2014</Text>
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

            <Overview />
          </Box>
          <Amenity dataFood={["test 1", "test2", "test3"]} />
        </Box>
        {/* reverse  */}
        <Reserve />
      </Flex>
    </Container>
  );
};
