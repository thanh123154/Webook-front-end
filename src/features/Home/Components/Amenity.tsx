import { Accordion, Box, List, Text, Title } from "@mantine/core";
import { BsShop } from "react-icons/bs";
import { BiBus, BiBuildings } from "react-icons/bi";
import { RxGear } from "react-icons/rx";

import React from "react";
import { nanoid } from "nanoid";

type Props = {
  dataFood: Array<string>;
};

export const Amenity: React.FC<Props> = ({ dataFood }) => {
  return (
    <Box mt={32}>
      <Title mb={16}>What this place offers</Title>

      <Accordion variant="contained">
        <Accordion.Item value="food">
          <Accordion.Control icon={<BsShop size={18} />}>
            <Title fz={18}>Food and Drink</Title>
          </Accordion.Control>
          <Accordion.Panel>
            {" "}
            <List>
              {dataFood.map((item) => (
                <List.Item key={nanoid()}>
                  <Text c={"#7D7C84"}> {item}</Text>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="transportation">
          <Accordion.Control icon={<BiBus size={18} />}>
            <Title fz={18}>Transportation</Title>
          </Accordion.Control>
          <Accordion.Panel>
            {" "}
            <List>
              {dataFood.map((item) => (
                <List.Item key={nanoid()}>
                  <Text c={"#7D7C84"}> {item}</Text>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="general">
          <Accordion.Control icon={<RxGear size={18} />}>
            <Title fz={18}>General</Title>
          </Accordion.Control>
          <Accordion.Panel>
            {" "}
            <List>
              {dataFood.map((item) => (
                <List.Item key={nanoid()}>
                  <Text c={"#7D7C84"}> {item}</Text>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="asdasd">
          <Accordion.Control icon={<BiBuildings size={18} />}>
            <Title fz={18}>Hotel Service</Title>
          </Accordion.Control>
          <Accordion.Panel>
            {" "}
            <List>
              {dataFood.map((item) => (
                <List.Item key={nanoid()}>
                  <Text c={"#7D7C84"}> {item}</Text>
                </List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};
