import { Box, Drawer, Title, type Sx } from "@mantine/core";

import {
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
  forwardRef,
} from "react";

type Props = {
  opened: boolean;
  setClose: () => void;
};
type Ref = {
  openDrawer: () => void;
  closeDrawer: () => void;
};
const _UpdateListingDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { opened, setClose, ...props },
  ref
) => {
  const [openedDrawer, setOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setOpened(true);
    },
    closeDrawer: handleClose,
  }));

  const handleClose = () => {
    setOpened(false);

    // form.reset();
  };
  return (
    <Drawer
      size={"100%"}
      position={"right"}
      opened={opened}
      onClose={() => setClose()}
      padding={50}
      {...props}
      title={<Title>Update Listing</Title>}
    ></Drawer>
  );
};

export const UpdateListingDrawer = forwardRef<Ref, Props>(_UpdateListingDrawer);
