import { Box, LoadingOverlay, Table } from "@mantine/core";
import type { ForwardRefRenderFunction } from "react";
import React, { forwardRef } from "react";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { nanoid } from "nanoid";

type Props = {
  sth?: string;
  handleRefetch: () => Promise<void>;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _PresentBooking: ForwardRefRenderFunction<Ref, Props> = () => {
  const { data: session } = useSession();

  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.booking.getCurrentBookingByHostId.useQuery(
    { guestId: session?.user?.id || "" },
    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );
  const { mutateAsync: apiAprove } = api.booking.aproveBooking.useMutation();

  const handleUpdateApprove = async (id: string) => {
    try {
      // setIsUpdating(true);

      // Prepare updated user data
      const data = {
        isDenied: false,
      };

      // Call the update user API endpoint
      await apiAprove({
        ...data,
        id: id,
      });

      // Refetch the updated user data
      await refetch();
      // Clear the file input and reset the form
      showNotification({
        color: "green",
        message: "Approve booking successfully",
      });

      refetch;
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLo(false);
    }
  };

  const heads = (
    <thead>
      <tr>
        <th>Host name</th>
        <th>Listing Name</th>
        <th>Check in</th>
        <th>Check out</th>
        <th>Total</th>
        <th>Approved</th>
      </tr>
    </thead>
  );

  const rows = (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={6}
            style={{
              textAlign: "center",
              fontSize: 20,
              paddingBlock: 50,
              fontWeight: "bold",
            }}
          >
            Loading...
          </td>
        </tr>
      ) : !currentListing || !currentListing.length ? (
        <tr>
          <td
            colSpan={6}
            style={{
              textAlign: "center",
              fontSize: 20,
              paddingBlock: 50,
              fontWeight: "bold",
            }}
          >
            No Data
          </td>
        </tr>
      ) : (
        currentListing.map((item) => (
          <tr key={nanoid()}>
            <td>{item.guests.name}</td>
            <td>{item.booked.name}</td>
            <td>{moment(item.checkIn).format("MMMM D, YYYY")}</td>
            <td>{moment(item.checkOut).format("MMMM D, YYYY")}</td>
            <td>{item.total.toLocaleString("en-US") ?? "N/A"} vnđ</td>
            <td>{item.isDenied ? "Has approved" : "Pending"}</td>
          </tr>
        ))
      )}
    </tbody>
  );

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} />

      <Table>
        {heads}

        {rows}
      </Table>
    </Box>
  );
};
export const PresentBooking = forwardRef<Ref, Props>(_PresentBooking);
