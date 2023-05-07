import { Button, Container, Flex, Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import { Present } from "./component/Present";

import { UpdateListingDrawer } from "../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../types";
import { AdminApproveTable } from "./component/AdminApproveTable";
import { useRefPortal } from "../../hooks";
import { TableColunm } from "../../constants/TableListingColunm";

const ListingManagement = () => {
  const presentRef = useRefPortal<typeof Present>();
  const pendingAdminRef = useRefPortal<typeof AdminApproveTable>();
  const updateListingDrawerRef = useRefPortal<typeof UpdateListingDrawer>();

  const handleRefetch = async () => {
    await presentRef.current?.refetchFunc();
    await pendingAdminRef.current?.refetchFunc();
  };

  const handleOpen = (data?: TableHistoryData) => {
    return updateListingDrawerRef.current?.openDrawer(data);
  };

  const handleClose = () => {
    return updateListingDrawerRef.current?.closeDrawer();
  };

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title>Pending admin approval list</Title>{" "}
        <Button onClick={() => handleOpen()}>Add listing</Button>
        <UpdateListingDrawer
          ref={updateListingDrawerRef}
          refetch={handleRefetch}
          isCreateListing={true}
        />
      </Flex>

      <AdminApproveTable ref={pendingAdminRef} />

      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title mt={100}>Listing management</Title>{" "}
      </Flex>
      <Tabs defaultValue="Current">
        <Tabs.List>
          <Tabs.Tab value="Current">Current</Tabs.Tab>
          {/* <Tabs.Tab value="History">History</Tabs.Tab>
          <Tabs.Tab value="Upcoming">Upcoming</Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="Current" pt="xs">
          <Present handleRefetch={handleRefetch} ref={presentRef} />
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
