import { Box, Button, LoadingOverlay, Table } from "@mantine/core";
import type { ForwardRefRenderFunction } from "react";
import React, { forwardRef } from "react";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import moment from "moment";
import { ReviewModal } from "./ReviewModal";
import { useDisclosure } from "@mantine/hooks";
import { nanoid } from "nanoid";

type Props = {
  sth?: string;
  handleRefetch: () => Promise<void>;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _HistoryBooking: ForwardRefRenderFunction<Ref, Props> = () => {
  const { data: session } = useSession();

  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.booking.getHistoryBookingByHostId.useQuery(
    { guestId: session?.user?.id || "" },
    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  console.log(currentListing, " data table present");

  const handleRefetch = async () => {
    await refetch();
  };

  const ButtonReview = ({
    id,
    listingId,
    isReview,
  }: {
    id: string;
    listingId: string;
    isReview: boolean;
  }) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <Box>
        <ReviewModal
          refetch={() => handleRefetch()}
          idBooking={id}
          listingId={listingId}
          close={close}
          opened={opened}
        />
        <Button
          onClick={open}
          // loading={isUpdating}
          fz={10}
          radius={"xs"}
          disabled={isReview}
        >
          Review
        </Button>
      </Box>
    );
  };

  const heads = (
    <thead>
      <tr>
        <th>Host name</th>
        <th>Listing Name</th>
        <th>Check in</th>
        <th>Check out</th>
        <th>Total</th>
        <th>Review</th>
      </tr>
    </thead>
  );

  const rows = (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={6}
            style={{ textAlign: "center", fontSize: 20, paddingBlock: 50, fontWeight: "bold" }}
          >
            Loading...
          </td>
        </tr>
      ) : !currentListing || !currentListing.length ? (
        <tr>
          <td
            colSpan={6}
            style={{ textAlign: "center", fontSize: 20, paddingBlock: 50, fontWeight: "bold" }}
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
            <td>{item.total.toLocaleString("en-US") ?? "N/A"}</td>
            <td>
              <ButtonReview
                id={item.id}
                isReview={item.isReview || false}
                listingId={item.listingId}
              />
            </td>
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
export const HistoryBooking = forwardRef<Ref, Props>(_HistoryBooking);
