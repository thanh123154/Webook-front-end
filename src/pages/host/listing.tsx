import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "../../layouts";
// import { Statistic } from "../../features/Host";
import ListingManagement from "../../features/Host/ListingManagement";
import { useProtectedPage } from "../../hooks/useProtectedPage";

const Listing: NextPage = () => {
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
      <ListingManagement />
    </>
  );
};

export default Listing;
