import {
  Box,
  type ColorScheme,
  Flex,
  Group,
  Text,
  ActionIcon,
  Title,
  Switch,
  type BoxProps,
} from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";

import { DrawerMenu, MenuDropDown } from "./components";
import { useLocalStorage } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useRender } from "../hooks";
import { useRouter } from "next/router";
import { IconBrandTelegram, IconMoonStars, IconSun } from "@tabler/icons";

const _Header: React.FC<{ variant?: "default" | "chat" }> = ({ variant = "default" }) => {
  const { isRendered } = useRender();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const { data: sessionData } = useSession();

  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  if (!isRendered) return <></>;

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
        py={{ base: 20, sm: variant === "chat" ? 10 : 0 }}
        px={{ base: 30, sm: variant === "chat" ? 25 : 100 }}
      >
        <Flex
          h={{ base: "auto", sm: variant === "chat" ? "auto" : "8rem" }}
          align="center"
          className="flex-wrapper"
        >
          <Group position="apart" w="100%">
            <Link href={router.asPath.includes("/host") ? "/host" : "/"}>
              <Title fz={30}>WEBOOK</Title>
            </Link>

            {/* <NavMenu /> */}
            {/* <SearchBarSpecial index={1} /> */}

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
              <Switch
                size="md"
                onChange={(value) => {
                  if (theme === "dark") {
                    setTheme("light");
                  } else setTheme("dark");
                }}
                onLabel={<IconSun size="1rem" stroke={2.5} />}
                offLabel={<IconMoonStars size="1rem" stroke={2.5} />}
              />

              {/* <Button>Switch to hosting</Button> */}

              {/* <Indicator label={count} overflowCount={10} inline size={22}>
                <ActionIcon color="cyan">
                  <CgBell size={25} />
                </ActionIcon>
              </Indicator> */}

              {router.pathname !== "/chat" && (
                <Link href="/chat" target="_blank" rel="noopener noreferrer">
                  <ActionIcon color="cyan">
                    <IconBrandTelegram size={25} />
                  </ActionIcon>
                </Link>
              )}

              <Text fz={18}>{sessionData && <span>Hello {sessionData.user?.name}</span>}</Text>
              <MenuDropDown index={123} />
            </Flex>
          </Group>
        </Flex>
      </Box>

      <DrawerMenu opened={opened} onClose={() => setOpened(false)} />
    </Box>
  );
};

export const Header = React.memo(_Header);
