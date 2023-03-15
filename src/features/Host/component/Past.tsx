import { Box, Container, Flex, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React, { useState, type ElementRef, useRef, useEffect } from "react";
import { UpdateListingDrawer } from "../../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../../types";

type Props = {
  sth: string;
};
type DetailListing = ElementRef<typeof UpdateListingDrawer>;

export const Past: React.FC<Props> = ({ sth }) => {
  const [opened, setOpened] = useState(false);
  const [dataDrawer, setDataDrawer] = useState<TableHistoryData>({
    id: 1,
    name: "",
    address: "",
    price: 2,
    desc: "",
    beds: 2,
    bedrooms: 2,
    bathrooms: 2,
    guests: 2,
    detail: "",
    province: "",
    district: "",
    ward: "",
    destination: "",
    active: true,
  });
  const refDetailListing = useRef<DetailListing>(null);

  const data: TableHistoryData[] = [];

  for (let i = 0; i < 10; i++) {
    const item = {
      id: i + 1,
      name: `Item ${i + 1}`,
      address: `${Math.floor(Math.random() * 1000) + 1} Main St`,
      price: Math.floor(Math.random() * 1000000) + 100000,
      // gallery: `https://picsum.photos/200/300?random=${i + 1}`,
      desc: `Description for item ${i + 1}`,
      beds: Math.floor(Math.random() * 10) + 1,
      bedrooms: Math.floor(Math.random() * 10) + 1,
      bathrooms: Math.floor(Math.random() * 10) + 1,
      guests: Math.floor(Math.random() * 10) + 1,
      detail: `https://example.com/item/${i + 1}`,
      province: `Province ${i % 3}`,
      district: `District ${i % 5}`,
      ward: `Ward ${i % 10}`,
      destination: `Destination ${i % 2}`,
      active: Math.random() < 0.5,
    };
    data.push(item);
  }

  return (
    <Box>
      <DataTable
        mt={20}
        withBorder
        borderRadius="sm"
        // withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={data}
        // define columns
        columns={[
          {
            accessor: "id",
            title: "#",
            textAlignment: "right",
          },
          {
            accessor: "name",
            title: "Name",
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
