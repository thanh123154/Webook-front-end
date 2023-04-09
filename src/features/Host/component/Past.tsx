import { Box, Container, Flex, LoadingOverlay, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React, { useState, type ElementRef, useRef, useEffect } from "react";
import { UpdateListingDrawer } from "../../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../../types";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

type Props = {
  sth: string;
};

export const Past: React.FC<Props> = ({ sth }) => {
  return <Box></Box>;
};
