import { Button, Center, Container, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { api } from "../utils/api";

const Checkout: NextPage = () => {
  const { query } = useRouter();
  const effectRan = useRef(false);

  const { mutateAsync: apiCreateBooking } = api.booking.create.useMutation();

  useEffect(() => {
    if (!effectRan.current) {
      effectRan.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBooking = async () => {
    try {
      // Prepare updated user data
      // const createBookingData = {
      //   ...values,
      //   total: totalPrice,
      //   isDenied: true,
      //   rating: 0,
      //   review: "",
      // };
      // Call the update user API endpoint
      // await apiCreateBooking({
      //   ...createBookingData,
      //   guestId: session?.user?.id || "",
      //   listingId: listingId || "",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Center mt="xl">
        <IconCircleCheck color="green" size="5rem" />
      </Center>

      <Title ta="center" my="xl">
        Thanh toán thành công
      </Title>

      <Center>
        <Link href="/transactions">
          <Button variant="gradient">Xem lịch sử giao dịch</Button>
        </Link>
      </Center>
    </Container>
  );
};

export default Checkout;
