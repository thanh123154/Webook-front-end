import {
  AspectRatio,
  Box,
  type ColorScheme,
  Container,
  Flex,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconPhoto } from "@tabler/icons";
import React from "react";
import { IconDollar, Location } from "../../assets/svgs";
import { SearchBarSpecial } from "../../layouts/components";

export const Hero = () => {
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });
  return (
    <Box bg={theme === "light" ? "#FCFCFD" : "#1A1B1E"}>
      {" "}
      <Container py={50} size={1440} px={{ base: "20px", sm: "120px" }}>
        <Flex gap={14} align={"center"}>
          <Box w={32} h={2} bg={"#58C17D"} />
          <Text fw={500} c={"#58C17D"}>
            It&apos;s time to go 🚀
          </Text>
        </Flex>

        <Title mt={20} maw={641} fw={600} fz={64}>
          Don&apos;t just dream about it, plan it. Travel.
        </Title>

        <Text mt={20} maw={600} c={"#7D7C84"}>
          When you&apos;re traveling, do you want to make sure your hotel has a
          nice pool? Or maybe a happy hour with good deals on drinks? There
        </Text>

        <Tabs mt={48} defaultValue="stays" activateTabWithKeyboard={false}>
          <Tabs.List>
            <Tabs.Tab value="stays">Stays</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="stays" pt="xs">
            <Box pb={50} sx={{ borderBottom: "1px solid #E9EBED" }}>
              {" "}
              <SearchBarSpecial index={1231} />
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
};
