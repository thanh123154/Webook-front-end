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
    render: ({ approved }: { approved: boolean }) =>
      approved === false ? "Pending" : "Yes",
  },
  {
    accessor: "active",
    title: "Active",
    render: ({ active }: { active: boolean }) => (active ? "Yes" : "No"),
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
};
