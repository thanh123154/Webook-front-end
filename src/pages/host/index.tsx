import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "../../layouts";
// import { Statistic } from "../../features/Host";
import dynamic from "next/dynamic";
import { useProtectedPage } from "../../hooks/useProtectedPage";

const Statistic = dynamic(() => import("../../features/Host/Statistic"), {
  ssr: false,
});

const Host: NextPage = () => {
  const { isAuthenticating } = useProtectedPage();

  if (isAuthenticating) return <></>;

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
