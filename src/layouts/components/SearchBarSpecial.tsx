import { Box, Button, Flex, Input, Loader, Menu, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  return (
    <Flex justify={"center"} gap={20}>
      <TextInput label="Where" placeholder="Search destinations" rightSection={<Loader size="xs" />} />

      <DatePicker placeholder="Add dates" label="Check in" withAsterisk />

      <DatePicker placeholder="Add dates" label="Check out" withAsterisk />

      <TextInput
        readOnly
        onClick={() => setPeopleDropDown(!peopleDropDown)}
        label="Who"
        placeholder="Add guests"
        rightSection={
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            Search
          </Button>
        }
      />
    </Flex>
  );
};
