import { type NextPage } from "next";
import Head from "next/head";
import { Title } from "@mantine/core";

import { Header } from "../layouts";

import { type StaticImageData } from "next/image";
import { ListingDetails } from "../features/Home/ListingDetails";

const ListingDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook | Listing Detail</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <ListingDetails />
    </>
  );
};

export default ListingDetail;
