import { Carousel } from "@mantine/carousel";
import { AspectRatio, Box, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { Pic1 } from "../../../assets/imgs";
import { AiFillStar } from "react-icons/ai";

type Props = {
  title: string;
};

export const BoxListing: React.FC<Props> = ({ title }) => {
  return (
    <Flex direction={"column"}>
      <Carousel sx={{ maxWidth: 282 }} mx="auto" withIndicators height={282}>
        <Carousel.Slide>
          <AspectRatio w={"282px"} ratio={1}>
            <Image src={Pic1} alt="" fill />
          </AspectRatio>
        </Carousel.Slide>
      </Carousel>

      <Flex mt={14} align={"center"} justify={"space-between"}>
        {" "}
        <Title fw={500} fz={20}>
          Luxury resort
        </Title>
        <Flex gap={10} align={"center"} justify={"space-between"}>
          {" "}
          <AiFillStar size={20} color="orange" /> 4.8
        </Flex>
      </Flex>

      <Text
        sx={{ borderBottom: "1px solid #E9EBED" }}
        pb={16}
        c={"#7D7C84"}
        fz={16}
        mt={5}
      >
        Ha noi
      </Text>

      <Flex mt={14} align={"center"} justify={"space-between"}>
        <Text pos={"relative"} top={5} pb={16} c={"#7D7C84"} fz={16}>
          Jul 20-24
        </Text>

        <Flex align={"flex-end"}>
          <Title fw={500} fz={24}>
            $200
          </Title>

          <Title fw={500} fz={16}>
            /Night
          </Title>
        </Flex>
      </Flex>
    </Flex>
  );
};
