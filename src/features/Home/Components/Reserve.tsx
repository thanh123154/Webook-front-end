import {
  Box,
  Button,
  Group,
  type NumberInputHandlers,
  Text,
  Title,
  SegmentedControl,
  Center,
  type ColorScheme,
  InputBase,
  Flex,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";

import React, { useEffect, useRef, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { GuestDropDown } from "../../../layouts/components/GuestDropDown";
import { IMaskInput } from "react-imask";
import { api } from "../../../utils/api";
import { type BookingData } from "../../../types";
import { useSession } from "next-auth/react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { keys } from "../../../constants";
import { getStripe } from "../../../libs/stripe-client";
import { TRPCClientError } from "@trpc/client";
import moment from "moment";
import { ButtonContact } from "./ButtonContact";

type Props = {
  place?: string;
  longTermPrice: number | undefined;
  shortTermPrice: number | undefined;
  listingId?: string;
  listingName?: string;
  guests: number;
  hostId?: string;
};

export const Reserve: React.FC<Props> = ({
  place,
  longTermPrice,
  shortTermPrice,
  listingId,
  listingName,
  guests,
  hostId,
}) => {
  const { data: session, status } = useSession();

  const [theme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  const [dayDif, setDayDif] = useState(0);

  const [currentPrice, setCurrentPrice] = useState(
    longTermPrice ? longTermPrice : 0
  );

  const totalPrice = currentPrice * dayDif || 0;

  useEffect(() => {
    setCurrentPrice(longTermPrice || 0);
  }, [longTermPrice]);

  const [valueAdult, setValueAdult] = useState(0);
  // const [valueChildren, setValueChildren] = useState(0);

  const formattedPriceLongTerm = `${
    longTermPrice?.toLocaleString("en-US") ?? "N/A"
  }`;
  const formattedPriceShortTerm = `${
    shortTermPrice?.toLocaleString("en-US") ?? "N/A"
  }`;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { mutateAsync: apiCheckout } = api.stripe.checkoutSession.useMutation();
  const { mutateAsync: apiPrepaid } = api.booking.prepaid.useMutation();

  const handlersAdult = useRef<NumberInputHandlers>();

  const incrementAdult = () => {
    handlersAdult.current?.increment();
  };

  const decrementAdult = () => {
    handlersAdult.current?.decrement();
  };

  const formSchema = z
    .object({
      checkIn: z.date(),
      checkOut: z.date(),
      guest: z.number().min(1, { message: "Enter" }),
      phoneNumber: z.string().min(1, { message: "Please enter phone number" }),
    })
    .refine((data) => data.checkIn < data.checkOut, {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    });

  const form = useForm<BookingData>({
    // initialValues: dataDrawer,
    validate: zodResolver(formSchema),
  });

  const handleSubmitCreateBooking = async (values: BookingData) => {
    if (listingName && listingId && session && session.user) {
      localStorage.setItem(keys.BOOKING_TEMP, JSON.stringify(values));

      try {
        setIsCheckingOut(true);

        const prepaidData = {
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          guest: values.guest,
          phoneNumber: values.phoneNumber,
          guestId: session.user.id,
          listingId,
          total: totalPrice,
        };

        console.log(prepaidData);

        const bookingId = await apiPrepaid(prepaidData);

        const { id: sessionId } = await apiCheckout({
          productName: listingName,
          amount: totalPrice,
          cancelPath: `/listing-details/${listingId}`,
          bookingId,
        });

        const stripe = await getStripe();

        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });

          alert(error);
        }
      } catch (error) {
        if (error instanceof TRPCClientError) {
          alert(error.message);
        } else {
          console.log(error);
        }
      } finally {
        setIsCheckingOut(false);
      }
    }
  };

  useEffect(() => {
    const start = moment(form.values.checkIn);
    const end = moment(form.values.checkOut);

    const duration = moment.duration(end.diff(start));
    setDayDif(duration.days());
    // console.log(duration.days(), "day");
  }, [form.values.checkIn, form.values.checkOut]);

  return (
    <Flex direction={"column"} gap={20} miw={460} h="fit-content" pl={50}>
      <Box
        sx={{
          border: "1px solid #E9EBED",
          borderRadius: "24px",
        }}
        p={20}
      >
        <Title fz={32} mb={24}>
          Reserve
        </Title>

        <Text mt={24}>
          <Box display={"inline"} fw={600}>
            {dayDif} Days&nbsp;
          </Box>
          in {place}
        </Text>

        <Text mb={24} c={"#7D7C84"} mt={8}>
          {form.values.checkIn
            ? moment(form.values.checkIn).format("MMMM D, YYYY")
            : ""}{" "}
          - &nbsp;
          {form.values.checkOut
            ? moment(form.values.checkOut).format("MMMM D, YYYY")
            : ""}
        </Text>
        <form
          onSubmit={form.onSubmit(
            (values) => void handleSubmitCreateBooking(values)
          )}
        >
          <Group align="start" mb={24}>
            <DatePicker
              label="Check in"
              placeholder="Pick date"
              // value={valueCheckIn}
              // onChange={setValueCheckIn}
              mx="auto"
              minDate={moment().toDate()}
              maw={173}
              icon={<IoCalendar />}
              radius={32}
              {...form.getInputProps("checkIn")}
            />

            <DatePicker
              label="Check out"
              placeholder="Pick date"
              mx="auto"
              maw={173}
              icon={<IoCalendar />}
              minDate={moment().toDate()}
              radius={32}
              {...form.getInputProps("checkOut")}
            />
          </Group>

          <GuestDropDown
            maxGuests={guests}
            form={form}
            xref={handlersAdult}
            decrement={decrementAdult}
            title={"Guests"}
            increment={incrementAdult}
            setValue={setValueAdult}
            value={valueAdult}
          />

          <InputBase
            mt={20}
            label="Your phone"
            component={IMaskInput}
            mask="+84 (000) 000-0000"
            {...form.getInputProps("phoneNumber")}
          />

          <Box my={24}></Box>

          <Center mt={24}>
            {" "}
            <SegmentedControl
              onChange={(e) => {
                if (e === "month") {
                  setCurrentPrice(longTermPrice || 0);
                } else {
                  setCurrentPrice(shortTermPrice || 0);
                }
              }}
              data={[
                {
                  label: `${formattedPriceLongTerm} vnđ/Month`,
                  value: "month",
                },
                {
                  label: `${formattedPriceShortTerm} vnđ/Night`,
                  value: "night",
                },
              ]}
            />
          </Center>

          <Button
            loading={isCheckingOut}
            type="submit"
            mt={32}
            size="lg"
            w={"100%"}
            bg={"#3B71FE"}
          >
            Reserve
          </Button>
        </form>
        <Text fz={14} c={"#7D7C84"} my={32}>
          You won&apos;t be charged yet
        </Text>

        <Group p={12} mt={44} mb={16} position="apart">
          {" "}
          <Text fw={500} fz={12} c={"#7D7C84"}>
            {currentPrice?.toLocaleString("en-US") ?? "N/A"} vnđ x {dayDif || 0}{" "}
            days
          </Text>
          <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
            {(0 || totalPrice.toLocaleString("en-US")) ?? "N/A"} vnđ
          </Text>
        </Group>

        <Group p={12} mb={16} position="apart">
          {" "}
          <Text fw={500} fz={12} c={"#7D7C84"}>
            0% campaign discount
          </Text>
          <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
            -0 vnđ
          </Text>
        </Group>

        <Group p={12} mb={16} position="apart">
          {" "}
          <Text fw={500} fz={12} c={"#7D7C84"}>
            Service fee
          </Text>
          <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
            0 vnđ
          </Text>
        </Group>

        <Group
          bg={theme === "dark" ? "black" : "#F9F9F9"}
          sx={{
            borderRadius: "24px",
            border: "1px solid #E9EBED",
          }}
          p={12}
          mb={16}
          position="apart"
        >
          {" "}
          <Text fw={500} fz={12} c={"#7D7C84"}>
            Total before taxes
          </Text>
          <Text fw={500} fz={12} c={theme === "dark" ? "white" : "#09080D"}>
            {totalPrice?.toLocaleString("en-US") ?? "N/A"} vnđ
          </Text>
        </Group>
      </Box>

      {status !== "loading" && <ButtonContact otherPersonId={hostId} />}
    </Flex>
  );
};
