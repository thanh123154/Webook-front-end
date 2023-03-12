import { Box, Container, Flex, Select, Table } from "@mantine/core";
import React from "react";

type Props = {
  sth: string;
};

export const Present: React.FC<Props> = ({ sth }) => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
    </tr>
  ));
  return (
    <Box>
      <Table striped highlightOnHover verticalSpacing="lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>Gallery</th>
            <th>Desc</th>
            <th>Beds</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Guest</th>
            <th>Detail</th>
            <th>Province</th>
            <th>District</th>
            <th>Ward</th>
            <th>Destination</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};

const data = [
  { value: "react", label: "Fridge" },
  { value: "ng", label: "Pc" },
  { value: "svelte", label: "Room service" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];
