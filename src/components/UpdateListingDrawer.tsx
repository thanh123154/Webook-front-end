import {
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Image,
  MultiSelect,
  NumberInput,
  ScrollArea,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Title,
  type Sx,
} from "@mantine/core";
import {
  Dropzone,
  type FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { type Editor as TinyMCEEditor } from "tinymce";
import {
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from "react";
import { TextEditor } from "./text-editor";
import { useForm } from "@mantine/form";
import { nanoid } from "nanoid";
import { type TableHistoryData } from "../types";

type Props = {
  opened: boolean;
  setClose: () => void;
  dataDrawer: TableHistoryData;
};
type Ref = {
  openDrawer: () => void;
  closeDrawer: () => void;
};
const _UpdateListingDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { opened, dataDrawer, setClose, ...props },
  ref
) => {
  const [openedDrawer, setOpened] = useState(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={nanoid()}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt=""
      />
    );
  });
  console.log(files, "oke");
  const form = useForm({
    initialValues: dataDrawer,
  });

  useEffect(() => {
    // setCurrentData(dataDrawer);
    form.setValues(dataDrawer);
  }, [dataDrawer]);

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      setOpened(true);
    },
    closeDrawer: handleClose,
  }));

  const handleClose = () => {
    setOpened(false);

    form.reset();
  };
  return (
    <Drawer
      size={"100%"}
      position={"right"}
      opened={opened}
      onClose={() => setClose()}
      padding={30}
      {...props}
      title={<Title>Update Listing</Title>}
    >
      <ScrollArea h={"90vh"}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Flex py={40} px={40} gap={50} direction={"column"}>
            {" "}
            <Textarea
              placeholder="Make it descriptive and unique so guests will understand what you’re offering."
              label="Title"
              radius="md"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <Flex justify={"space-between"} gap={50}>
              {" "}
              <NumberInput
                defaultValue={0}
                placeholder="Enter"
                label="Beds"
                withAsterisk
                {...form.getInputProps("beds")}
                w={"50%"}
              />
              <NumberInput
                defaultValue={0}
                placeholder="Enter"
                label="Bedsroom"
                withAsterisk
                w={"50%"}
                {...form.getInputProps("bedsroom")}
              />
            </Flex>
            <Flex justify={"space-between"} gap={50}>
              {" "}
              <NumberInput
                defaultValue={0}
                placeholder="Enter"
                label="Bathrooms"
                withAsterisk
                w={"50%"}
                {...form.getInputProps("bathrooms")}
              />
              <NumberInput
                defaultValue={0}
                placeholder="Enter"
                label="Guests"
                withAsterisk
                w={"50%"}
                {...form.getInputProps("guests")}
              />
            </Flex>
            <Textarea
              placeholder="Make it descriptive and unique so guests will understand what you’re offering."
              label="Description"
              radius="md"
              withAsterisk
              {...form.getInputProps("description")}
            />
            <Flex justify={"space-between"} gap={50}>
              {" "}
              <MultiSelect
                data={data}
                label="Amenity"
                placeholder="Pick all amenity you have"
                clearable
                w={"100%"}
                defaultValue={["US", "FI"]}
                {...form.getInputProps("amenity")}
              />
            </Flex>
            <Box>
              <Title my={10}>Your Picture</Title>
              <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                <Text align="center">Drop images here</Text>
              </Dropzone>

              <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                mt={previews.length > 0 ? "xl" : 0}
              >
                {previews}
              </SimpleGrid>
            </Box>
            <Box>
              {" "}
              <Title mb={10}>Detail</Title>
              <TextEditor editorRef={editorRef} />
            </Box>
            <NumberInput
              label="Long-term rental price"
              rightSection={<Box mr={50}> vnđ</Box>}
              defaultValue={1000}
              parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                value && !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
            />
            <NumberInput
              label="Short-term rental price"
              rightSection={<Box mr={50}> vnđ</Box>}
              defaultValue={1000}
              parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                value && !Number.isNaN(parseFloat(value))
                  ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
            />
            <Select label="Province" placeholder="Pick one" data={data} />
            <Select label="District" placeholder="Pick one" data={data} />
            <Select label="Ward" placeholder="Pick one" data={data} />
            <Textarea
              placeholder="Enter"
              label="Detail address(optional)"
              radius="md"
              withAsterisk
              // autosize
            />
            <Group>
              {" "}
              <Button onClick={() => setClose()} variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Group>
          </Flex>
        </form>
      </ScrollArea>
    </Drawer>
  );
};

export const UpdateListingDrawer = forwardRef<Ref, Props>(_UpdateListingDrawer);

const data = [
  { value: "US", label: "Fridge" },
  { value: "FI", label: "Pc" },
  { value: "svelte", label: "Room service" },
  { value: "vue", label: "vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];
