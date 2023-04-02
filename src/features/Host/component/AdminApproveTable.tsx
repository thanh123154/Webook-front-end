import { Box, Container, Flex, LoadingOverlay, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import type { ForwardRefRenderFunction } from "react";
import React, {
  useState,
  type ElementRef,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { UpdateListingDrawer } from "../../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../../types";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";

type Props = {
  sth: string;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

type DetailListing = ElementRef<typeof UpdateListingDrawer>;

const _AdminApproveTable: ForwardRefRenderFunction<Ref, Props> = (
  { sth },
  ref
) => {
  const [opened, setOpened] = useState(false);

  const [dataTable, setDataTable] = useState<TableHistoryData[]>([]);

  const { data: session } = useSession();
  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.listing.getByHostIdAndNotApproved.useQuery(
    { hostId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  const [dataDrawer, setDataDrawer] = useState<TableHistoryData>({
    id: "sth",
    name: "",
    address: "",
    priceLongTerm: 0,
    priceShortTerm: 0,
    desc: "",
    beds: 2,
    bedsrooms: 2,
    bathrooms: 2,
    guests: 2,
    detail: "",
    province: "",
    district: "",
    ward: "",
    destination: "",
    active: true,
    approved: false,
  });

  useEffect(() => {
    if (currentListing) {
      setDataTable(currentListing);
    }
  }, [currentListing]);

  const refDetailListing = useRef<DetailListing>(null);

  useImperativeHandle(ref, () => ({
    refetchFunc: refetch,
  }));

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
            accessor: "name",
            title: "Title",
          },

          {
            accessor: "address",
            title: "Address",
          },
          {
            accessor: "price",
            title: "Price",
          },
          // {
          //   accessor: "gallery",
          //   title: "Gallery",
          //   render: ({ gallery }) => <img src={gallery} alt="gallery" />,
          // },
          {
            accessor: "desc",
            title: "Description",
          },
          {
            accessor: "beds",
            title: "Beds",
          },
          {
            accessor: "bedrooms",
            title: "Bedrooms",
          },
          {
            accessor: "bathrooms",
            title: "Bathrooms",
          },
          {
            accessor: "guests",
            title: "Guests",
          },
          {
            accessor: "detail",
            title: "Detail",
          },
          {
            accessor: "province",
            title: "Province",
          },
          {
            accessor: "district",
            title: "District",
          },
          {
            accessor: "ward",
            title: "Ward",
          },
          {
            accessor: "destination",
            title: "Destination",
          },
          {
            accessor: "approved",
            title: "Approved",
            render: ({ active }) => (active === true ? "Yes" : "Pending"),
          },
          {
            accessor: "active",
            title: "Active",
            render: ({ active }) => (active ? "Yes" : "No"),
          },
        ]}
        // execute this callback when a row is clicked
        onRowClick={(a) => {
          console.log(a, "table");
          setDataDrawer(a);
          setOpened(true);
        }}
      />

      <UpdateListingDrawer
        dataDrawer={dataDrawer}
        opened={opened}
        setClose={() => setOpened(false)}
        ref={refDetailListing}
      />
    </Box>
  );
};
export const AdminApproveTable = forwardRef<Ref, Props>(_AdminApproveTable);
