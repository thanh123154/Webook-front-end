import { Box, Text, type TextProps } from "@mantine/core";
import React from "react";

type Props = TextProps;

export const UnderlineButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box pos="relative" display="inline-block" sx={{ cursor: "pointer" }}>
      <Text fz={{ sm: "2.028rem" }} lh="2em" sx={{ letterSpacing: "-0.02em" }} {...props}>
        {children}
      </Text>

      <Box h={{ base: 1, sm: "0.078rem" }} bg="#000" pos="absolute" bottom={0} left={0} right={0} />
    </Box>
  );
};
