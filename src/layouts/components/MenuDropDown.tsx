import { ActionIcon, Button, Flex, Menu, Modal, Text } from "@mantine/core";

import { nanoid } from "nanoid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgProfile, CgSwap } from "react-icons/cg";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { api } from "../../utils/api";

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
  const [openedLogin, setOpenedLogin] = useState(false);

  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

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
        <ActionIcon color="cyan" variant="outline">
          <CgProfile size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>

        <Menu.Item icon={<MdSwapHorizontalCircle />}>
          Switch to hosting
        </Menu.Item>

        {/* <Menu.Item icon={<CgProfile />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<CgProfile />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          // onClick={() => setOpenedLogin(true)}
          onClick={
            sessionData ? () => void signOut() : () => void signIn("google")
          }
          icon={<RiLoginCircleFill />}
        >
          {sessionData ? "Log out" : "Log in as google"}
        </Menu.Item>

        <Menu.Item icon={<AiFillSetting />}>Setting</Menu.Item>

        {/* <Menu.Item color="red" icon={<CgProfile />}>
          Log out
        </Menu.Item> */}
      </Menu.Dropdown>

      <Modal
        centered
        opened={openedLogin}
        onClose={() => setOpenedLogin(false)}
        title="Introduce yourself!"
      ></Modal>
    </Menu>
  );
};
