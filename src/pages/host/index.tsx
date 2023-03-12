import { type NextPage } from "next";
import Head from "next/head";

import { Box } from "@mantine/core";
import { Header } from "../../layouts";
// import { Statistic } from "../../features/Host";
import dynamic from "next/dynamic";

const Statistic = dynamic(() => import("../../features/Host/Statistic"), {
  ssr: false,
});

const Host: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Statistic />
    </>
  );
};

export default Host;
