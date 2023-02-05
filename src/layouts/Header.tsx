import { AspectRatio, Box, Button, Flex, Group, Indicator, Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { CgBell, CgProfile } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

import { LogoText } from "../assets/svgs";
import { UnderlineButton } from "../components";
import { useRendered } from "../hooks";
import { DrawerMenu, MenuDropDown, NavMenu } from "./components";

export const Header = () => {
  const { rendered } = useRendered();
  const [opened, setOpened] = useState(false);

  const [count, setCount] = useState(9);

  if (!rendered) return <></>;

  return (
    <Box
      pos="sticky"
      top={0}
      sx={{
        zIndex: 10,
        boxShadow: "0px 0px 10px #00000",
      }}
      bg="#fff"
    >
      <Box maw="134rem" mx="auto" py={{ base: 20, sm: 0 }} px={{ base: 30, sm: 0 }}>
        <Flex h={{ base: "auto", sm: "8rem" }} align="center">
          <Group position="apart" w="100%">
            <Link href="/">
              {/* <AspectRatio ratio={3.467} w={{ base: 150, sm: "18rem" }}>
                <LogoText />
              </AspectRatio> */}
              WEBOOK
            </Link>

            {/* <NavMenu /> */}

            <Box pos="relative" sx={{ "*": { transition: "all 0.3s ease-in-out" } }}>
              <Text
                fz={{ base: 17, sm: "2.1rem" }}
                display={{ sm: "none" }}
                onClick={() => setOpened((bool) => !bool)}
                pos="relative"
                sx={{ zIndex: 1 }}
                opacity={opened ? 0 : 1}
              >
                Menu
              </Text>

              <Box fz={30} lh="0px" pos="absolute" top={-1} right={0} opacity={opened ? 1 : 0}>
                <GrClose />
              </Box>
            </Box>

            <Flex gap={"2rem"} fz={"2rem"}>
              {/* <UnderlineButton fz="2.1rem">Zen AI Browser</UnderlineButton> */}

              <Indicator label={count} inline size={22}>
                <CgBell />
              </Indicator>

              <Indicator label={count} overflowCount={10} inline size={22}>
                <CgBell />
              </Indicator>

              <MenuDropDown index={123} />
            </Flex>
          </Group>
        </Flex>
      </Box>

      <DrawerMenu opened={opened} onClose={() => setOpened(false)} />
    </Box>
  );
};
