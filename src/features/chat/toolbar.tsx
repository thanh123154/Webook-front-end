import { Avatar, Group, Text } from "@mantine/core";
import React from "react";

import type { ISelectedConversation } from "../../types";
import { formatName } from "../../utils/formatter";

type Props = {
  selectedConversation?: ISelectedConversation;
};

export const Toolbar: React.FC<Props> = ({ selectedConversation }) => {
  if (!selectedConversation) return <></>;

  return (
    <Group px="md" h={60} position="apart">
      <Group spacing="sm">
        <Avatar radius="xl" src={selectedConversation.otherPerson.image}>
          {formatName(selectedConversation.otherPerson.name)}
        </Avatar>

        <Text fw="bold" fz="1.1rem">
          {selectedConversation.otherPerson.name}
        </Text>
      </Group>
    </Group>
  );
};
