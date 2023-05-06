import {
  AspectRatio,
  Autocomplete,
  Box,
  Button,
  Center,
  Drawer,
  Flex,
  Group,
  Image,
  MultiSelect,
  NumberInput,
  ScrollArea,
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
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { TextEditor } from "./text-editor";
import { useForm, zodResolver } from "@mantine/form";
import { nanoid } from "nanoid";
import type { SearchData, predictionData } from "../types";
import { type LocationData, type TableHistoryData } from "../types";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import { showNotification } from "@mantine/notifications";
import { uploadFile } from "../helpers";
import { DataXa, keys } from "../constants";
import axios from "axios";

type Props = {
  refetch?: () => Promise<void>;

  isCreateListing?: boolean;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter title" }),
  beds: z.number().min(0, { message: "Please enter beds" }),
  bedsrooms: z.number().min(0, { message: "Please enter bedsrooms" }),
  bathrooms: z.number().min(0, { message: "Please enter bathrooms" }),
  guests: z.number().min(1, { message: "Please enter guest" }),
  priceLongTerm: z.number().min(1, { message: "Please enter price" }),
  priceShortTerm: z.number().min(1, { message: "Please enter price" }),
  desc: z
    .string()
    .min(1, { message: "Please enter description for your place" }),
});

type Ref = {
  openDrawer: (data: TableHistoryData) => void;
  closeDrawer: () => void;
};

