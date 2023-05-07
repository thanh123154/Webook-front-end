import { Box, Spoiler } from "@mantine/core";

import React from "react";

type Props = {
  info?: string;
};

export const Overview: React.FC<Props> = ({ info }) => {
  return (
    <Box mt={24}>
      <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Hide">
        <div dangerouslySetInnerHTML={{ __html: info || "" }} />
      </Spoiler>
    </Box>
  );
};
