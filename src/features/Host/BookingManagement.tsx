import { Container, Flex, Tabs, Title } from "@mantine/core";
import React from "react";

import { useRefPortal } from "../../hooks";
import { PresentBooking } from "./component/PresentBooking";

const BookingManagement = () => {
  const presentRef = useRefPortal<typeof PresentBooking>();

  const handleRefetch = async () => {
    await presentRef.current?.refetchFunc();
  };

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      <Flex justify={"space-between"} align={"center"} my={30}>
        {" "}
        <Title mt={100}>Booking management</Title>{" "}
      </Flex>
      <Tabs defaultValue="Current">
        <Tabs.List>
          <Tabs.Tab value="Current">Current</Tabs.Tab>
          <Tabs.Tab value="History">History</Tabs.Tab>
          <Tabs.Tab value="Upcoming">Upcoming</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Current" pt="xs">
          <PresentBooking handleRefetch={handleRefetch} ref={presentRef} />
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

export default BookingManagement;
