import React, { useEffect } from "react";
import { useState } from "react";
import { useToast, Stack } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { MdGroupAdd } from "react-icons/md";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "../miscellaneous/GroupChatModal";
import { getSender } from "../config/ChatLogics";
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  // const getSender = (loggedUser, userArray) => {
  //   if (loggedUser._id === userArray[0]._id) return userArray[1].name;
  //   else return userArray[0].name;
  // };
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const baseUrl = process.env.REACT_APP_API_URL;
      console.log(baseUrl);
      const { data } = await axios.get(`${baseUrl}/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      style={{
        overflow: "hidden",
      }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={"teal"}
      >
        My Chats
        <GroupChatModal>
          <Button
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<MdGroupAdd />}
            marginLeft={"3.5rem"}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F7FAFC"
        w="100%"
        borderRadius="lg"
        overflowY="scroll"
      >
        {chats !== null ? (
          <Stack overflowY={"scroll"}>
            {chats.map((item) => (
              <Box
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedChat(item);
                }}
                cursor="pointer"
                bg={selectedChat === item ? "#38b2ac" : "#CBD5E0"}
                color={selectedChat === item ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={item._id}
                mb={2}
              >
                <Text>
                  {!item.isGroupChat
                    ? getSender(loggedUser, item.users)
                    : item.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>

    // <div>My Chats</div>
  );
};

export default MyChats;
