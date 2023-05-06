import {
  Button,
  type ColorScheme,
  Flex,
  Text,
  TextInput,
  Popover,
  type NumberInputHandlers,
  Autocomplete,
  AutocompleteItem,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useLocalStorage } from "@mantine/hooks";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Calenda, Location, Who } from "../../assets/svgs";
import { BsSearch } from "react-icons/bs";
import { GuestDropDown } from "./GuestDropDown";
import axios from "axios";
import { keys } from "../../constants";
import type { FormSearchListingProps } from "../../types";
import { type predictionData, type BookingData, type SearchData } from "../../types";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useSearchListing } from "../../hooks/useSearchListing";
import { throttle } from "lodash";

type Props = {
  index: number;
};

export const SearchBarSpecial: React.FC<Props> = ({ index }) => {
  const [peopleDropDown, setPeopleDropDown] = useState(false);
  const setSearchValue = useSearchListing((state) => state.setValue);

  const [coordinate, setCoordinate] = useState<{
    longitude: number;
    latitude: number;
  }>();
  const [dataSearch, setDataSearch] = useState<predictionData[]>([]);
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  ///vi du thoi nhe
  const form = useForm<FormSearchListingProps>({
    initialValues: {
      checkIn: undefined,
      checkOut: undefined,
      guest: undefined,
    },
    // validate: zodResolver(formSchema),
  });

  const [valueAdult, setValueAdult] = useState(0);
  const [valueChildren, setValueChildren] = useState(0);
  const handlersChildren = useRef<NumberInputHandlers>();

  const handlersAdult = useRef<NumberInputHandlers>();

  const incrementAdult = () => {
    console.log("first");
    handlersAdult.current?.increment();
  };

  const decrementAdult = () => {
    handlersAdult.current?.decrement();
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handleSearch = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    throttle(async (input: string) => {
      try {
        const result = await axios.get<SearchData>(
          `https://rsapi.goong.io/Place/AutoComplete?api_key=${
            keys.YOUR_GOOGLE_MAPS_API_KEY
          }&location=21.013715429594125,%20105.79829597455202&input=${input.replace(/\s+/g, "%")}`
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
    }, 2000),
    []
  );

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

  const handleSubmitSearch = (values: FormSearchListingProps) => {
    try {
      const data = {
        ...values,
        ...coordinate,
      };

      console.log(data);

      setSearchValue(data);

      // console.log(moment(data.checkIn).format("DD/MM/YYYY"));
    } catch (error) {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmitSearch)}>
      <Flex
        bg={
          theme === "light"
            ? "linear-gradient(265.67deg, rgba(252, 252, 253, 0.8) -3.26%, #FCFCFD 50.21%)"
            : "black"
        }
        sx={{
          boxShadow: "0px 64px 40px rgba(45, 41, 41, 0.08)",
          borderRadius: "24px",
        }}
        p={20}
        gap={20}
      >
        <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
          {" "}
          <Location />
          {/* <TextInput
          label={<Text fw={500}>Location</Text>}
          placeholder="Search destinations"
          sx={{
            ".mantine-Input-input": {
              padding: "0px",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
        /> */}
          <Autocomplete
            label="Location"
            placeholder="Enter"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onChange={(e) => void handleSearch(e)}
            // onChange={(value) => setInputPlaceContent(value)}
            // onKeyDown={(e) => handleKeyDown(e)}
            data={dataSearch}
            onItemSubmit={(item: predictionData) => {
              const placeId = item.place_id;

              void handleGetCoordinate(placeId);
            }}
            sx={{
              ".mantine-Input-input": {
                padding: "0px",
                border: "none",
                backgroundColor: "transparent",
              },
            }}
          />
        </Flex>

        <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
          {" "}
          <Calenda />
          <DatePicker
            sx={{
              ".mantine-Input-input": {
                padding: "0px",
                border: "none",
                backgroundColor: "transparent",
              },
            }}
            placeholder="Add dates"
            label="Check in"
            withAsterisk
            dropdownPosition={"bottom-start"}
            {...form.getInputProps("checkIn")}
          />
        </Flex>

        <Flex sx={{ borderRight: " solid 1px #E9EBED " }} gap={10}>
          {" "}
          <Calenda />
          <DatePicker
            sx={{
              ".mantine-Input-input": {
                padding: "0px",
                border: "none",
                backgroundColor: "transparent",
              },
            }}
            dropdownPosition={"bottom-start"}
            placeholder="Add dates"
            label="Check out"
            withAsterisk
            {...form.getInputProps("checkOut")}
          />
        </Flex>

        <Flex gap={10}>
          {" "}
          <Who />
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <TextInput
                readOnly
                onClick={() => setPeopleDropDown(!peopleDropDown)}
                sx={{
                  ".mantine-Input-input": {
                    padding: "0px",
                    border: "none",
                    backgroundColor: "transparent",
                  },
                }}
                placeholder={
                  form.values.guest != 0 ? `${form.values.guest || 0} Guests s` : "Add guests"
                }
                label="Add guests"
                withAsterisk
              />
            </Popover.Target>
            <Popover.Dropdown sx={{ width: "400px !important" }}>
              <Flex direction={"column"} gap={20}>
                {" "}
                <GuestDropDown
                  form={form}
                  xref={handlersAdult}
                  decrement={decrementAdult}
                  title={"Guests"}
                  increment={incrementAdult}
                  setValue={setValueAdult}
                  value={valueAdult}
                />
                {/* <GuestDropDown
                title={"Children"}
                xref={handlersChildren}
                decrement={decrementChildren}
                increment={incrementChildren}
                setValue={setValueChildren}
                value={valueChildren}
              /> */}
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Flex>

        <Button bg={"#3B71FE"} size="lg" leftIcon={<BsSearch />} type="submit">
          Search
        </Button>
      </Flex>
    </form>
  );
};
