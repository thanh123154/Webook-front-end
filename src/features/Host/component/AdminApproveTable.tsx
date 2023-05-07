import { Box, LoadingOverlay, Table } from "@mantine/core";
import type { ForwardRefRenderFunction } from "react";
import React, { useImperativeHandle, forwardRef } from "react";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { nanoid } from "nanoid";

type Props = {
  sth?: string;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _AdminApproveTable: ForwardRefRenderFunction<Ref, Props> = (
  { sth },
  ref
) => {
  const { data: session } = useSession();
  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.listing.getByHostIdAndNotApproved.useQuery(
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
          <tr key={nanoid()}>
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
    <Box>
      <LoadingOverlay visible={isLoading} />

      <Table>
        {heads}

        {rows}
      </Table>
    </Box>
  );
};
export const AdminApproveTable = forwardRef<Ref, Props>(_AdminApproveTable);
