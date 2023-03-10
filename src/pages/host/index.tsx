import { type NextPage } from "next";
import Head from "next/head";

import { Box } from "@mantine/core";
import { HostHeader } from "../../layouts";

const Host: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HostHeader />

      <Box>hello</Box>
    </>
  );
};

export default Host;
