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
  Radio,
} from "@mantine/core";

import React, { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Header } from "../layouts";

import { type StaticImageData } from "next/image";
import { formatName } from "../utils/formatter";
import { useSession } from "next-auth/react";
import { AvatarUser } from "../components";
import { api } from "../utils/api";
import { z } from "zod";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { uploadFile } from "../helpers";

type PropsForm = {
  name: string;
  email: string;
  gender: string;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  email: z.string().email({ message: "Invalid email" }),
});

const Profile: NextPage = () => {
  const { isAuthenticating } = useProtectedPage();
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

  const [avatar, setAvatar] = useState<StaticImageData | string | undefined | null>();
  const [file, setFile] = useState<File | undefined | null>();
  const [isUpdating, setIsUpdating] = useState(false);

  const [valueGender, setValueGender] = useState("");

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
      setValueGender(userInfo.gender || "male");
      // form.setFieldValue("gender", userInfo.gender || "");

      setAvatar(userInfo.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSubmit = async (values: PropsForm) => {
    // return console.log(file);

    try {
      setIsUpdating(true);

      // Prepare updated user data
      const updatedUserData = {
        name: values.name,
        email: values.email,
        gender: valueGender,
        image: avatar as string | undefined,
      };
      // return console.log(updatedUserData);

      if (file) {
        console.log("uploading file");

        const newImage = await uploadFile(file);

        console.log("uploading completed", newImage);

        if (newImage) {
          updatedUserData.image = newImage;
        } else {
          throw new Error("Failed to upload image");
        }
      }

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

  if (isAuthenticating) return <></>;

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
            <AvatarUser src={avatar?.toString()} setAvatar={setAvatar} setFile={setFile}>
              {formatName(session?.user?.name)}
            </AvatarUser>
          </Center>

          <TextInput label="Name" placeholder="Name" {...form.getInputProps("name")} />
          <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps("email")} />

          <Group mt="xs">
            <Radio.Group
              value={valueGender}
              onChange={setValueGender}
              // name="favoriteFramework"
              label="Gender"
              // description="This is anonymous"
              withAsterisk
            >
              {" "}
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
              <Radio value="other" label="Other" />
            </Radio.Group>
          </Group>

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
