import { Button, Flex, Menu, Text } from "@mantine/core";
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

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
  // item: ChildProps;
  index: number;
};

export const MenuDropDown: React.FC<Props> = ({ index }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isPC, setIsPc] = useState(true);
  useEffect(() => {
    !isRendered && setIsRendered(true);
  }, [isRendered]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.screen.width > 1450) {
        setIsPc(true);
      } else setIsPc(false);
    }
  }, []);

  if (!isRendered) return <></>;

  return (
    <Menu trigger={"click"} shadow="md" width={200}>
      <Menu.Target>
        <Button variant="outline" compact leftIcon={<CgProfile />}>
          Setting
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<CgProfile />}>Settings</Menu.Item>
        <Menu.Item icon={<CgProfile />}>Messages</Menu.Item>
        <Menu.Item icon={<CgProfile />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<CgProfile />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<CgProfile />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<CgProfile />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
