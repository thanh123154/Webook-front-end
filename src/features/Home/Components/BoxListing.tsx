import { Carousel } from "@mantine/carousel";
import { AspectRatio, Flex, Text, Title } from "@mantine/core";
import Image, { type StaticImageData } from "next/image";

import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { nanoid } from "nanoid";
import Link from "next/link";
import { type ListingData, type TableHistoryData } from "../../../types";
import moment from "moment";

type Props = {
  dataPic: string;
  title: string;
  location: string;
  dataListing: ListingData;
  // time: string;
  longTermPrice: number;
};

export const BoxListing: React.FC<Props> = ({
  dataPic,
  title,
  location,
  longTermPrice,
  dataListing,
}) => {
  const [pic, setPic] = useState<string[]>([]);

  React.useEffect(() => {
    setPic(JSON.parse(dataPic) as string[]);
  }, [dataPic]);

  console.log(dataListing, "dataa");
  const totalRatings = dataListing.review.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings / dataListing.review.length;
  return (
    <Flex direction={"column"}>
      <Carousel sx={{ maxWidth: 282 }} mx="auto" withIndicators height={282}>
        {pic.map((item) => {
          return (
            <Carousel.Slide key={nanoid()}>
              <AspectRatio w={"282px"} ratio={1}>
                <Image src={item} alt="" fill />
              </AspectRatio>
            </Carousel.Slide>
          );
        })}
      </Carousel>

      <Flex mt={14} align={"center"} justify={"space-between"}>
        {" "}
        <Link
          href={`/lisitng-detail/${dataListing.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Title fw={500} fz={20}>
            {title}
          </Title>
        </Link>
        <Flex gap={10} align={"center"} justify={"space-between"}>
          {" "}
          <AiFillStar size={20} color="orange" />{" "}
          {dataListing.review.length === 0 ? 0 : averageRating}
        </Flex>
      </Flex>

      <Text
        sx={{ borderBottom: "1px solid #E9EBED" }}
        pb={16}
        c={"#7D7C84"}
        fz={16}
        mt={5}
      >
        {location}
      </Text>

      <Flex mt={14} align={"center"} justify={"space-between"}>
        <Text pos={"relative"} top={5} pb={16} c={"#7D7C84"} fz={16}>
          {moment(dataListing.createdAt).format("MMM D")}
        </Text>

        <Flex align={"flex-end"}>
          <Title fw={500} fz={16}>
            {longTermPrice.toLocaleString()} vnd
          </Title>

          <Title fw={500} fz={13}>
            /Month
          </Title>
        </Flex>
      </Flex>
    </Flex>
  );
};
