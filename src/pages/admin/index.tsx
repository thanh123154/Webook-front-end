import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Header,
  Input,
  Table,
  Title,
} from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { keys } from "../../constants";
import { IconLogout, IconSearch } from "@tabler/icons";
import { api } from "../../utils/api";
import { nanoid } from "nanoid";
import { showNotification } from "@mantine/notifications";
import { useAdminSession } from "../../features/Admin/useAdminSession";

const Home: NextPage = () => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [searchName, setSearchName] = React.useState<string | undefined>();
  const { data, isLoading, refetch } =
    api.admin.getAllUnapprovedListings.useQuery({
      name: searchName,
    });
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const effectRan = useRef(false);
  const [adminSession, setAdminSession] = useAdminSession((state) => [
    state.value,
    state.setValue,
  ]);

  React.useEffect(() => {
    console.log(adminSession);

    if (!effectRan.current) {
      if (!adminSession) {
        void router.push("/admin/login");
      } else {
        setIsAuthenticating(false);
      }

      effectRan.current = true;
    }
  }, [adminSession, router]);

  const heads = (
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
  );

  const rows = (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={2}
            style={{
              textAlign: "center",
              fontSize: 20,
              paddingBlock: 50,
              fontWeight: "bold",
            }}
          >
            Loading...
          </td>
        </tr>
      ) : !data || !data.length ? (
        <tr>
          <td
            colSpan={2}
            style={{
              textAlign: "center",
              fontSize: 20,
              paddingBlock: 50,
              fontWeight: "bold",
            }}
          >
            No Data
          </td>
        </tr>
      ) : (
        data.map((listing) => (
          <tr key={nanoid()}>
            <td>{listing.name}</td>
            <td>
              <ButtonApprove
                listingId={listing.id}
                onSuccess={async () => {
                  await refetch();
                }}
              />
            </td>
          </tr>
        ))
      )}
    </tbody>
  );

  if (isAuthenticating) return <></>;

  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header height={60} px="xl">
        <Flex align="center" justify="space-between" h="100%">
          <Title order={3}>WEBOOK - Administration</Title>

          <Button
            variant="filled"
            color="red"
            onClick={() => setAdminSession(false)}
            leftIcon={<IconLogout size={16} />}
            size="xs"
          >
            Logout
          </Button>
        </Flex>
      </Header>

      <Container fluid p={25}>
        <Group position="apart" mb="xl">
          <Title order={3}>
            Unapproved Listing {!!data?.length && `(${data.length})`}
          </Title>

          <Input
            ref={searchRef}
            placeholder="Enter listing name..."
            rightSection={
              <ActionIcon variant="filled" color="blue">
                <IconSearch size={14} />
              </ActionIcon>
            }
            onKeyDown={(e) =>
              e.keyCode === 13 && setSearchName(searchRef.current?.value)
            }
          />
        </Group>

        <Table>
          {heads}

          {rows}
        </Table>
      </Container>
    </>
  );
};

export default Home;

const ButtonApprove: React.FC<{
  listingId: string;
  onSuccess: () => Promise<void>;
}> = ({ listingId, onSuccess = () => Promise.resolve("") }) => {
  const { mutateAsync: apiApprove } = api.admin.approveListing.useMutation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleApprove = async () => {
    try {
      setIsLoading(true);

      await apiApprove({ listingId });

      await onSuccess();

      showNotification({ color: "green", message: "Approve successfully" });
    } catch (error) {
      console.log(error);

      showNotification({ color: "red", message: "Approve failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="filled"
      color="teal"
      onClick={() => void handleApprove()}
      loading={isLoading}
    >
      Approve
    </Button>
  );
};
