import { Box, Container, Flex, LoadingOverlay, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import type { ForwardRefRenderFunction } from "react";
import React, {
  useState,
  type ElementRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { UpdateListingDrawer } from "../../../components/UpdateListingDrawer";
import { type TableHistoryData } from "../../../types";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

import { type Listing } from "@prisma/client";
import { type QueryObserverResult } from "@tanstack/react-query";
import { TableColunm } from "../../../constants/TableListingColunm";
import { useRefPortal } from "../../../hooks";

type Props = {
  sth?: string;
  handleRefetch: () => Promise<void>;
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

const _Present: ForwardRefRenderFunction<Ref, Props> = (
  { handleRefetch },
  ref
) => {
  const updateListingDrawerRef = useRefPortal<typeof UpdateListingDrawer>();

  const handleOpen = (data: TableHistoryData) => {
    return updateListingDrawerRef.current?.openDrawer(data);
  };

  const handleClose = () => {
    return updateListingDrawerRef.current?.closeDrawer();
  };

  const [dataTable, setDataTable] = useState<TableHistoryData[]>([]);

  const { data: session } = useSession();

  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.listing.getByHostId.useQuery(
    { hostId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (currentListing) {
      setDataTable(currentListing);
    }
  }, [currentListing]);
  console.log(currentListing, " data table present");

  useImperativeHandle(ref, () => ({
    refetchFunc: refetch,
  }));

  return (
    <Box>
      <LoadingOverlay visible={isLoading} />
      <DataTable
        mt={20}
        withBorder
        borderRadius="sm"
        // withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={dataTable}
        // define columns
        columns={TableColunm.tableListingColunm}
        // execute this callback when a row is clicked
        onRowClick={(a) => {
          console.log(a, "table");

          handleOpen(a);
        }}
      />

      <UpdateListingDrawer
        refetch={handleRefetch}
        ref={updateListingDrawerRef}
      />
    </Box>
  );
};
export const Present = forwardRef<Ref, Props>(_Present);
