import { Box, LoadingOverlay } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import type { ForwardRefRenderFunction } from "react";
import React, {
  useState,
  type ElementRef,
  useRef,
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
};

type Ref = {
  refetchFunc: () => Promise<QueryObserverResult<Listing[]>>;
};

// type DetailListing = ElementRef<typeof UpdateListingDrawer>;

const _AdminApproveTable: ForwardRefRenderFunction<Ref, Props> = (
  { sth },
  ref
) => {
  const updateListingDrawerRef = useRefPortal<typeof UpdateListingDrawer>();

  // const handleOpen = (data: TableHistoryData) => {
  //   return updateListingDrawerRef.current?.openDrawer(data);
  // };

  // const handleClose = () => {
  //   return updateListingDrawerRef.current?.closeDrawer();
  // };

  const [dataTable, setDataTable] = useState<TableHistoryData[]>([]);

  const { data: session } = useSession();
  const {
    data: currentListing,
    isLoading,
    refetch,
  } = api.listing.getByHostIdAndNotApproved.useQuery(
    { hostId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (currentListing) {
      setDataTable(currentListing);
    }
  }, [currentListing]);

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
      />
    </Box>
  );
};
export const AdminApproveTable = forwardRef<Ref, Props>(_AdminApproveTable);
