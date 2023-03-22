import {
  Box,
  Button,
  Group,
  type NumberInputHandlers,
  Text,
  Title,
  SegmentedControl,
  Center,
  type ColorScheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import moment, { Moment } from "moment";

import { type StaticImageData } from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { Calenda } from "../../../assets/svgs";
import { GuestDropDown } from "../../../layouts/components/GuestDropDown";

type Props = {
  dataPic?: Array<StaticImageData>;
};

export const Reserve: React.FC<Props> = ({ dataPic }) => {
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });
  const [valueCheckIn, setValueCheckIn] = useState<Date | null>();
  const [valueCheckOut, setValueCheckOut] = useState<Date | null>();
  const [dayDif, setDayDif] = useState(0);
  const currentPrice = 500;

  const [valueAdult, setValueAdult] = useState(0);
  const [valueChildren, setValueChildren] = useState(0);
  const handlersChildren = useRef<NumberInputHandlers>();

  const handlersAdult = useRef<NumberInputHandlers>();

  const incrementAdult = () => {
    handlersAdult.current?.increment();
  };

  const decrementAdult = () => {
    handlersAdult.current?.decrement();
  };

  const incrementChildren = () => {
    handlersChildren.current?.increment();
  };

  const decrementChildren = () => {
    handlersChildren.current?.decrement();
  };

  console.log(valueCheckIn, valueCheckOut, "data");

  useEffect(() => {
    if (valueCheckOut && valueCheckIn) {
      const start = moment(valueCheckIn);
      const end = moment(valueCheckOut);

      const duration = moment.duration(end.diff(start));
      setDayDif(duration.days());
      // console.log(duration.days(), "day");
    }
  }, [valueCheckIn, valueCheckOut]);

  return (
    <Box
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
        </Box>
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
      <Center mt={24}>
        {" "}
        <SegmentedControl
          data={[
            { label: "500 vnđ/Month", value: "month" },
            { label: "1000vnđ/Night", value: "day" },
          ]}
        />
      </Center>

      <Button mt={32} size="lg" w={"100%"} bg={"#3B71FE"}>
        Reserve
      </Button>

      <Text fz={14} c={"#7D7C84"} my={32}>
        You won&apos;t be charged yet
      </Text>

      <Group p={12} mt={44} mb={16} position="apart">
        {" "}
        <Text fw={500} fz={12} c={"#7D7C84"}>
          ${currentPrice} x {dayDif} days
        </Text>
        <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
          ${currentPrice * dayDif}
        </Text>
      </Group>

      <Group p={12} mb={16} position="apart">
        {" "}
        <Text fw={500} fz={12} c={"#7D7C84"}>
          10% campaign discount
        </Text>
        <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
          -$10
        </Text>
      </Group>

      <Group p={12} mb={16} position="apart">
        {" "}
        <Text fw={500} fz={12} c={"#7D7C84"}>
          Service fee
        </Text>
        <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
          $0
        </Text>
      </Group>

      <Group
        bg={theme === "dark" ? "black" : "#F9F9F9"}
        sx={{
          borderRadius: "24px",
          border: "1px solid #E9EBED",
        }}
        p={12}
        mb={16}
        position="apart"
      >
        {" "}
        <Text fw={500} fz={12} c={"#7D7C84"}>
          Total before taxes
        </Text>
        <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
          ${currentPrice * dayDif - 10}
        </Text>
      </Group>
    </Box>
  );
};
