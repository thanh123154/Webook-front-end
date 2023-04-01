import {
  Box,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Tabs,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Past } from "./component/Past";
import { Present } from "./component/Present";

import { Upcoming } from "./component/Upcoming";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";

const ListingManagement = () => {
  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title>Listing management</Title>
        <Link
          href="/host/create-listing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Button>Add listing</Button>
        </Link>
      </Flex>
      <Tabs defaultValue="Current">
        <Tabs.List>
          <Tabs.Tab value="Current">Current</Tabs.Tab>
          <Tabs.Tab value="History">History</Tabs.Tab>
          <Tabs.Tab value="Upcoming">Upcoming</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Current" pt="xs">
          <Present sth="" />
        </Tabs.Panel>

        {/* <Tabs.Panel value="History" pt="xs">
          <Past sth="" />
        </Tabs.Panel> */}

        {/* <Tabs.Panel value="Upcoming" pt="xs">
          <Upcoming sth="" />
        </Tabs.Panel> */}
      </Tabs>
    </Container>
  );
};

export default ListingManagement;
