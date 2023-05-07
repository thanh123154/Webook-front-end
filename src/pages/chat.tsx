import { Divider, Flex } from "@mantine/core";
import type { User } from "@prisma/client";
import {
  type DocumentData,
  type QuerySnapshot,
  type Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChatWindow, ListConversation, Toolbar } from "../features/chat";
import { db } from "../libs/firebase";
import type { IConversation, ISelectedConversation } from "../types";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { Header } from "../layouts";

const ChatPage: NextPage = () => {
  const { isAuthenticating } = useProtectedPage();

  if (isAuthenticating) return <></>;

  return <Main />;
};

const Main = () => {
  const { data: session } = useSession();
  const effectRan = useRef(false);
  const [dataSource, setDataSource] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    ISelectedConversation | undefined
  >();

  const handleSnapshotConversation = useCallback((querySnapshot: QuerySnapshot<DocumentData>) => {
    const listConversation: IConversation[] = [];

    querySnapshot.docs.forEach((doc) => {
      if (doc.exists()) {
        const id = doc.id;
        const conversation = doc.data() as Omit<IConversation, "id">;

        listConversation.push({ id, ...conversation, doc });
      }
    });

    // console.log(listConversation);

    setDataSource(listConversation);
  }, []);

  useEffect(() => {
    const unsubscribes: Unsubscribe[] = [];

    if (session && session.user) {
      // console.log(session && session.user);

      if (!effectRan.current) {
        console.log("On listening...");

        const conversationQuery = query(
          collection(db, "conversations"),
          where("members", "array-contains", session.user.id),
          orderBy("updatedAt", "desc")
        );

        const unsubConversation = onSnapshot(conversationQuery, handleSnapshotConversation);

        unsubscribes.push(unsubConversation);

        effectRan.current = true;
      }
    }

    () => {
      console.log("Unsubscribe...");

      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [handleSnapshotConversation, session]);

  const handleSelectConversation = useCallback((otherPerson: User, conversation: IConversation) => {
    setSelectedConversation({
      otherPerson,
      conversation,
    });
  }, []);

  return (
    <>
      <Header variant="chat" />

      <Flex h="calc(100vh - 60px)">
        <ListConversation dataSource={dataSource} onSelect={handleSelectConversation} />

        <Divider orientation="vertical" />

        <Flex direction="column" sx={{ flex: 1 }}>
          <Toolbar selectedConversation={selectedConversation} />

          <Divider />

          <ChatWindow selectedConversation={selectedConversation} />
        </Flex>
      </Flex>
    </>
  );
};

export default ChatPage;
