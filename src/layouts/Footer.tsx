import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Input,
  type MantineTheme,
  type Sx,
  Text,
} from "@mantine/core";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { FaDiscord, FaTelegram, FaYoutube } from "react-icons/fa";

import { LogoFooter } from "../assets/svgs";
import { menuFooter } from "../constants";
import { useRender } from "../hooks";

export const Footer = () => {
  const { isRendered } = useRender();

  if (!isRendered) return <></>;

  return (
    <Box
      bg="#1b1b1c"
      pt={{ base: 70, sm: "9rem" }}
      px={{ base: 15, sm: 0 }}
      c="#fff"
      fz={{ base: 14, sm: "1.6rem" }}
    >
      <Box maw={{ sm: "134rem" }} mx="auto">
        <Flex
          justify={{ base: "flex-start", sm: "flex-end" }}
          mb={{ base: 150, sm: 0 }}
        >
          <AspectRatio ratio={3.4265} w={{ base: 250, sm: "50rem" }}>
            <LogoFooter />
          </AspectRatio>
        </Flex>

        <Divider mt="20rem" mb="8rem" display={{ base: "none", sm: "block" }} />

        <Grid>
          <Grid.Col
            span={12}
            order={2}
            orderSm={1}
            sm={6}
            mt={{ base: 200, sm: 0 }}
          >
            <Grid>
              {menuFooter.map((category) => (
                <Grid.Col
                  key={nanoid()}
                  span={6}
                  sm={4}
                  mb={{ base: 70, sm: 0 }}
                >
                  <Text
                    fz={{ base: 17, sm: "2.1rem" }}
                    mb={{ base: 20, sm: "2.4rem" }}
                  >
                    {category.label}
                  </Text>

                  {category.menu.map((item) => (
                    <Box key={nanoid()} mb="0.5em">
                      <Link
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text
                          c="#848484"
                          fz={{ base: 16, sm: "2rem" }}
                          display="inline-block"
                          sx={{
                            "&:hover": { color: "#fff" },
                            transition: "all 0.15s ease-in-out",
                          }}
                        >
                          {item.label}
                        </Text>
                      </Link>
                    </Box>
                  ))}
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>

          <Grid.Col span={12} sm={6} order={1} orderSm={2} pl={{ sm: "18rem" }}>
            <Grid>
              <Grid.Col span={12} order={2} orderSm={1}>
                <Flex
                  align="center"
                  mb={{ sm: "2rem" }}
                  mt={{ base: 40, sm: 0 }}
                >
                  <Input
                    placeholder="Your email here"
                    variant="unstyled"
                    sx={sxInput}
                    w="100%"
                  />

                  <Box
                    fz={{ base: 26, sm: "3.5rem" }}
                    lh="0px"
                    sx={{ cursor: "pointer" }}
                  >
                    <BsArrowRightShort />
                  </Box>
                </Flex>
              </Grid.Col>

              <Grid.Col span={12} order={1} orderSm={2}>
                <Text fz={{ base: 18, sm: "2.1rem" }}>
                  Get valuable strategy, culture, and brand insights straight to
                  your inbox.
                </Text>
              </Grid.Col>

              <Grid.Col span={12} order={3}>
                <Divider my={{ base: 25, sm: "4rem" }} />
              </Grid.Col>

              <Grid.Col span={12} order={4}>
                <Text c="#4D5153">
                  By signing up to receive emails from Motto, you agree to our{" "}
                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline", color: "inherit" }}
                  >
                    Privacy Policy
                  </Link>
                  . We treat your info responsibly. Unsubscribe anytime.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Grid
          mt={{ base: 100, sm: "27rem" }}
          pb="3rem"
          gutter={30}
          gutterSm={0}
        >
          <Grid.Col order={3} orderSm={1} span={12} sm={4}>
            <Text ta={{ base: "center", sm: "start" }}>
              Copyright © 2023 Motto® | NYC | Dallas | UK
            </Text>
          </Grid.Col>

          <Grid.Col order={2} span={12} sm={4}>
            <Flex
              fz={{ base: 20, sm: "2.1rem" }}
              gap={{ base: 20, sm: "2.1rem" }}
              justify="center"
            >
              <Link
                href="https://t.me/zenithereumai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram color="#fff" />
              </Link>

              <Link
                href="https://t.me/ZenithereumAIofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram color="#fff" />
              </Link>

              {/* <Link href="/" target="_blank" rel="noopener noreferrer">
                <FaInstagram color="#fff" />
              </Link> */}

              <Link
                href="https://www.youtube.com/@ZenithereumAI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube color="#fff" />
              </Link>

              <Link
                href="https://discord.com/invite/kwPZNyYd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord color="#fff" />
              </Link>
            </Flex>
          </Grid.Col>

          <Grid.Col order={1} orderSm={3} span={12} sm={4}>
            <Text ta={{ base: "center", sm: "end" }}>Back to top ↑</Text>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

const sxInput: Sx = (theme: MantineTheme) => ({
  input: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 26,
    height: "1em",

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: "3.5rem",
    },

    "&::placeholder": {
      color: "#5b5b5b",
    },
  },
});
