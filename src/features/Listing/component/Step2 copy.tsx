import { Box } from "@mantine/core";
import React, { useEffect, useState } from "react";

type Props = {
  sth: string;
};

export const Step1: React.FC<Props> = ({ sth }) => {
  return <Box> Step 1 content: Create an account</Box>;
};
