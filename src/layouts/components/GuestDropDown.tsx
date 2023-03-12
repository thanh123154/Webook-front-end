import {
  ActionIcon,
  Flex,
  Group,
  NumberInput,
  type NumberInputHandlers,
  Text,
} from "@mantine/core";

import React from "react";

type Props = {
  value: number;
  xref: React.MutableRefObject<NumberInputHandlers | undefined>;

  increment: () => void;
  decrement: () => void;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  title: string;
};

export const GuestDropDown: React.FC<Props> = ({
  value,
  increment,
  decrement,
  setValue,
  xref,
  title,
}) => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      {" "}
      <Text>{title}</Text>
      <Group spacing={5}>
        <ActionIcon size={32} variant="default" onClick={() => decrement()}>
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={value}
          onChange={(val: number) => setValue(val)}
          handlersRef={xref}
          max={10}
          min={0}
          step={1}
          styles={{ input: { width: 54, textAlign: "center" } }}
        />

        <ActionIcon size={32} variant="default" onClick={() => increment()}>
          +
        </ActionIcon>
      </Group>
    </Flex>
  );
};
