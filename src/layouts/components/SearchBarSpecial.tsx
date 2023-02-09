import { Box, Button, Flex, Menu, Text } from "@mantine/core";
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
  return (
    <Flex>
      <DatePicker placeholder="Pick date" label="Event date" withAsterisk />
    </Flex>
  );
};
