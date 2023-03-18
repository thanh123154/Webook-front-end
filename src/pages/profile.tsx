import { type NextPage } from "next";
import Head from "next/head";
import {
  Container,
  type Sx,
  TextInput,
  Button,
  Group,
  Center,
} from "@mantine/core";

import { Suspense, useState } from "react";
import { useForm } from "@mantine/form";
import { randomId, useDisclosure } from "@mantine/hooks";
import { Header } from "../layouts";

import { type StaticImageData } from "next/image";
import { formatName } from "../utils/formatter";
import { useSession } from "next-auth/react";
import { AvatarUser } from "../components";

type PropsForm = {
  name: string;
  email: string;
  gender: string;
};

const Profile: NextPage = () => {
  const form = useForm<PropsForm>({
    initialValues: {
      name: "",
      email: "",
      gender: "",
    },
  });

  const [avatar, setAvatar] = useState<
    StaticImageData | string | undefined | null
  >();
  const [file, setFile] = useState<File | undefined | null>();
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Webook | Profile</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container mt={200} size={1200} px={0} sx={container}>
        <Center>
          <AvatarUser
            src={avatar?.toString()}
            setAvatar={setAvatar}
            setFile={setFile}
          >
            {formatName(session?.user?.name)}
          </AvatarUser>
        </Center>

        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mt="md"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <TextInput
          mt="md"
          label="Gender"
          placeholder="Gender"
          {...form.getInputProps("gender")}
        />

        <Group position="center" mt="xl">
          <Button
            variant="outline"
            onClick={() =>
              form.setValues({
                name: randomId(),
                email: `${randomId()}@test.com`,
                gender: "male",
              })
            }
          >
            Set random values Submit
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default Profile;

const container: Sx = () => ({
  overflow: "hidden",
});
