import {
  Box,
  Drawer,
  type DrawerProps,
  Flex,
  type Sx,
  Text,
} from "@mantine/core";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";

import { menuHeader } from "../../constants";

export const DrawerMenu: React.FC<DrawerProps> = ({ ...props }) => {
  return (
    <Drawer
      {...props}
      position="top"
      size="full"
      transition="slide-down"
      transitionTimingFunction="ease-in-out"
      transitionDuration={300}
      overlayOpacity={0}
      color="red"
      zIndex={9}
      withCloseButton={false}
      sx={{ ".mantine-Drawer-body": { height: "100%" } }}
    >
      <Flex direction="column" justify="center" h="100%" pt={40}>
        {menuHeader.map((item) => (
          <Box key={nanoid()} py={20} px={30} sx={sxMenuItem}>
            <Link href={item.to} target="_blank" rel="noopener noreferrer">
              <Text fz={25} fw={500} display="inline-block">
                {item.label}
              </Text>
            </Link>
          </Box>
        ))}
      </Flex>
    </Drawer>
  );
};

const sxMenuItem: Sx = {
  borderTop: "1px solid #00000050",

  "&:last-child": {
    borderBottom: "1px solid #00000050",
  },
};
