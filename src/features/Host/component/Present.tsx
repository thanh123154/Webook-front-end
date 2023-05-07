import { Box, LoadingOverlay, Table } from "@mantine/core";
import type { ForwardRefRenderFunction } from "react";
import React, { useImperativeHandle, forwardRef } from "react";
import { UpdateListingDrawer } from "../../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../../types";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { useRefPortal } from "../../../hooks";
import { nanoid } from "nanoid";

type Props = {
  sth?: string;
  handleRefetch: () => Promise<void>;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _Present: ForwardRefRenderFunction<Ref, Props> = (
  { handleRefetch },
  ref
) => {
  const updateListingDrawerRef = useRefPortal<typeof UpdateListingDrawer>();

  const handleOpen = (data: TableHistoryData) => {
    return updateListingDrawerRef.current?.openDrawer(data);
  };

  const handleClose = () => {
    return updateListingDrawerRef.current?.closeDrawer();
  };

  const { data: session } = useSession();

  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.listing.getByHostId.useQuery(
    { hostId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  useImperativeHandle(ref, () => ({
    refetchFunc: refetch,
  }));

  const heads = (
    <thead>
      <tr>
        <th>Title</th>
        <th>Address</th>
        <th>Price Long Term</th>
        <th>Price Short Term</th>
        <th>Description</th>
        <th>Beds</th>
        <th>Bedsrooms</th>
        <th>Bathrooms</th>
        <th>Guests</th>
        <th>Approved</th>
        <th>Active</th>
      </tr>
    </thead>
  );

  const rows = (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={11}
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
            colSpan={11}
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
          <tr
            style={{
              cursor: "pointer",
            }}
            key={nanoid()}
            onClick={() => handleOpen(item)}
          >
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.priceLongTerm.toLocaleString("en-US") ?? "N/A"} vnđ</td>
            <td>{item.priceShortTerm.toLocaleString("en-US") ?? "N/A"} vnđ</td>
            <td>{item.desc}</td>
            <td>{item.beds}</td>
            <td>{item.bedsrooms}</td>
            <td>{item.bathrooms}</td>
            <td>{item.guests}</td>
            <td>{item.approved ? "Yes" : "Pending"}</td>
            <td>{item.active ? "True" : "False"}</td>
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

      <UpdateListingDrawer
        refetch={handleRefetch}
        ref={updateListingDrawerRef}
      />
    </Box>
  );
};
export const Present = forwardRef<Ref, Props>(_Present);
