import { type NextPage } from "next";
import Head from "next/head";
import { Container, Box, type Sx, AspectRatio } from "@mantine/core";
import { CreateListing } from "../features/Listing";
import { Header } from "../layouts";

const createListing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook | create listing</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="https://warriorempires.io/favicon.ico" />
      </Head>
      <Header />
      <Container size={1920} px={0} sx={container}>
        <CreateListing />
      </Container>
    </>
  );
};

export default createListing;

const container: Sx = () => ({
  overflow: "hidden",
});
