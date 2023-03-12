import { type NextPage } from "next";
import Head from "next/head";

import { Box } from "@mantine/core";

import { Header } from "../layouts";
import { Hero } from "../features/Home";
import { Listing } from "../features/Home/Listing";

const Home: NextPage = () => {
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

        <Listing />
      </Box>

      {/* <Footer /> */}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div>
//       <p>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <Button
//         onClick={
//           sessionData ? () => void signOut() : () => void signIn("google")
//         }
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </Button>
//     </div>
//   );
// };
