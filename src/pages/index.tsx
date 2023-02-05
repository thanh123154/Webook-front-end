import { Box } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";

import { FindZenAi, Hero } from "../features/Home";
import { Footer, Header } from "../layouts";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box>
        {/* <Hero /> */}

        {/* <FindZenAi /> */}
      </Box>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
