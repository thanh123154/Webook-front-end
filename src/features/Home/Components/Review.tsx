import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Group,
  Rating,
  Text,
  Title,
} from "@mantine/core";

import Image, { type StaticImageData } from "next/image";

import { type ReviewType } from "../../../types";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";
import { nanoid } from "nanoid";
import { Avatar } from "../../../assets/imgs";
import { Star } from "../../../assets/svgs";
type Props = {
  dataPic?: Array<StaticImageData>;

  listingId: string | undefined;
};

export const Review: React.FC<Props> = ({ listingId }) => {
  const { data: session } = useSession();
  const { data: data } = api.review.getReviewByListingId.useQuery(
    { listingId: listingId || "" },
    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );
  const [review, setReview] = useState<ReviewType[]>();

  useEffect(() => {
    if (data) {
      setReview(data);
      const totalRatings = data.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRatings / data.length);
    }
  }, [data]);

  console.log(review, "tét");
  const [averageRating, setAverageRating] = useState<number>();

  return (
    <Box mt={24}>
      <Title fz={32}>Reviews</Title>
      {averageRating ? (
        <Box px={24} mt={56}>
          <Text fw={600} fz={48}>
            {averageRating}{" "}
          </Text>
          <Rating size="md" mt={5} readOnly defaultValue={averageRating} />
          <Text mb={56} mt={8} fz={14} c={"#7D7C84"}>
            Based on {review?.length} review
          </Text>
          <Flex direction={"column"} gap={32}>
            {" "}
            {review?.map((item) => (
              <Group sx={{ borderRadius: "40px" }} key={nanoid()}>
                <AspectRatio
                  w={48}
                  sx={{ borderRadius: "50%", overflow: "hidden" }}
                  ratio={1}
                >
                  <Image src={item.guests.image || ""} alt="" fill />
                  {/* <Image src={Avatar} alt="" fill /> */}
                </AspectRatio>
                <Box>
                  {" "}
                  {item.rating} <Star />
                  <Text mt={8} fz={16} fw={600}>
                    {item.guests.name}
                  </Text>
                  <Text mt={6} fz={14} fw={400}>
                    {item.comment}
                  </Text>
                </Box>
              </Group>
            ))}
          </Flex>
        </Box>
      ) : (
        <Center>
          <Text fz={24}>No rating</Text>
        </Center>
      )}
    </Box>
  );
};
