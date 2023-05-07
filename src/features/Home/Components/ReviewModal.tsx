import {
  Modal,
  Textarea,
  Rating,
  useMantineTheme,
  Title,
  Button,
} from "@mantine/core";
import React from "react";
import {
  IconMoodEmpty,
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons";
import { useForm, zodResolver } from "@mantine/form";
import { type ReviewType } from "../../../types";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";

type Props = {
  opened: boolean;
  close: () => void;
  listingId: string;
  idBooking: string;
  refetch?: () => Promise<void>;
};

// icon only

export const ReviewModal: React.FC<Props> = ({
  opened,
  close,
  listingId,
  idBooking,
  refetch,
}) => {
  const theme = useMantineTheme();
  const getEmptyIcon = (value: number) => {
    const defaultProps = { size: 24, color: "gray" };
    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} />;
      case 2:
        return <IconMoodSad {...defaultProps} />;
      case 3:
        return <IconMoodSmile {...defaultProps} />;
      case 4:
        return <IconMoodHappy {...defaultProps} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const getFullIcon = (value: number) => {
    const defaultProps = { size: 24 };

    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <IconMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return (
          <IconMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />
        );
      case 4:
        return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return (
          <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />
        );
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const { mutateAsync: apiCreate } = api.review.create.useMutation();

  const { data: session } = useSession();

  const formSchema = z.object({
    comment: z.string().min(1, { message: "Please enter title" }),
  });

  const form = useForm<ReviewType>({
    validate: zodResolver(formSchema),
  });

  const handleSubmit = async (values: ReviewType) => {
    console.log(values, "day la value review");

    try {
      const createListingData = {
        ...values,
      };

      await apiCreate({
        ...createListingData,
        bookingId: idBooking,
        isReview: true,
        guestId: session?.user?.id || "",
        listingId: listingId || "",
      });

      showNotification({
        color: "green",
        message: "Review created",
      });

      form.reset();
      close();

      refetch && (await refetch());
    } catch (error) {
      console.log(error);
    } finally {
      // setIsUpdating(false);
    }
  };

  return (
    <Modal
      centered
      overlayBlur={0.3}
      overlayOpacity={0.3}
      opened={opened}
      onClose={() => {
        close();
        form.reset();
      }}
      title="Rating"
    >
      <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
        <Rating
          my={20}
          emptySymbol={getEmptyIcon}
          fullSymbol={getFullIcon}
          highlightSelectedOnly
          {...form.getInputProps("rating")}
        />

        <Textarea
          autosize
          minRows={5}
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
          {...form.getInputProps("comment")}
        />

        <Button type="submit" mt={20}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};
