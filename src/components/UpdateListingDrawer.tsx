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
} from "@mantine/core";
import {
  Dropzone,
  type FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { type Editor as TinyMCEEditor } from "tinymce";
import {
  useEffect,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from "react";
import { TextEditor } from "./text-editor";
import { useForm, zodResolver } from "@mantine/form";
import { nanoid } from "nanoid";
import { type TableHistoryData } from "../types";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";

type Props = {
  opened: boolean;
  setClose: () => void;
  refetch?: () => void;
  dataDrawer: TableHistoryData;
  isCreateListing?: boolean;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter title" }),
  beds: z.number().min(0, { message: "Please enter beds" }),
  bedsrooms: z.number().min(0, { message: "Please enter bedsroom" }),
  bathrooms: z.number().min(0, { message: "Please enter bathrooms" }),
  guests: z.number().min(0, { message: "Please enter guest" }),
});

type Ref = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

const _UpdateListingDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { opened, dataDrawer, setClose, isCreateListing = false, refetch, ...props },
  ref
) => {
  const [openedDrawer, setOpened] = useState(false);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [filesGallery, setFiles] = useState<FileWithPath[]>([]);

  const { data: session } = useSession();

  const [isUpdating, setIsUpdating] = useState(false);

  const { mutateAsync: apiCreate } = api.listing.create.useMutation();

  const { mutateAsync: apiUpdate } = api.listing.update.useMutation();

  const form = useForm<TableHistoryData>({
    initialValues: dataDrawer,
    validate: zodResolver(formSchema),
  });

  const handleSubmitCreateListing = async (values: TableHistoryData) => {
    console.log(values, "day la value create");

    try {
      setIsUpdating(true);

      // Prepare updated user data
      const createListingData = {
        name: values.name,
        beds: values.beds,
        bedsrooms: values.bedsrooms,
        bathrooms: values.bathrooms,
        guests: values.guests,
        address: values.address,
        priceLongTerm: values.priceLongTerm,
        priceShortTerm: values.priceShortTerm,
        gallery: "",
        desc: values.desc,
        active: true,
        detail: "",
        placeId: "123321",
        province: values.province,
        district: values.district,
        ward: values.ward,
        approved: false,
      };

      // Call the update user API endpoint
      await apiCreate({
        hostId: session?.user?.id || "",
        ...createListingData,
      });

      // Refetch the updated user data

      // Clear the file input and reset the form

      form.reset();
      setClose();
      refetch && refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmitUpdateListing = async (values: TableHistoryData) => {
    console.log(values, "day la value update");

    try {
      setIsUpdating(true);

      // Prepare updated user data
      const updateListingData = {
        name: values.name,
        beds: values.beds,
        bedsrooms: values.bedsrooms,
        bathrooms: values.bathrooms,
        guests: values.guests,
        address: values.address,
        priceLongTerm: values.priceLongTerm,
        priceShortTerm: values.priceShortTerm,
        gallery: "",
        desc: values.desc,
        active: true,
        detail: "",
        placeId: "123321",
        province: values.province,
        district: values.district,
        ward: values.ward,
      };

      // Call the update user API endpoint
      await apiUpdate({
        id: dataDrawer?.id || "",
        ...updateListingData,
      });

      // Refetch the updated user data

      // Clear the file input and reset the form

      form.reset();
      setClose();
      refetch && refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const previews = filesGallery.map((file, index) => {
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

  useEffect(() => {
    // setCurrentData(dataDrawer);
    form.setValues(dataDrawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      title={
        <Title>{isCreateListing ? "Create Listing" : "Update Listing"} </Title>
      }
    >
      <ScrollArea h={"90vh"}>
        <form
          onSubmit={form.onSubmit((values) =>
            isCreateListing
              ? void handleSubmitCreateListing(values)
              : void handleSubmitUpdateListing(values)
          )}
        >
          <Flex py={40} px={40} gap={50} direction={"column"}>
            {" "}
            <Textarea
              placeholder="Make it descriptive and unique so guests will understand what you’re offering."
              label="Title"
              radius="md"
              withAsterisk
              {...form.getInputProps("name")}
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
              {...form.getInputProps("desc")}
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
              {...form.getInputProps("priceLongTerm")}
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
              {...form.getInputProps("priceShortTerm")}
            />
            <Select
              label="Province"
              placeholder="Pick one"
              data={data}
              {...form.getInputProps("province")}
            />
            <Select
              label="District"
              placeholder="Pick one"
              data={data}
              {...form.getInputProps("district")}
            />
            <Select
              label="Ward"
              placeholder="Pick one"
              data={data}
              {...form.getInputProps("ward")}
            />
            <Textarea
              placeholder="Enter"
              label="Detail address(optional)"
              radius="md"
              withAsterisk
              // autosize
              {...form.getInputProps("address")}
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
