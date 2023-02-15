import { Box, type BoxProps, Flex, Text } from "@mantine/core";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";

import { menuHeader } from "../../constants";

type PropsMenuItem = {
  label: string;
  to: string;
};

export const NavMenu: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Box display={{ base: "none", sm: "block" }} {...props}>
      <Flex align="center" gap="4rem">
        {menuHeader.map((item) => (
          <MenuItem key={nanoid()} label={item.label} to={item.to} />
        ))}
      </Flex>
    </Box>
  );
};

const MenuItem: React.FC<PropsMenuItem> = ({ label, to }) => {
  return (
    <Link href={to} target="_blank" rel="noopener noreferrer">
      <Text fz="2rem" fw={600} pos="relative">
        {label}
      </Text>
    </Link>
  );
};
