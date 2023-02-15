import {
  AspectRatio,
  Box,
  Flex,
  MantineTheme,
  type Sx,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useRef } from "react";

import { BigStar } from "../../assets/svgs";
import { UnderlineButton } from "../../components";

export const FindZenAi = () => {
  const largerThanSm = useMediaQuery("(min-width: 768px)");
  const vidRef = useRef(null);

  React.useEffect(() => {
    if (largerThanSm) {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".phase2Mark",
          // markers: true,
          start: "top 74%",
          end: "top 20%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".vid", { width: "90rem", y: "-8rem", duration: 10 })
        .to(".vid", { width: "130rem", y: "-16rem", duration: 10 })
        .to(".vid", { width: "39.2rem", y: "40rem", duration: 100 });
    }
  }, [largerThanSm]);

  return (
    <Box mt={{ base: 60, sm: 100 }} sx={container}>
      <Flex h={"100%"} justify={"space-between"} direction={"column"}>
        {" "}
        <Flex mx={{ base: "20px", sm: "8rem" }} justify={"space-between"}>
          {" "}
          <UnderlineButton>Token Details</UnderlineButton>
          <UnderlineButton>Join Presale</UnderlineButton>
        </Flex>
        <Flex my={{ base: 60, sm: 0 }} justify={"center"}>
          <Text
            className="miniText"
            display={"flex"}
            transform={"uppercase"}
            fz={{ base: "20px", sm: "2.08rem" }}
          >
            <AspectRatio ratio={1} w={"2.56rem"}>
              <BigStar />
            </AspectRatio>
            pushing the boundaries{" "}
            <AspectRatio ratio={1} w={"2.56rem"}>
              <BigStar />
            </AspectRatio>
            fully decentralized{" "}
            <AspectRatio ratio={1} w={"2.56rem"}>
              <BigStar />
            </AspectRatio>
            benefit humanity{" "}
            <AspectRatio ratio={1} w={"2.56rem"}>
              <BigStar />
            </AspectRatio>
          </Text>{" "}
        </Flex>
        <Flex pl={"12rem"} direction={"column"}>
          {" "}
          <Title
            lh={{ base: "40px", sm: 1.2 }}
            lts={"-0.03em"}
            fw={700}
            display={{ base: "none", sm: "block" }}
            transform="uppercase"
            fz={{ base: "30px", sm: "7rem" }}
          >
            Let s &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;find
          </Title>
          <Title
            lh={{ base: "40px", sm: 1.2 }}
            lts={"-0.03em"}
            fw={700}
            display={{ base: "none", sm: "block" }}
            transform="uppercase"
            fz={{ base: "30px", sm: "7rem" }}
          >
            your zen - ai
          </Title>{" "}
        </Flex>
        <Title
          lh={{ base: "40px", sm: 1.2 }}
          lts={"-0.03em"}
          fw={700}
          px={20}
          display={{ base: "block", sm: "none" }}
          transform="uppercase"
          fz={{ base: "30px", sm: "7rem" }}
        >
          lets find your zen - ai
        </Title>{" "}
      </Flex>{" "}
      <video ref={vidRef} autoPlay muted loop className="vid">
        <source src={"/TestVideo.mp4"} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <Box h={100} w={100} bg={"red"} className="phase2Mark"></Box>
    </Box>
  );
};

const container: Sx = (theme: MantineTheme) => ({
  ".vid": {
    width: "100%",
    borderRadius: "40px",
    display: "none",
  },
  ".phase2Mark": {
    position: "absolute",
    top: "30rem",
    opacity: "0",
  },
  ".miniText": {
    gap: "1.6rem",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
    ".miniText": {
      gap: "1.6rem",
    },
    height: "71.2rem",
    position: "relative",
    // background: "blue",
    ".phase2Mark": {
      position: "absolute",
      top: "30rem",
      opacity: "0",
    },
    ".vid": {
      position: "absolute",
      left: "50%",
      display: "block",
      transform: "translateX(-50%)",
      top: 0,
      right: 0,
      width: "65rem",
    },
  },
});
