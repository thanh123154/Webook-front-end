import { type NextPage } from "next";
import Head from "next/head";
import { Container, type Sx } from "@mantine/core";
import { CreateListing } from "../../features/Listing";
import { Header } from "../../layouts";
import { useProtectedPage } from "../../hooks/useProtectedPage";

const CreateListingPage: NextPage = () => {
  const { isAuthenticating } = useProtectedPage();

  if (isAuthenticating) return <></>;

  return (
    <>
      <Head>
        <title>Webook | create listing</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container size={1920} px={0} sx={container}>
        <CreateListing />
      </Container>
    </>
  );
};

export default CreateListingPage;

const container: Sx = () => ({
  overflow: "hidden",
});
