import { type NextPage } from "next";
import Head from "next/head";

import { Box } from "@mantine/core";
import { Header } from "../../layouts";
// import { Statistic } from "../../features/Host";
import dynamic from "next/dynamic";
import ListingManagement from "../../features/Host/ListingManagement";

const Listing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ListingManagement />
    </>
  );
};

export default Listing;
