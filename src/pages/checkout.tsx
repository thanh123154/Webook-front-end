import { Button, Center, Container, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons";
import type { NextPage } from "next";
import Link from "next/link";
import { useProtectedPage } from "../hooks/useProtectedPage";

const Checkout: NextPage = () => {
  const { isAuthenticating } = useProtectedPage();

  if (isAuthenticating) return <></>;

  return (
    <Container>
      <Center mt="xl">
        <IconCircleCheck color="green" size="5rem" />
      </Center>

      <Title ta="center" my="xl">
        Thanh toán thành công
      </Title>

      <Center>
        <Link href="/booking-status">
          <Button variant="gradient">Xem lịch sử giao dịch</Button>
        </Link>
      </Center>
    </Container>
  );
};

export default Checkout;
