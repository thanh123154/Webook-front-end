import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { Box, Button, ColorScheme, Text, Title } from "@mantine/core";

import { Header } from "../layouts";
import { Hero } from "../features/Home";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box>
        <Hero />

        {/* <div>
          <Title>
            Create <span>T3</span> App
          </Title>
          <div>
            <Link
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <Title>First Steps →</Title>
              <Text>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </Text>
            </Link>
          </div>
          <div>
            <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
            <AuthShowcase />
          </div>
        </div> */}
      </Box>

      {/* <Footer /> */}
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Button
        onClick={
          sessionData ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
