import {
  Button,
  Container,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { type NextPage } from "next";
import Head from "next/head";
import { z } from "zod";
import { api } from "../../utils/api";
import { showNotification } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAdminSession } from "../../features/Admin/useAdminSession";

interface ILoginForm {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

const AdminLogin: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: apiLogin, isLoading } = api.admin.login.useMutation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const effectRan = useRef(false);
  const [adminSession, setAdminSession] = useAdminSession((state) => [
    state.value,
    state.setValue,
  ]);

  useEffect(() => {
    console.log(adminSession);

    if (!effectRan.current) {
      if (adminSession) {
        void router.push("/admin");
      } else {
        setIsAuthenticating(false);
      }

      effectRan.current = true;
    }
  }, [adminSession, router]);

  const form = useForm<ILoginForm>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(formSchema),
  });

  const handleSubmit = (values: ILoginForm) => {
    console.log(values);

    apiLogin({ ...values })
      .then((res) => {
        console.log(res);

        setAdminSession(true);

        showNotification({
          color: "green",
          message: "Login successful",
        });
      })
      .catch((err) => {
        console.log(err);

        showNotification({
          color: "red",
          message: "Login failed",
        });
      });
  };

  if (isAuthenticating) return <></>;

  return (
    <>
      <Head>
        <title>Webook</title>
        <meta name="description" content="Zenithereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size={500}>
        <Flex direction={"column"} h="100vh" justify="center">
          <Title ta="center" mb={30}>
            WEBOOk - Administration
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction={"column"} gap={30}>
              <TextInput label="Username" {...form.getInputProps("username")} />

              <PasswordInput
                label="Password"
                {...form.getInputProps("password")}
              />

              <Button
                loading={isLoading}
                fullWidth
                variant="gradient"
                type="submit"
              >
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
      </Container>
    </>
  );
};

export default AdminLogin;
