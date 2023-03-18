import {
  Box,
  Button,
  Group,
  type NumberInputHandlers,
  Text,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import moment from "moment";

import { type StaticImageData } from "next/image";

import React, { useRef, useState } from "react";
import { Calenda } from "../../../assets/svgs";
import { GuestDropDown } from "../../../layouts/components/GuestDropDown";

type Props = {
  dataPic?: Array<StaticImageData>;
};

export const Reserve: React.FC<Props> = ({ dataPic }) => {
  const [valueCheckIn, setValueCheckIn] = useState<Date | null>(null);
  const [valueCheckOut, setValueCheckOut] = useState<Date | null>(null);

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
    <Box
      // bg={"red"}
      h={670}
      w={418}
      sx={{
        border: "1px solid #E9EBED",
        borderRadius: "24px",
      }}
      p={20}
    >
      <Title fz={32} mb={24}>
        Reserve
      </Title>

      <Text mt={24}>
        <Box display={"inline"} fw={600}>
          5 Days
        </Box>{" "}
        in Some Where
      </Text>

      <Text mb={24} c={"#7D7C84"} mt={8}>
        {valueCheckIn ? moment(valueCheckIn).format("MMMM D, YYYY") : ""} -
        &nbsp;
        {valueCheckOut ? moment(valueCheckOut).format("MMMM D, YYYY") : ""}
      </Text>

      <Group mb={24}>
        <DatePicker
          label="Check out"
          placeholder="Pick date"
          value={valueCheckIn}
          onChange={setValueCheckIn}
          mx="auto"
          maw={173}
          icon={<Calenda />}
          radius={32}
        />

        <DatePicker
          label="Check out"
          placeholder="Pick date"
          value={valueCheckOut}
          onChange={setValueCheckOut}
          mx="auto"
          maw={173}
          icon={<Calenda />}
          radius={32}
        />
      </Group>

      <GuestDropDown
        xref={handlersAdult}
        decrement={decrementAdult}
        title={"Adult"}
        increment={incrementAdult}
        setValue={setValueAdult}
        value={valueAdult}
      />

      <Box my={24}></Box>
      <GuestDropDown
        xref={handlersChildren}
        decrement={decrementChildren}
        title={"Children"}
        increment={incrementChildren}
        setValue={setValueChildren}
        value={valueChildren}
      />

      <Button mt={32} size="lg" w={"100%"} bg={"#3B71FE"}>
        Reserve
      </Button>

      <Text fz={14} c={"#7D7C84"} my={32}>
        You won&apos;t be charged yet
      </Text>
    </Box>
  );
};
