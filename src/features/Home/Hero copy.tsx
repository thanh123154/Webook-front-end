import { AspectRatio, Box, Flex, Text, Title } from "@mantine/core";
import React from "react";

import { BigStar } from "../../assets/svgs";
import { TextAnimation } from "../../components";

export const Hero = () => {
  return (
    <Box maw={{ base: "329px", sm: "111.6rem" }} mx={"auto"}>
      <Box h={{ base: "", lg: "100px" }}></Box>
      <TextAnimation delayTime={0.25} duration={0.6} startPoint={-180} endPoint={0}>
        <Flex pos={"relative"} gap={{ base: "1.5rem", sm: "6rem" }} align={"start"}>
          <AspectRatio w={{ base: "3rem", sm: "10.5rem" }} ratio={1}>
            <BigStar />
          </AspectRatio>
          <Title
            lh={{ base: "45px", sm: 1 }}
            lts={"-0.03em"}
            fw={700}
            transform="uppercase"
            fz={{ base: "34px", sm: "7rem" }}
          >
            Tapping into
          </Title>
        </Flex>
      </TextAnimation>

      <Flex
        mt={{ base: "16px", sm: "0px" }}
        direction={{ base: "column-reverse", sm: "row" }}
        pos={"relative"}
        gap={"1rem"}
        align={"center"}
      >
        <TextAnimation delayTime={0.65} duration={0.6} startPoint={-180} endPoint={0}>
          <Text lts={"-0.02em"} w={{ base: "20rem", sm: "34rem" }} fz={{ base: "17px", sm: "1.7rem" }}>
            Zenithereum is a decentralized AI protocol that focuses on AI research and tool development to improve agent
            growth in crypto and real-world environments, with a goal to benefit humanity.
          </Text>
        </TextAnimation>

        <Flex
          align={{ base: "center", sm: "start" }}
          justify={"center"}
          gap={{ base: "0.5rem", sm: "3.5rem" }}
          direction={"column"}
        >
          <TextAnimation delayTime={0.65} duration={0.6} startPoint={-180} endPoint={0}>
            <Title
              lh={{ base: "40px", sm: 1.2 }}
              lts={"-0.03em"}
              fw={700}
              transform="uppercase"
              fz={{ base: "30px", sm: "7rem" }}
            >
              the power
            </Title>
          </TextAnimation>
          <TextAnimation delayTime={0.85} duration={0.6} startPoint={-180} endPoint={0}>
            <Title
              lh={{ base: "45px", sm: 1.2 }}
              lts={"-0.03em"}
              fw={700}
              transform="uppercase"
              fz={{ base: "30px", sm: "7rem" }}
            >
              OF ai
            </Title>
          </TextAnimation>
        </Flex>
      </Flex>

      <Flex></Flex>
    </Box>
  );
};
