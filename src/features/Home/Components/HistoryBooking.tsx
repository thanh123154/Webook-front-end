import { Box, Button, LoadingOverlay } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import type { ForwardRefRenderFunction } from "react";
import React, { useState, useEffect, forwardRef } from "react";
import { type BookingData } from "../../../types";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import moment from "moment";

type Props = {
  sth?: string;
  handleRefetch: () => Promise<void>;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _HistoryBooking: ForwardRefRenderFunction<Ref, Props> = () => {
  const [dataTable, setDataTable] = useState<BookingData[]>([]);
  // const [isUpdating, setIsUpdating] = useState(false);

  const { data: session } = useSession();

  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.booking.getHistoryBookingByHostId.useQuery(
    { guestId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );
  const { mutateAsync: apiAprove } = api.booking.aproveBooking.useMutation();
  useEffect(() => {
    if (currentListing) {
      setDataTable(currentListing);
    }
  }, [currentListing]);
  console.log(currentListing, " data table present");

  // useImperativeHandle(ref, () => ({
  //   refetchFunc: refetch,
  // }));

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

  return (
    <Box>
      <LoadingOverlay visible={isLoading} />
      <DataTable
        mt={20}
        withBorder
        borderRadius="sm"
        // withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={dataTable}
        // define columns
        columns={[
          {
            accessor: "guests.name",
            title: "Host name",
          },

          // {
          //   accessor: "phoneNumber",
          //   title: "Phone Number",
          // },

          // {
          //   accessor: "guests.email",
          //   title: "Email",
          // },
          {
            accessor: "booked.name",
            title: "Listing Name",
          },
          {
            accessor: "checkIn",
            title: "Check in",
            render: ({ checkIn }) => (
              <Box>{moment(checkIn).format("MMMM D, YYYY")}</Box>
            ),
          },
          {
            accessor: "checkOut",
            title: "Check out",
            render: ({ checkOut }) => (
              <Box>{moment(checkOut).format("MMMM D, YYYY")}</Box>
            ),
          },
          {
            accessor: "total",
            title: "Total",
            render: ({ total }) => (
              <Box>{total.toLocaleString("en-US") ?? "N/A"} vnđ</Box>
            ),
          },
          {
            accessor: "review",
            title: "Review",
            render: ({ total, id }) => <Button>Review</Button>,
          },
        ]}
        // execute this callback when a row is clicked
        // onRowClick={(a) => {
        //   console.log(a, "table");

        //   handleOpen(a);
        // }}
      />
    </Box>
  );
};
export const HistoryBooking = forwardRef<Ref, Props>(_HistoryBooking);
