import { ActionIcon, Burger, Menu, Modal } from "@mantine/core";

import { signIn, signOut, useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

import { MdSwapHorizontalCircle } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  // item: ChildProps;
  index: number;
};

export const MenuDropDown: React.FC<Props> = ({ index }) => {
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const [openedLogin, setOpenedLogin] = useState(false);

  const { data: sessionData, status } = useSession();

  useEffect(() => {
    !isRendered && setIsRendered(true);
  }, [isRendered]);

  if (!isRendered) return <></>;

  return (
    <Menu onChange={toggle} trigger={"click"} shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon color="green">
          <Burger opened={opened} onClick={toggle} aria-label={label} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        {router.asPath.includes("host") && sessionData ? (
          <Link href={"/"}>
            <Menu.Item icon={<MdSwapHorizontalCircle />}>Switch to guest</Menu.Item>
          </Link>
        ) : sessionData ? (
          <Link href={"/host"}>
            <Menu.Item icon={<MdSwapHorizontalCircle />}>Switch to hosting</Menu.Item>
          </Link>
        ) : (
          ""
        )}

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          onClick={sessionData ? () => void signOut() : () => void signIn("google")}
          icon={<RiLoginCircleFill />}
        >
          {sessionData ? "Log out" : "Log in as google"}
        </Menu.Item>

        {status === "authenticated" && router.asPath.includes("/host") && (
          <Link href={"/host/listing"}>
            <Menu.Item icon={<MdSwapHorizontalCircle />}>Listing</Menu.Item>
          </Link>
        )}
        {status === "authenticated" && (
          <Link href={"/profile"}>
            <Menu.Item icon={<AiFillSetting />}>Profile</Menu.Item>
          </Link>
        )}

        {status === "authenticated" && router.asPath.includes("/host") && (
          <Link href={"/host/booking-status"}>
            <Menu.Item icon={<AiFillSetting />}>Booking Status</Menu.Item>
          </Link>
        )}

        {status === "authenticated" && !router.asPath.includes("/host") && (
          <Link href={"/manage-booking"}>
            <Menu.Item icon={<AiFillSetting />}>Manage Booking</Menu.Item>
          </Link>
        )}
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
