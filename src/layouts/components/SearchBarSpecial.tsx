import {
  Box,
  Button,
  type ColorScheme,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calenda, Location, Who } from "../../assets/svgs";
import { BsArrowRightShort, BsSearch } from "react-icons/bs";

type anotherchild = {
  name: string;
  link: string;
  svg: JSX.Element;
};

type ChildProps = {
  name: string;
  link: string;
  // svg: JSX.Element;
  children?: Array<anotherchild>;
};

type Props = {
  index: number;
};

export const SearchBarSpecial: React.FC<Props> = ({ index }) => {
  const [peopleDropDown, setPeopleDropDown] = useState(false);
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });
  return (
    <Flex
      bg={
        theme === "light"
          ? "linear-gradient(265.67deg, rgba(252, 252, 253, 0.8) -3.26%, #FCFCFD 50.21%)"
          : "black"
      }
      sx={{
        boxShadow: "0px 64px 40px rgba(45, 41, 41, 0.08)",
        borderRadius: "24px",
      }}
      p={20}
      gap={20}
    >
      <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
        {" "}
        <Location />
        <TextInput
          label={<Text fw={500}>Location</Text>}
          placeholder="Search destinations"
          sx={{
            ".mantine-Input-input": {
              padding: "0px",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
        />
      </Flex>

      <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
        {" "}
        <Calenda />
        <DatePicker
          sx={{
            ".mantine-Input-input": {
              padding: "0px",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
          placeholder="Add dates"
          label="Check in"
          withAsterisk
        />
      </Flex>

      <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
        {" "}
        <Calenda />
        <DatePicker
          sx={{
            ".mantine-Input-input": {
              padding: "0px",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
          placeholder="Add dates"
          label="Check out"
          withAsterisk
        />
      </Flex>

      <Flex gap={10}>
        {" "}
        <Who />
        <TextInput
          readOnly
          onClick={() => setPeopleDropDown(!peopleDropDown)}
          sx={{
            ".mantine-Input-input": {
              padding: "0px",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
          placeholder="Add dates"
          label="Add guests"
          withAsterisk
        />
      </Flex>

      <Button size="lg" leftIcon={<BsSearch />}>
        Search
      </Button>
    </Flex>
  );
};
