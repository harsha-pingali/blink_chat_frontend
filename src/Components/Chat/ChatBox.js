import React from "react";
import { ChatState } from "../../context/ChatProvider.js";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat.js";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  //console.log(selectedChat);
  return (
    <Box
      display={{ base: selectedChat !== "" ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      color={"teal"}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
