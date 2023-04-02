import { Button, Container, Flex, Tabs, Title } from "@mantine/core";
import Link from "next/link";
import React, { type ElementRef, useRef, useState } from "react";
import { Present } from "./component/Present";

import { UpdateListingDrawer } from "../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../types";
import { type QueryObserverResult } from "@tanstack/react-query";
import { type Listing } from "@prisma/client";
import { AdminApproveTable } from "./component/AdminApproveTable";

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};
type DetailListing = ElementRef<typeof UpdateListingDrawer>;
const ListingManagement = () => {
  const refDetailListing = useRef<DetailListing>(null);
  const presentRef = useRef<Ref>(null);

  const handleRefetch = () => {
    presentRef.current?.refetchFunc;
  };

  const [opened, setOpened] = useState(false);
  const [dataDrawer, setDataDrawer] = useState<TableHistoryData>({
    id: "",
    name: "",
    address: "",
    priceLongTerm: 0,
    priceShortTerm: 0,
    desc: "",
    beds: 0,
    bedsrooms: 0,
    bathrooms: 0,
    guests: 0,
    detail: "",
    province: "",
    district: "",
    ward: "",
    destination: "",
    active: true,
    approved: false,
  });

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title>Pending admin approval list</Title>{" "}
        <Button onClick={() => setOpened(true)}>Add listing</Button>
        <UpdateListingDrawer
          refetch={handleRefetch}
          dataDrawer={dataDrawer}
          opened={opened}
          setClose={() => setOpened(false)}
          ref={refDetailListing}
          isCreateListing={true}
        />
      </Flex>

      <AdminApproveTable sth="" />

      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title>Listing management</Title>{" "}
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
