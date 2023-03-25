import {
  Button,
  Container,
  Flex,
  Group,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { z } from "zod";
import { api } from "../../../utils/api";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

type PropsForm = {
  title: string;
  beds: number;
  bedsrooms: number;
  bathrooms: number;
  guests: number;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  beds: z.number().min(0, { message: "Please enter beds" }),
  bedsrooms: z.number().min(0, { message: "Please enter bedsroom" }),
  bathrooms: z.number().min(0, { message: "Please enter bathrooms" }),
  guests: z.number().min(0, { message: "Please enter guest" }),
});

export const Step1: React.FC<Props> = ({ nextStep, prevStep }) => {
  const { data: session } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutateAsync: apiCreate } = api.listing.create.useMutation();

  const form = useForm<PropsForm>({
    initialValues: {
      title: "",
      beds: 0,
      bedsrooms: 0,
      bathrooms: 0,
      guests: 0,
    },
    validate: zodResolver(formSchema),
  });

  const handleSubmit = async (values: PropsForm) => {
    console.log(values);

    try {
      setIsUpdating(true);

      // Prepare updated user data
      const createListingData = {
        name: values.title,
        beds: values.beds,
        bedsrooms: values.bedsrooms,
        bathrooms: values.bathrooms,
        guests: values.guests,
        address: "",
        price: 0,
        gallery: "",
        desc: "",
        active: true,
        detail: "",
        placeId: "",
        province: "",
        district: "",
        ward: "",
      };

      // Call the update user API endpoint
      await apiCreate({
        hostId: session?.user?.id || "",
        ...createListingData,
      });

      // Refetch the updated user data

      // Clear the file input and reset the form

      form.reset();

      nextStep();
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Container h={"55vh"} mt={100} size={1000}>
      <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
        <Flex gap={50} direction={"column"}>
          {" "}
          <Textarea
            placeholder="Make it descriptive and unique so guests will understand what you’re offering."
            label="Title"
            radius="md"
            withAsterisk
            {...form.getInputProps("title")}
            // autosize
          />
          <Flex justify={"space-between"} gap={50}>
            {" "}
            <NumberInput
              defaultValue={0}
              placeholder="Enter"
              label="Beds"
              withAsterisk
              w={"50%"}
              {...form.getInputProps("beds")}
            />
            <NumberInput
              defaultValue={0}
              placeholder="Enter"
              label="Bedsrooms"
              withAsterisk
              w={"50%"}
              {...form.getInputProps("bedsrooms")}
            />
          </Flex>
          <Flex justify={"space-between"} gap={50}>
            {" "}
            <NumberInput
              defaultValue={0}
              placeholder="Enter"
              label="Bathrooms"
              withAsterisk
              w={"50%"}
              {...form.getInputProps("bathrooms")}
            />
            <NumberInput
              defaultValue={0}
              placeholder="Enter"
              label="Guests"
              withAsterisk
              w={"50%"}
              {...form.getInputProps("guests")}
            />
          </Flex>
        </Flex>
        <Group position="center" mt={100}>
          <Button variant="default">Back</Button>

          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Container>
  );
};
