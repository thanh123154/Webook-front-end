import { Text, Title } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

const OpenAi: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zenithereum</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Title>Heading 1</Title>

        <Text>Paragraph</Text>
      </div>
    </>
  );
};

export default OpenAi;
