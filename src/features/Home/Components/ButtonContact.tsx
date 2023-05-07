import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { db } from "../../../libs/firebase";
import { Button } from "@mantine/core";

export const ButtonContact: React.FC<{ otherPersonId?: string }> = ({ otherPersonId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (session && session.user && otherPersonId) {
      try {
        setIsLoading(true);

        const conversationQuery = query(
          collection(db, "conversations"),
          where("members", "array-contains-any", [session.user.id, otherPersonId])
        );

        const docs = await getDocs(conversationQuery);

        let conversationId = "";

        docs.forEach((doc) => {
          if (doc.exists() && !conversationId) {
            const data = JSON.parse(JSON.stringify(doc.data())) as { members: string[] };

            if (
              data.members.includes(session.user?.id || "") &&
              data.members.includes(otherPersonId)
            ) {
              conversationId = doc.id;
            }
          }
        });

        if (!conversationId) {
          const data = await addDoc(collection(db, "conversations"), {
            members: [session.user.id, otherPersonId],
            updatedAt: serverTimestamp(),
          });

          conversationId = data.id;
        }

        await router.push({ pathname: "/chat", query: { id: conversationId } });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      fullWidth
      radius="md"
      disabled={status === "unauthenticated"}
      loading={isLoading}
      onClick={() => void handleClick()}
    >
      Contact
    </Button>
  );
};
