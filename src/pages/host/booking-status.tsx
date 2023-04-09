import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "../../layouts";

import BookingManagement from "../../features/Host/BookingManagement";

const BookingStatus: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <BookingManagement />
    </>
  );
};

export default BookingStatus;
