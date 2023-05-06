import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "../layouts";
import UserBookingManagement from "../features/Home/UserBookingManagement";

const ManageBooking: NextPage = () => {
  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <UserBookingManagement />
    </>
  );
};

export default ManageBooking;
