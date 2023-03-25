import { type NextPage } from "next";
import Head from "next/head";
import {
  Container,
  type Sx,
  TextInput,
  Button,
  Group,
  Center,
  LoadingOverlay,
} from "@mantine/core";

import React, { Suspense, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { randomId, useDisclosure } from "@mantine/hooks";
import { Header } from "../layouts";

import { type StaticImageData } from "next/image";
import { formatName } from "../utils/formatter";
import { useSession } from "next-auth/react";
import { AvatarUser } from "../components";
import { api } from "../utils/api";
import { z } from "zod";

type PropsForm = {
  name: string;
  email: string;
  gender: string;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  email: z.string().email({ message: "Invalid email" }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select gender",
    invalid_type_error: "Please select gender",
  }),
});

const Profile: NextPage = () => {
  const { data: session } = useSession();
  const {
    data: userInfo,
    isLoading,
    refetch,
  } = api.user.getById.useQuery(
    { id: session?.user?.id || "" },
    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );
  const { mutateAsync: apiUpdate } = api.user.update.useMutation();

  const [avatar, setAvatar] = useState<
    StaticImageData | string | undefined | null
  >();
  const [file, setFile] = useState<File | undefined | null>();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<PropsForm>({
    initialValues: {
      name: "",
      email: "",
      gender: "",
    },
    validate: zodResolver(formSchema),
  });

  React.useEffect(() => {
    console.log(userInfo);

    if (userInfo) {
      form.setFieldValue("name", userInfo.name || "");
      form.setFieldValue("email", userInfo.email || "");
      form.setFieldValue("gender", userInfo.gender || "");

      setAvatar(userInfo.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSubmit = async (values: PropsForm) => {
    console.log(values);

    try {
      setIsUpdating(true);

      // Prepare updated user data
      const updatedUserData = {
        name: values.name,
        email: values.email,
        gender: values.gender,
        image: avatar,
      };

      // Call the update user API endpoint
      await apiUpdate({ id: session?.user?.id || "", ...updatedUserData });

      // Refetch the updated user data
      await refetch();

      // Clear the file input and reset the form
      setFile(null);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <>
      <Head>
        <title>Webook | Profile</title>
        <meta name="description" content="WEBOOK - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container mt={200} size={1200} px={0} sx={container} pos="relative">
        <LoadingOverlay visible={isLoading} />

        <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
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
              type="submit"
              loading={isUpdating}
              // onClick={() =>
              //   form.setValues({
              //     name: randomId(),
              //     email: `${randomId()}@test.com`,
              //     gender: "male",
              //   })
              // }
            >
              Update
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default Profile;

const container: Sx = () => ({
  overflow: "hidden",
});
