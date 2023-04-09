import { Box, Button } from "@mantine/core";
import moment from "moment";

const tableListingColunm = [
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
  // {
  //   accessor: "detail",
  //   title: "Detail",
  // },
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
    render: ({ approved }: { approved: boolean }) =>
      approved === false ? "Pending" : "Yes",
  },
  {
    accessor: "active",
    title: "Active",
    render: ({ active }: { active: boolean }) => (active ? "Yes" : "No"),
  },
];

const tableBookingColunm = [
  {
    accessor: "guests.name",
    title: "User name",
  },

  {
    accessor: "phoneNumber",
    title: "Phone Number",
  },

  {
    accessor: "guests.email",
    title: "Email",
  },
  {
    accessor: "booked.name",
    title: "Listing Name",
  },
  {
    accessor: "checkIn",
    title: "Check in",
    render: ({ checkIn }: { checkIn: Date }) => (
      <Box>{moment(checkIn).format("MMMM D, YYYY")}</Box>
    ),
  },
  {
    accessor: "checkOut",
    title: "Check out",
    render: ({ checkOut }: { checkOut: Date }) => (
      <Box>{moment(checkOut).format("MMMM D, YYYY")}</Box>
    ),
  },
  {
    accessor: "total",
    title: "Total",
    render: ({ total }: { total: number }) => (
      <Box>{total.toLocaleString("en-US") ?? "N/A"} vnđ</Box>
    ),
  },
  {
    accessor: "isDenied",
    title: "Approved",
    render: ({ isDenied }: { isDenied: boolean }) => (
      <Button fz={10} radius={"xs"} disabled={!isDenied}>
        Accept booking
      </Button>
    ),
  },
];

const dataExampleTable = {
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
  gallery: "",
  ward: "",
  destination: "",
  active: true,
  approved: false,
};

export const TableColunm = {
  tableListingColunm,
  dataExampleTable,
  tableBookingColunm,
};
