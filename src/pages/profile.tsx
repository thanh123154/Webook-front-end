import { type NextPage } from "next";
import Head from "next/head";
import { Container, Box, type Sx, AspectRatio } from "@mantine/core";

import { Suspense } from "react";

const profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook | Profile</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="https://warriorempires.io/favicon.ico" />
      </Head>

      <Container size={1920} px={0} sx={container}>
        dasdasdas
      </Container>
    </>
  );
};

export default profile;

const container: Sx = () => ({
  overflow: "hidden",
});