const _UpdateListingDrawer: ForwardRefRenderFunction<Ref, Props> = (
  { isCreateListing = false, refetch, ...props },
  ref
) => {
  const [openedDrawer, setOpened] = useState(false);
  const [addressToSubmit, setAddressToSubmit] = useState("");

  const [dataSearch, setDataSearch] = useState<predictionData[]>([]);

  const [coordinate, setCoordinate] = useState<{
    longitude: number;
    latitude: number;
  }>();

  // const dataProvince: string[] = Array.from(
  //   new Set(DataXa.map((item: LocationData) => item.city))
  // );
  // const dataWard: string[] = DataXa.map((item: LocationData) => item.ward);
  // const dataDistrict: string[] = Array.from(
  //   new Set(DataXa.map((item: LocationData) => item.district))
  // );

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [filesGallery, setFiles] = useState<FileWithPath[]>([]);

  const { data: session } = useSession();

  const [isUpdating, setIsUpdating] = useState(false);

  const [dataDrawer, setDataDrawer] = useState<TableHistoryData>();

  const [urlsGallery, setUrlsGallery] = useState<string[]>([]);

  const { mutateAsync: apiCreate } = api.listing.create.useMutation();

  const { mutateAsync: apiUpdate } = api.listing.update.useMutation();

  const form = useForm<TableHistoryData>({
    initialValues: dataDrawer,
    validate: zodResolver(formSchema),
  });

  const handleSubmitCreateListing = async (values: TableHistoryData) => {
    console.log(values, "day la value create");
    const info = editorRef.current?.getContent() || "";
    if (previews.length < 4) {
      showNotification({
        color: "red",
        message: "At least 4 picture needed",
      });
    } else if (addressToSubmit.length < 10) {
      showNotification({
        color: "red",
        message: "Please enter address",
      });
    } else {
      try {
        setIsUpdating(true);
        const uploadedGallery = await Promise.all(
          filesGallery.map((file) => uploadFile(file))
        );
        const allGallery = [
          ...urlsGallery,
          ...uploadedGallery.filter((x) => x !== undefined),
        ] as string[];
        // Prepare updated user data

        if (coordinate?.latitude) {
          const createListingData = {
            ...values,
            gallery: JSON.stringify(allGallery),
            active: true,
            detail: info,
            placeId: "123321",
            approved: false,
            address: addressToSubmit,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          };
          await apiCreate({
            hostId: session?.user?.id || "",
            ...createListingData,
          });

          showNotification({
            color: "green",
            message: "Create listing successfully",
          });
          setFiles([]);
          form.reset();
          setOpened(false);
          setAddressToSubmit("");
          refetch && (await refetch());
        } else {
          throw "";
        }

        // Call the update user API endpoint

        // Refetch the updated user data

        // Clear the file input and reset the form
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleSubmitUpdateListing = async (values: TableHistoryData) => {
    console.log("hello", values);
    const info = editorRef.current?.getContent() || "";
    switch (true) {
      case previews.length < 4:
        showNotification({
          color: "red",
          message: "At least 4 picture needed",
        });
        break;
      case addressToSubmit.length < 10:
        showNotification({
          color: "red",
          message: "Please enter address",
        });
        break;
      default:
        try {
          setIsUpdating(true);
          const uploadedGallery = await Promise.all(
            filesGallery.map((file) => uploadFile(file))
          );

          const allGallery = [
            ...urlsGallery,
            ...uploadedGallery.filter((x) => x !== undefined),
          ] as string[];
          // Prepare updated user data

          if (coordinate?.latitude) {
            const updateListingData = {
              ...values,
              gallery: JSON.stringify(allGallery),
              active: true,
              detail: info,
              placeId: "123321",
              address: addressToSubmit,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            };
            // return console.log(updateListingData, "219");

            // Call the update user API endpoint
            await apiUpdate({
              ...updateListingData,
              id: dataDrawer?.id || "",
            });

            // Refetch the updated user data

            // Clear the file input and reset the form
            showNotification({
              color: "green",
              message: "Update listing successfully",
            });

            form.reset();
            setOpened(false);
            refetch && (await refetch());
          } else {
            throw "";
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsUpdating(false);
        }
    }
  };

  const previews = useMemo(() => {
    return [
      ...filesGallery.map((file) => URL.createObjectURL(file)),
      ...urlsGallery,
    ].map((link) => {
      return (
        <AspectRatio key={nanoid()} ratio={1}>
          {" "}
          <Image
            src={link}
            // imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            alt=""
          />
        </AspectRatio>
      );
    });
  }, [filesGallery, urlsGallery]);

  useImperativeHandle(ref, () => ({
    openDrawer: (data) => {
      setDataDrawer(data);
      form.setValues(data);
      console.log(data, "data khi mo drawer");
      if (data.gallery) {
        setUrlsGallery(JSON.parse(data.gallery) as string[]);
      }
      setAddressToSubmit(data.address);
      setOpened(true);
    },
    closeDrawer: handleClose,
  }));

  const handleClose = () => {
    setOpened(false);
    form.reset();
    setFiles([]);
    setAddressToSubmit("");
  };

  const handleSearch = useCallback(async (input: string) => {
    try {
      const result = await axios.get<SearchData>(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${
          keys.YOUR_GOOGLE_MAPS_API_KEY
        }&location=21.013715429594125,%20105.79829597455202&input=${input.replace(
          /\s+/g,
          "%"
        )}`
      );

      const data = result.data.predictions;
      console.log(result, "kq");

      setDataSearch(
        data.map((item) => ({
          ...item,
          value: item.description,
          place_id: item.place_id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCoordinate = useCallback(async (input: string) => {
    try {
      const result = await axios.get<{
        result: { geometry: { location: { lat: number; lng: number } } };
      }>(
        `https://rsapi.goong.io/Place/Detail?place_id=${input}&api_key=${keys.YOUR_GOOGLE_MAPS_API_KEY}`
      );

      const { lat, lng } = result.data.result.geometry.location;

      setCoordinate({ latitude: lat, longitude: lng });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      size={"100%"}
      position={"right"}
      opened={openedDrawer}
      onClose={() => handleClose()}
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
                {...form.getInputProps("bedsrooms")}
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
                data={dataAmenity}
                label="Amenity"
                placeholder="Pick all amenity you have"
                clearable
                w={"100%"}
                defaultValue={["WiFi"]}
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
                mt={"xl"}
              >
                {previews}
              </SimpleGrid>

              {previews.length > 0 && (
                <Center mt={20}>
                  {" "}
                  <Button
                    onClick={() => {
                      setFiles([]);
                      setUrlsGallery([]);
                    }}
                    variant="outline"
                  >
                    Remove files
                  </Button>
                </Center>
              )}
            </Box>
            <Box>
              {" "}
              <Title mb={10}>Detail (optional)</Title>
              <TextEditor
                editorRef={editorRef}
                label="Thông tin"
                initData={dataDrawer?.detail}
                // withAsterisk
              />
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
            <Autocomplete
              label="Detail address"
              placeholder="Enter"
              defaultValue={addressToSubmit}
              onChange={(e) => void handleSearch(e)}
              // onChange={(value) => setInputPlaceContent(value)}
              // onKeyDown={(e) => handleKeyDown(e)}
              data={dataSearch}
              onItemSubmit={(item: predictionData) => {
                const placeId = item.place_id;
                void handleGetCoordinate(placeId);

                setAddressToSubmit(item.description);
              }}
            />
            <Group>
              {" "}
              <Button onClick={() => handleClose()} variant="outline">
                Cancel
              </Button>
              <Button loading={isUpdating} type="submit">
                Submit
              </Button>
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

const dataAmenity = [
  { value: "Fridge", label: "Fridge" },
  { value: "Pc", label: "Pc" },
  { value: "RoomService", label: "Room service" },
  { value: "WiFi", label: "WiFi" },
  { value: "TV", label: "TV" },
  { value: "Pool", label: "Pool" },
  { value: "Gym", label: "Gym" },
  { value: "AirCon", label: "Air conditioning" },
  { value: "Parking", label: "Parking" },
  { value: "Laundry", label: "Laundry" },
  { value: "Kitchen", label: "Kitchen" },
  { value: "Microwave", label: "Microwave" },
  { value: "Oven", label: "Oven" },
  { value: "Dishwasher", label: "Dishwasher" },
  { value: "HairDryer", label: "Hair dryer" },
  { value: "Iron", label: "Iron" },
  { value: "Heating", label: "Heating" },
  { value: "Balcony", label: "Balcony" },
  { value: "Fireplace", label: "Fireplace" },
  { value: "PetFriendly", label: "Pet friendly" },
];
