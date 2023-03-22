import {
  Button,
  type ColorScheme,
  Flex,
  Text,
  TextInput,
  Popover,
  NumberInputHandlers,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useLocalStorage } from "@mantine/hooks";

import React, { useEffect, useRef, useState } from "react";
import { Calenda, Location, Who } from "../../assets/svgs";
import { BsSearch } from "react-icons/bs";
import { GuestDropDown } from "./GuestDropDown";

type Props = {
  index: number;
};

export const SearchBarSpecial: React.FC<Props> = ({ index }) => {
  const [peopleDropDown, setPeopleDropDown] = useState(false);
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  const [valueAdult, setValueAdult] = useState(0);
  const [valueChildren, setValueChildren] = useState(0);
  const handlersChildren = useRef<NumberInputHandlers>();

  const handlersAdult = useRef<NumberInputHandlers>();

  const incrementAdult = () => {
    console.log("first");
    handlersAdult.current?.increment();
  };

  const decrementAdult = () => {
    handlersAdult.current?.decrement();
  };

  const incrementChildren = () => {
    console.log("first");
    handlersChildren.current?.increment();
  };

  const decrementChildren = () => {
    handlersChildren.current?.decrement();
  };

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
          dropdownPosition={"bottom-start"}
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
          dropdownPosition={"bottom-start"}
          placeholder="Add dates"
          label="Check out"
          withAsterisk
        />
      </Flex>

      <Flex gap={10}>
        {" "}
        <Who />
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
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
              placeholder={
                valueAdult != 0 || valueChildren != 0
                  ? `${valueAdult} Adult , ${valueChildren} children`
                  : "Add guests"
              }
              label="Add guests"
              withAsterisk
            />
          </Popover.Target>
          <Popover.Dropdown sx={{ width: "400px !important" }}>
            <Flex direction={"column"} gap={20}>
              {" "}
              <GuestDropDown
                xref={handlersAdult}
                decrement={decrementAdult}
                title={"Adult"}
                increment={incrementAdult}
                setValue={setValueAdult}
                value={valueAdult}
              />
              <GuestDropDown
                title={"Children"}
                xref={handlersChildren}
                decrement={decrementChildren}
                increment={incrementChildren}
                setValue={setValueChildren}
                value={valueChildren}
              />
            </Flex>
          </Popover.Dropdown>
        </Popover>
      </Flex>

      <Button bg={"#3B71FE"} size="lg" leftIcon={<BsSearch />}>
        Search
      </Button>
    </Flex>
  );
};
