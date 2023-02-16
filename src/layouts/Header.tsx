import {
  Box,
  Button,
  type ColorScheme,
  Flex,
  Group,
  Indicator,
  Text,
  ActionIcon,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { CgBell, CgProfile } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

import { useRendered } from "../hooks";
import { DrawerMenu, MenuDropDown, SearchBarSpecial } from "./components";
import { useLocalStorage } from "@mantine/hooks";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { rendered } = useRendered();
  const [opened, setOpened] = useState(false);

  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const [count, setCount] = useState(9);

  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  if (!rendered) return <></>;

  return (
    <Box
      pos="sticky"
      top={0}
      sx={{
        zIndex: 10,
        boxShadow: "0px 0px 10px #00000",
      }}
      // bg="#fff"
    >
      <Box
        maw="134rem"
        mx="auto"
        py={{ base: 20, sm: 0 }}
        px={{ base: 30, sm: 100 }}
      >
        <Flex h={{ base: "auto", sm: "8rem" }} align="center">
          <Group position="apart" w="100%">
            <Link href="/">
              <Title fz={30}>WEBOOK</Title>
            </Link>

            {/* <NavMenu /> */}
            {/* <SearchBarSpecial index={1} /> */}

            <Box
              pos="relative"
              sx={{ "*": { transition: "all 0.3s ease-in-out" } }}
            >
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

              <Box
                fz={30}
                lh="0px"
                pos="absolute"
                top={-1}
                right={0}
                opacity={opened ? 1 : 0}
              >
                <GrClose />
              </Box>
            </Box>

            <Flex gap={"2rem"} fz={"2rem"}>
              <Button
                variant="outline"
                onClick={() => {
                  if (theme === "dark") {
                    setTheme("light");
                  } else setTheme("dark");
                }}
              >
                change darkmode pr light mode
              </Button>

              <Indicator label={count} overflowCount={10} inline size={22}>
                <ActionIcon color="blue">
                  <CgBell size={25} />
                </ActionIcon>
              </Indicator>

              <MenuDropDown index={123} />
              <Text fz={18}>
                {sessionData && <span>{sessionData.user?.name}</span>}
                {/* {secretMessage && <span> - {secretMessage}</span>} */}
              </Text>
            </Flex>
          </Group>
        </Flex>
      </Box>

      <DrawerMenu opened={opened} onClose={() => setOpened(false)} />
    </Box>
  );
};
