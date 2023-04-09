import {
  ActionIcon,
  Flex,
  Group,
  NumberInput,
  type NumberInputHandlers,
  Text,
} from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";

import React from "react";
import { type BookingData } from "../../types";

type Props = {
  value: number;
  xref: React.MutableRefObject<NumberInputHandlers | undefined>;

  increment: () => void;
  decrement: () => void;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  form: UseFormReturnType<any>;
};

export const GuestDropDown: React.FC<Props> = ({
  value,
  increment,
  decrement,
  setValue,
  xref,
  title,
  form,
  ...props
}) => {
  return (
    <Flex align={"center"} justify={"space-between"} {...props}>
      {" "}
      <Text>{title}</Text>
      <Group spacing={5}>
        <ActionIcon size={32} variant="default" onClick={() => decrement()}>
          –
        </ActionIcon>

        <NumberInput
          maw={56}
          mah={36}
          hideControls
          handlersRef={xref}
          max={10}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
          {...form.getInputProps("guest")}
        />

        <ActionIcon size={32} variant="default" onClick={() => increment()}>
          +
        </ActionIcon>
      </Group>
    </Flex>
  );
};
