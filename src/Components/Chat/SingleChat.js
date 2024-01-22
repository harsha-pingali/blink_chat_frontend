import React from "react";
import { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  IconButton,
  Button,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import "./chatstyle.css";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getUserForChatBox } from "../config/ChatLogics";
import UserInfoModal from "../Users/UserInfoModal";
import UpdateGroupInfoModal from "../miscellaneous/UpdateGroupInfoModal";
import { useState } from "react";
import { Axios } from "axios";
import ScrollableChat from "./ScrollableChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState();
  const baseUrl = process.env.REACT_APP_API_URL;
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      console.log(data);
      // console.log(messages);
    } catch (error) {
      toast({
        title: "Failed to Load Messages",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const reqData = {
          senderId: user._id,
          content: newMessage,
          chatId: selectedChat._id,
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${baseUrl}/api/message`,
          reqData,
          config
        );
        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Failed to send Message",
          status: "error",
          isClosable: true,
          position: "top-right",
          duration: 3000,
        });
      }
    }
  };
  const typingHandler = (e) => {
    e.stopPropagation();
    setNewMessage(e.target.value);
    //typing logic !!
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            color={"teal"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={(e) => {
                setSelectedChat("");
              }}
            ></IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Button
                  onClick={(e) => {
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    setShowUserInfoModal(true);
                  }}
                  icon={<ViewIcon />}
                >
                  {showUserInfoModal && (
                    <UserInfoModal
                      user={getUserForChatBox(user, selectedChat.users)}
                    />
                  )}
                </Button>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <Button
                  onClick={(e) => {
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    setShowGroupInfoModal(true);
                  }}
                  icon={<ViewIcon />}
                >
                  <UpdateGroupInfoModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </Button>
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* msgs here */}
            {loading ? (
              <Spinner
                size={"xl"}
                alignSelf={"center"}
                emptyColor="gray.200"
                color="teal.500"
                speed="1s"
                margin={"auto"}
              />
            ) : (
              <div
                className="messages"
                style={{ maxWidth: "100%", border: "1px solid black" }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                placeholder="Enter your message here..."
                variant={"filled"}
                bg={"#F0FFF4"}
                color={"black"}
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} color={"teal"}>
            Select an User to chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
